import BaseDropdown from "./BaseDropdown";
import useDeviceSize from "@/hooks/useDeviceSize";
import SortIcon from "/public/images/ic_sort.svg";
import ArrowDownIcon from "/public/images/ic_arrow-down.svg";
import { SORT_OPTIONS, SortOptionsKeys } from "@/types/SortOptions";

interface SortDropdownProps {
  className?: string;
  order: SortOptionsKeys;
  onClick: (selectedOrder: SortOptionsKeys) => void;
}

const SortDropdown = ({ className, order, onClick }: SortDropdownProps) => {
  const deviceSize = useDeviceSize();
  const sortOptionsKeys = Object.keys(SORT_OPTIONS) as SortOptionsKeys[];

  const handleOptionClick = (selectedOrder: SortOptionsKeys) => {
    onClick(selectedOrder);
  };

  return (
    <BaseDropdown
      className={`flexcenter h-42 rounded-12 border border-gray-200 bg-white px-12 text-16 ${className}`}
      buttonContent={
        deviceSize === "small" ? (
          <SortIcon />
        ) : (
          <div className="flexcenter w-96">
            <p>{SORT_OPTIONS[order]}</p>
            <ArrowDownIcon />
          </div>
        )
      }
    >
      <div className="mt-4 rounded-12  border border-gray-200 bg-white">
        {sortOptionsKeys.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            className="flex w-128 justify-center border-b border-gray-200 p-8 text-base font-normal first:rounded-t-12 last:rounded-b-12 last:border-0"
          >
            {SORT_OPTIONS[option]}
          </button>
        ))}
      </div>
    </BaseDropdown>
  );
};

export default SortDropdown;
