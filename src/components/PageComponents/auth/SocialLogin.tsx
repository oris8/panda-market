import GoogleIcon from "/public/images/ic_google-round.svg";
import KaKaoIcon from "/public/images/ic_kakao-round.svg";

const SOCIAL_LOGIN = [
  { name: "구글", href: "https://www.google.com/", icon: <GoogleIcon /> },
  {
    name: "카카오",
    href: "https://www.kakaocorp.com/page/",
    icon: <KaKaoIcon />,
  },
];

const SocialLogin = () => {
  return (
    <div className="mt-24 flex h-74 w-full max-w-400 items-center justify-between rounded-8 bg-[#e6f2ff] px-23 py-16 text-gray-800 md:max-w-[640px]">
      <span className="text-16 font-medium">간편 로그인 하기</span>
      <div className="flex gap-16">
        {SOCIAL_LOGIN.map(({ name, href, icon }) => (
          <a key={name} href={href} target="_blank" rel="noopener noreferrer">
            {icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLogin;
