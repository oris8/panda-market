import BaseButton from "./BaseButton";

interface PrimaryButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  onClick?: () => void;
}

function PrimaryButton({ children, className, ...rest }: PrimaryButtonProps) {
  const primaryStyle =
    "flexcenter h-48 w-128 rounded-8 border-none bg-blue text-16 font-semibold text-white hover:bg-blue-hover focus:outline-none active:bg-blue-active disabled:cursor-not-allowed disabled:bg-disable ";

  return (
    <BaseButton className={`${primaryStyle} ${className}`} {...rest}>
      {children}
    </BaseButton>
  );
}

export default PrimaryButton;
