interface BaseButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
}

function BaseButton({ children, className, type, ...rest }: BaseButtonProps) {
  return (
    <button className={className} type={type} {...rest}>
      {children}
    </button>
  );
}

export default BaseButton;
