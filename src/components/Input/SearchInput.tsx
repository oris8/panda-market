import BaseInput from "@/components/Input/BaseInput";
import SearchIcon from "/public/images/ic_search.svg";

interface SearchInputProps {
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onKeyDown?: (value: string) => void;
}

const SearchInput = ({
  className = "",
  placeholder,
  defaultValue = "",
  onChange,
  onKeyDown,
}: SearchInputProps) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && onKeyDown) {
      onKeyDown(e.currentTarget.value);
    }
  };

  return (
    <div className={`relative h-40 w-full min-w-294 ${className}`}>
      <div className="absolute left-16 top-8">
        <SearchIcon />
      </div>
      <BaseInput
        type="text"
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="pl-44"
      />
    </div>
  );
};

export default SearchInput;
