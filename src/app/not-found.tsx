const shadowStyle =
  "absolute bottom-0 left-1/2 h-4 w-82 -translate-x-1/2 transform rounded-[50%] bg-black bg-opacity-20 shadow-[0_0_5px_5px_rgba(0,0,0,0.2)]";

export default function NotFoundPage() {
  return (
    <div className="relative mx-auto mt-80 h-[calc(100vh-230px)] max-w-[1280px]">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-32 font-bold tracking-widest">
        <div className="leading-102 relative mb-24 whitespace-nowrap text-100">
          <div className={shadowStyle}></div>
          <span>4</span>
          <span className="mx-14 inline-block animate-emojiFloating">🐼</span>
          <span>4</span>
        </div>
        NotFoundPage
      </div>
    </div>
  );
}
