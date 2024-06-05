import Link from "next/link";

interface LinkButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

function LinkButton({ children, className, href, ...rest }: LinkButtonProps) {
  const primaryStyle =
    "flexcenter h-48 w-128 rounded-8 border-none bg-blue text-16 font-semibold text-white hover:bg-[#1967d6] focus:outline-none active:bg-[#1251aa] disabled:cursor-not-allowed disabled:bg-gray-400 ";

  return (
    <Link
      href={href ?? "#"}
      className={`${primaryStyle} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

export default LinkButton;
