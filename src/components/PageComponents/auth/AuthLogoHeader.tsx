import Image from "next/image";

const AuthLogoHeader = () => {
  return (
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
  );
};

export default AuthLogoHeader;
