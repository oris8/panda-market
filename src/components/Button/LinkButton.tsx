import Link from "next/link";

interface LinkButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

function LinkButton({ children, className, href, ...rest }: LinkButtonProps) {
  return (
    <Link href={href ?? "#"} className={`flexcenter ${className}`} {...rest}>
      {children}
    </Link>
  );
}

export default LinkButton;
