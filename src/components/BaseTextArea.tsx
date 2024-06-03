interface BaseTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const BaseTextArea = ({
  className = "",
  label,
  placeholder,
  value,
  autoComplete = "off",
  ...rest
}: BaseTextAreaProps) => {
  return (
    <>
      <textarea
        className={`${className} h-200 w-full resize-none rounded-12 border-0  bg-cool-gray-100 p-16
        text-16 [&::placeholder]:text-cool-gray-400 [&:focus]:outline [&:focus]:outline-blue`}
        id={label}
        name={label}
        placeholder={placeholder}
        value={value}
        autoComplete={autoComplete}
        {...rest}
      />
    </>
  );
};

export default BaseTextArea;
