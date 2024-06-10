interface SectionDescriptionProps {
  badgeText?: string;
  title: string;
  content: string;
}

const SectionDescription = ({
  badgeText,
  title,
  content,
}: SectionDescriptionProps) => {
  const splitTitle = title.split("\n");
  const splitContent = content.split("\n");

  const baseTitleStyle =
    "font-bold mb-20 mt-8 text-24 leading-34 text-gray-700 md:leading:45 md:mt-12 md:text-32 xl:mb-24 xl:text-40 xl:leading-56";

  return (
    <div className="my-auto h-444 w-full shrink-0">
      {badgeText && (
        <span className="text-700 text-16 text-blue md:text-18">
          {badgeText}
        </span>
      )}
      <p className={`${baseTitleStyle} hidden xl:block`}>
        {splitTitle[0]}
        <br />
        {splitTitle[1]}
      </p>
      <p className={`${baseTitleStyle} xl:hidden`}>
        {splitTitle[0]} {splitTitle[1]}
      </p>
      <p className="mb-64 text-16 leading-19 text-gray-700 md:text-18 md:leading-22 xl:text-24 xl:leading-29">
        {splitContent[0]}
        <br />
        {splitContent[1]}
      </p>
    </div>
  );
};

export default SectionDescription;
