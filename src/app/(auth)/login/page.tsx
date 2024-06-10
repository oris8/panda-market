"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import FormGroup from "@/components/FormGroup/FormGroup";
import Button from "@/components/Button/Button";
import SocialLogin from "@/components/auth/SocialLogin";
import { useAuth } from "@/contexts/AuthProvider";

interface LogInRequest {
  email: string;
  password: string;
}

const LogIn = () => {
  const [values, setValues] = useState<LogInRequest>({
    email: "",
    password: "",
  });
  const [isValidation, setIsValidation] = useState();
  const { login } = useAuth(false);
  const router = useRouter();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = values;
    try {
      await login({ email, password });
      router.replace("/");
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="mx-auto w-full max-w-400 px-24 md:max-w-[640px]">
      <h1 className="my-24 flex justify-center md:my-44">
        <div className="relative h-66 w-198 md:h-132 md:w-396">
          <Image
            src="/images/img_panda-logo.svg"
            alt="판다마켓"
            fill
            sizes="100% 100%"
          />
        </div>
      </h1>

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormGroup.InputWrapper>
            <FormGroup.Label htmlFor="email">이메일</FormGroup.Label>
            <FormGroup.InputField
              label="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              value={values.email}
              onChange={handleChange}
            />
          </FormGroup.InputWrapper>
        </FormGroup>

        <FormGroup>
          <FormGroup.InputWrapper>
            <FormGroup.Label htmlFor="password">비밀번호</FormGroup.Label>
            <FormGroup.InputField.Password
              label="password"
              placeholder="비밀번호를 입력해주세요"
              value={values.password}
              onChange={handleChange}
            />
          </FormGroup.InputWrapper>
        </FormGroup>

        <Button.Primary
          className="mx-w-400 primary-button mt-16 h-44  w-full rounded-36 md:max-w-[640px]"
          type="submit"
        >
          로그인
        </Button.Primary>
      </form>

      <SocialLogin />

      <div className="mb-160 mt-24 flex justify-center text-15 font-medium text-gray-800">
        <p>판다마켓이 처음이신가요?</p>
        <Link
          className="ml-8 bg-transparent text-blue underline"
          href="/signup"
        >
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default LogIn;
