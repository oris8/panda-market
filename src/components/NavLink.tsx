"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  activeClassName: string;
  inactiveClassName: string;
  className: string;
}

const NavLink = ({
  href,
  children,
  activeClassName = "",
  inactiveClassName = "",
  className = "",
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const navLinkStyle = `${className} ${
    isActive ? activeClassName : inactiveClassName
  } `;

  return (
    <Link href={href} className={navLinkStyle}>
      {children}
    </Link>
  );
};

export default NavLink;
