import Image from "next/image";
import SectionDescription from "./SectionDescription";

interface SectionProps {
  src: string;
  badge: string;
  title: string;
  content: string;
}

const Section = ({ src, badge, title, content }: SectionProps) => {
  return (
    <div className="item-center flex h-auto min-h-[720px] flex-col gap-64 md:p-24 xl:flex xl:flex-row [&:nth-child(2)]:text-end xl:[&:nth-child(2)]:flex-row-reverse">
      <div className="relative mb-20 h-auto w-full overflow-hidden rounded-16 xl:h-[444px] xl:w-[558px] xl:shrink-0">
        <Image
          src={src}
          alt="판다마켓"
          fill
          sizes="100% 100%"
          className="autoImage"
        />
      </div>
      <SectionDescription badgeText={badge} title={title} content={content} />
    </div>
  );
};

export default Section;
