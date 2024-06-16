import MedalIcon from "/public/images/ic_medal.svg";

const BestBadge = () => {
  return (
    <div className="flexcenter h-30 w-102 rounded-b-32 text-16 gap-4 bg-blue font-semibold text-white">
      <MedalIcon />
      Best
    </div>
  );
};

export default BestBadge;
