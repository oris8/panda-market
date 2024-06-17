import { forwardRef } from "react";

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      className,
      label,
      type,
      placeholder,
      value,
      accept,
      autoComplete = "off",
      ...rest
    },
    ref,
  ) => {
    return (
      <input
        className={`h-full w-full rounded-12 bg-cool-gray-100 p-16 text-16 placeholder-cool-gray-400 focus:outline-1 focus:outline-blue ${className}`}
        id={label}
        name={label}
        type={type}
        placeholder={placeholder}
        value={value}
        accept={accept}
        autoComplete={autoComplete}
        ref={ref}
        {...rest}
      />
    );
  },
);

BaseInput.displayName = "BaseInput";

export default BaseInput;
