import { useForm } from "react-hook-form";
import {
  AUTH_ERROR_MESSAGE,
  AUTH_LIMIT,
  AUTH_REGEX,
} from "@/constants/authValidation";

export interface LogInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

type Mode = "onChange" | "onBlur" | "onSubmit" | "onTouched" | "all";

type AuthKey = "email" | "nickname" | "password" | "passwordConfirmation";
type AuthFormValues = Record<AuthKey, string>;

const useAuthForm = <T extends LogInRequest | SignUpRequest>(
  mode: Mode,
  defaultValues: T,
) => {
  const {
    register,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    handleSubmit,
  } = useForm<AuthFormValues>({
    mode: mode || "onChange",
    defaultValues,
  });

  const emailRegister = register("email", {
    required: {
      value: true,
      message: AUTH_ERROR_MESSAGE.emailRequired,
    },
    pattern: {
      value: AUTH_REGEX.email,
      message: AUTH_ERROR_MESSAGE.invalidEmailFormat,
    },
  });

  const nicknameRegister =
    "nickname" in defaultValues
      ? register("nickname", {
          required: {
            value: true,
            message: AUTH_ERROR_MESSAGE.nicknameRequired,
          },
          pattern: {
            value: AUTH_REGEX.nickname,
            message: AUTH_ERROR_MESSAGE.invalidNicknameFormat,
          },
        })
      : null;

  // 비밀번호와 비밀번호 확인값이 동일한지 확인하는 함수
  const validatePasswordMatch = () => {
    const password = watch("password");
    const passwordConfirmation = watch("passwordConfirmation");

    // 비밀번호 확인란이 없으면 바로 return
    if (!passwordConfirmation) return true;

    if (password !== passwordConfirmation) {
      setError("passwordConfirmation", {
        type: "validate",
        message: AUTH_ERROR_MESSAGE.passwordMismatch,
      });
      return false;
    } else {
      clearErrors("passwordConfirmation");
      return true;
    }
  };

  const passwordRegister = register("password", {
    required: { value: true, message: AUTH_ERROR_MESSAGE.passwordRequired },
    minLength: {
      value: AUTH_LIMIT.passwordMinLength,
      message: AUTH_ERROR_MESSAGE.passwordMinLength,
    },
    validate: validatePasswordMatch,
  });

  const passwordConfirmationRegister =
    "passwordConfirmation" in defaultValues
      ? register("passwordConfirmation", {
          required: {
            value: true,
            message: AUTH_ERROR_MESSAGE.passwordMismatch,
          },
          validate: validatePasswordMatch,
        })
      : null;

  return {
    handleSubmit,
    emailRegister,
    nicknameRegister,
    passwordRegister,
    passwordConfirmationRegister,
    errors,
  };
};

export default useAuthForm;
