import Banner from "@/components/Home/Banner";
import Section from "@/components/Home/Section";

const BANNER_INFO = [
  {
    src: "/images/img_home-top.png",
    alt: "판다가 반갑게 손을 흔들고 있어요",
    description: "일상의 모든 물건을\n거래해보세요",
    buttonText: "구경하러 가기",
  },
  {
    src: "/images/img_home-bottom.png",
    alt: "즐거운 중고거래가 끝나고 판다들이 헤어지고 있어요",
    description: "믿을 수 있는\n판다마켓 중고거래",
  },
];

const SECTION_INFO = [
  {
    src: "/images/img_home-01.png",
    badge: "Hot item",
    title: "인기 상품을\n확인해 보세요",
    content: "가장 HOT한 중고거래 물품을\n판다 마켓에서 확인해보세요",
  },
  {
    src: "/images/img_home-02.png",
    badge: "search",
    title: "구매를 원하는\n상품을 검색하세요",
    content: "구매하고 싶은 물품은 검색해서\n쉽게 찾아보세요",
  },
  {
    src: "/images/img_home-03.png",
    badge: "Register",
    title: "판매를 원하는\n상품을 등록하세요",
    content: "어떤 물건이든 판매하고 싶은 상품을\n쉽게 등록하세요",
  },
];

export default function HomePage() {
  return (
    <div className="flexcenter mt-70 w-full flex-col">
      <Banner info={BANNER_INFO[0]} isTop={true} />
      <div className="h-auto w-full max-w-[1200px] p-16">
        {SECTION_INFO.map(({ src, badge, title, content }) => (
          <Section
            key={title}
            src={src}
            badge={badge}
            title={title}
            content={content}
          />
        ))}
      </div>
      <Banner info={BANNER_INFO[1]} />
    </div>
  );
}
