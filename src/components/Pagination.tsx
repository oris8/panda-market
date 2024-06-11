import ArrowRightIcon from "/public/images/ic_arrow-right.svg";
import ArrowLeftIcon from "/public/images/ic_arrow-left.svg";

interface PaginationProps {
  className?: string;
  currentPage?: number;
  totalPages?: number;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToPage?: (page: number) => void;
}

const Pagination = ({
  className,
  currentPage = 0,
  totalPages = 0,
  goToNextPage,
  goToPrevPage,
  goToPage,
}: PaginationProps) => {
  const buttonStyle =
    "flexcenter m-2 h-40 w-40 rounded-[100%] border border-gray-200 text-16 font-semibold text-cool-gray-500 disabled:opacity-50";

  const renderPageButtons = () => {
    return Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i + 1}
        onClick={goToPage ? () => goToPage(i + 1) : undefined}
        className={`${buttonStyle} ${
          i + 1 === currentPage ? "bg-blue text-white" : ""
        }`}
      >
        {i + 1}
      </button>
    ));
  };

  const renderPageButtonEllipsis = () => {
    return Array.from({ length: totalPages }, (_, i) => {
      if (
        i === 0 ||
        i === totalPages - 1 ||
        Math.abs(i + 1 - currentPage) < 2
      ) {
        return (
          <button
            key={i + 1}
            onClick={goToPage ? () => goToPage(i + 1) : undefined}
            className={`${buttonStyle} ${
              i + 1 === currentPage ? "bg-blue text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        );
      } else if (
        (i === 1 && currentPage > 3) ||
        (i === totalPages - 2 && currentPage < totalPages - 3)
      ) {
        return (
          <span
            key={i + 1}
            className="flexcenter m-2 h-40 w-40 text-16 font-semibold text-cool-gray-500"
          >
            ...
          </span>
        );
      }
      return null;
    }).filter(Boolean);
  };

  return (
    <div className={`flexcenter w-full ${className}`}>
      <button
        onClick={goToPrevPage}
        disabled={totalPages ? currentPage === 1 : false}
        className={buttonStyle}
      >
        <ArrowLeftIcon />
      </button>
      <> {totalPages < 6 ? renderPageButtons() : renderPageButtonEllipsis()}</>
      <button
        onClick={goToNextPage}
        disabled={totalPages ? currentPage === totalPages : false}
        className={buttonStyle}
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default Pagination;
