import Input from "@/components/Input/Input";

const FormGroupWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={`relative mb-18 flex flex-col gap-8 md:mb-24 ${className}`}>
    {children}
  </div>
);

const Label = ({
  className = "",
  children,
  ...rest
}: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className={`text-14 font-bold md:text-18 ${className}`} {...rest}>
    {children}
  </label>
);

const InputWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={`relative ${className}`}>{children}</div>;

const ErrorMessage = ({
  className,
  errorMsg,
}: {
  className?: string;
  errorMsg: string;
}) => <p className={`error-message text-error ${className}`}>{errorMsg}</p>;

const FormGroup = Object.assign(FormGroupWrapper, {
  Label: Label,
  InputWrapper: InputWrapper,
  InputField: Input,
  ErrorMessage: ErrorMessage,
});

export default FormGroup;
