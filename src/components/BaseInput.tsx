interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const BaseInput: React.FC<BaseInputProps> = ({
  className = "",
  label,
  type,
  placeholder,
  value,
  accept,
  autoComplete = "off",
  ...rest
}) => {
  return (
    <input
      className={`focus:outline-blue-500 h-full w-full rounded-12 bg-cool-gray-100 p-16 text-16 placeholder-cool-gray-400 ${className}`}
      id={label}
      name={label}
      type={type}
      placeholder={placeholder}
      value={value}
      accept={accept}
      autoComplete={autoComplete}
      {...rest}
    />
  );
};

export default BaseInput;
