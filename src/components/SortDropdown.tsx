import BaseDropdown from "./BaseDropdown";
import useDeviceSize from "@/hooks/useDeviceSize";
import SortIcon from "/public/images/ic_sort.svg";
import ArrowDownIcon from "/public/images/ic_arrow-down.svg";

type SortOptions = { [key in string]: string };

interface SortDropdownProps<T extends SortOptions> {
  className?: string;
  order: keyof T;
  options: T;
  onClick: (selectedOrder: keyof T) => void;
}

const SortDropdown = <T extends SortOptions>({
  className,
  order,
  options,
  onClick,
}: SortDropdownProps<T>) => {
  const deviceSize = useDeviceSize();
  const sortOptionsKeys = Object.keys(options) as Array<keyof T>;

  const handleOptionClick = (selectedOrder: keyof T) => {
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
            <p>{options[order]}</p>
            <ArrowDownIcon />
          </div>
        )
      }
    >
      <div className="mt-4 rounded-12  border border-gray-200 bg-white">
        {sortOptionsKeys.map((option) => (
          <button
            key={option as string}
            onClick={() => handleOptionClick(option)}
            className="flex w-128 justify-center border-b border-gray-200 p-8 text-base font-normal first:rounded-t-12 last:rounded-b-12 last:border-0"
          >
            {options[option]}
          </button>
        ))}
      </div>
    </BaseDropdown>
  );
};

export default SortDropdown;
