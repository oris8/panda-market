"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button/Button";
import FormGroup from "@/components/FormGroup/FormGroup";
import SocialLogin from "@/components/auth/SocialLogin";
import Popup from "@/components/Popup";
import useAuthForm, { SignUpRequest } from "@/hooks/useAuthForm";
import sendAxiosRequest from "@/lib/api/sendAxiosRequest";

const SignUp = () => {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    emailRegister,
    nicknameRegister,
    passwordRegister,
    passwordConfirmationRegister,
    errors,
  } = useAuthForm<SignUpRequest>("onChange", {
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });

  const onSubmit = async (data: SignUpRequest) => {
    try {
      await sendAxiosRequest({
        method: "post",
        url: "/auth/signUp",
        data: data,
      });
      setShowPopup(true);
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    router.replace("/login");
  };

  return (
    <div className="mx-auto w-full max-w-400 px-24 py-36 md:max-w-[640px]">
      <h1 className="my-24 flex justify-center md:my-44">
        <div className="relative h-66 w-198 md:h-132 md:w-396">
          <Image
            src="/images/img_panda-logo.svg"
            alt="판다마켓"
            fill
            sizes="100 100"
          />
        </div>
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <FormGroup.InputWrapper>
            <FormGroup.Label htmlFor="email">이메일</FormGroup.Label>
            <FormGroup.InputField
              label="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              className={`${Boolean(errors?.email?.message) ? "ct--input-error" : ""}`}
              {...emailRegister}
            />
            <FormGroup.ErrorMessage errorMsg={errors?.email?.message || null} />
          </FormGroup.InputWrapper>
        </FormGroup>
        <FormGroup>
          <FormGroup.InputWrapper>
            <FormGroup.Label htmlFor="nickname">닉네임</FormGroup.Label>
            <FormGroup.InputField
              label="nickname"
              type="text"
              placeholder="닉네임을 입력해주세요"
              className={`${Boolean(errors?.nickname?.message) ? "ct--input-error" : ""}`}
              {...nicknameRegister}
            />
            <FormGroup.ErrorMessage
              errorMsg={errors?.nickname?.message || null}
            />
          </FormGroup.InputWrapper>
        </FormGroup>
        <FormGroup>
          <FormGroup.InputWrapper>
            <FormGroup.Label htmlFor="password">비밀번호</FormGroup.Label>
            <FormGroup.InputField.Password
              label="password"
              placeholder="비밀번호를 입력해주세요"
              className={`${Boolean(errors?.password?.message) ? "ct--input-error" : ""}`}
              {...passwordRegister}
            />
            <FormGroup.ErrorMessage
              errorMsg={errors?.password?.message || null}
            />
          </FormGroup.InputWrapper>
        </FormGroup>
        <FormGroup>
          <FormGroup.InputWrapper>
            <FormGroup.Label htmlFor="passwordConfirmation">
              비밀번호 확인
            </FormGroup.Label>
            <FormGroup.InputField.Password
              label="passwordConfirmation"
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              className={`${Boolean(errors?.passwordConfirmation?.message) ? "ct--input-error" : ""}`}
              {...passwordConfirmationRegister}
            />
            <FormGroup.ErrorMessage
              errorMsg={errors?.passwordConfirmation?.message || null}
            />
          </FormGroup.InputWrapper>
        </FormGroup>

        <Button.Primary
          className="mx-w-400 primary-button mt-16 h-44 w-full rounded-36 md:max-w-[640px]"
          type="submit"
          disabled={Object.keys(errors).length > 0}
        >
          회원가입
        </Button.Primary>
      </form>

      <SocialLogin />

      <div className="mb-160 mt-24 flex justify-center text-15 font-medium text-gray-800">
        <p>이미 회원이신가요?</p>
        <Link className="ml-8 bg-transparent text-blue underline" href="/login">
          로그인
        </Link>
      </div>

      <Popup isOpen={showPopup} onClose={handlePopupClose}>
        가입이 완료되었습니다!
      </Popup>
    </div>
  );
};

export default SignUp;
