"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setCookie, deleteCookie } from "cookies-next";
import sendAxiosRequest from "@/lib/api/sendAxiosRequest";

interface AuthContextType {
  user: User | null;
  isPending: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  updateUser: (formData: FormData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [values, setValues] = useState<{
    user: User | null;
    isPending: boolean;
  }>({
    user: null,
    isPending: true,
  });

  async function getUser() {
    setValues((prevValues) => ({
      ...prevValues,
      isPending: true,
    }));
    let nextUser: User | null = null;
    try {
      const res = await sendAxiosRequest({ method: "GET", url: "/users/me" });
      nextUser = res.data;
    } catch (err: any) {
      if (err.response.status === 401) {
        return;
      }
    } finally {
      setValues((prevValues) => ({
        ...prevValues,
        user: nextUser,
        isPending: false,
      }));
    }
  }

  async function login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const options = {
      method: "POST",
      url: "/auth/signIn",
      data: { email, password },
    };
    const res = await sendAxiosRequest(options);
    const { accessToken, refreshToken } = res.data;
    setCookie("accessToken", accessToken, { maxAge: 60 * 60 * 24 }); // 1 day
    setCookie("refreshToken", refreshToken, { maxAge: 60 * 60 * 24 });
    await getUser();
  }

  async function logout() {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");

    setValues((prevValues) => ({
      ...prevValues,
      user: null,
    }));
  }

  async function updateUser(formData: FormData) {
    const options = {
      method: "PATCH",
      url: "/users/me",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    };
    const res = await sendAxiosRequest(options);
    const nextUser = res.data;
    setValues((prevValues) => ({
      ...prevValues,
      user: nextUser,
    }));
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: values.user,
        isPending: values.isPending,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(required: boolean | null = null) {
  const context = useContext(AuthContext);
  const router = useRouter();

  if (!context) {
    throw new Error("반드시 AuthProvider 안에서 사용해야 합니다.");
  }

  useEffect(() => {
    if (required === null) return;
    if (required && !context.user && !context.isPending) {
      router.replace("/login");
    } else if (!required && context.user && !context.isPending) {
      router.replace("/"); // 또는 접근을 허용할 다른 경로로 리디렉션.. 느리게 이동됨
    }
  }, [context.user, context.isPending, required]);

  return context;
}
