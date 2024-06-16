import Image from "next/image";
import Button from "@/components/Button/Button";

const Banner = ({ isTop = false, info }: any) => {
  const { src, alt, description, buttonText } = info;

  const desc = description.split("\n");

  const baseBannerStyle =
    "relative flex h-[540px] w-screen justify-center overflow-hidden bg-[#cfe5ff] md:h-[771px] xl:h-[540px]";
  const baseDescriptionStyle =
    "flex flex-col item-center gap-18 max-w-[1200px] w-screen h-full mt-48 text-32 font-bold leading-45 text-center z-1 md:mt-84 md:text-40 md:leading-56 xl:mt-0 xl:justify-center xl:item-start xl:text-left";

  const variablesStyle = {
    topBannerStyle: "content-center gap-18 h-[540px] md:gap-24",
    bottomBannerStyle: " h-full",
  };

  const bannerStyle = isTop
    ? variablesStyle.topBannerStyle
    : variablesStyle.bottomBannerStyle;

  return (
    <div className={`${baseBannerStyle} `}>
      <div className={`${bannerStyle}`}>
        <div className="absolute bottom-0 left-[50%] h-281 w-[626px] translate-x-[-50%] md:h-447 md:w-[996px] xl:translate-x-[-33%] ">
          <div className="relative h-281 w-[626px] md:h-447 md:w-[996px]">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100, 100"
              style={{ objectFit: "cover" }}
              loading="eager"
            />
          </div>
        </div>
        <div className={`${baseDescriptionStyle}`}>
          {isTop ? (
            <>
              <p className={`md:hidden xl:block`}>
                {desc[0]}
                <br />
                {desc[1]}
              </p>
              <p className={`hidden md:block xl:hidden`}>
                {desc[0]} {desc[1]}
              </p>
            </>
          ) : (
            <>
              <p className={`md:hidden xl:block`}>
                {desc[0]}
                <br />
                {desc[1]}
              </p>
              <p className={`hidden md:block xl:hidden`}>
                {desc[0]} {desc[1]}
              </p>
            </>
          )}
          {buttonText && (
            <Button.Link
              className="ct--primary-rounded-button mx-auto w-154 text-16 md:w-335 md:text-20 xl:mx-0"
              href="/items"
            >
              {buttonText}
            </Button.Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
