import { PropsWithChildren } from "react";
import Link from "next/link";

export const Navbar = (props: PropsWithChildren) => (
  <nav className="z-9999 sticky top-0 flex items-center p-4 gap-4 bg-linear-to-b from-background to-transparent">
    {props.children}
  </nav>
);

interface NavbarItemProps extends PropsWithChildren {
  href: string;
  newWindow?: boolean;
}

export const NavbarItem = ({
  href,
  newWindow = false,
  children,
}: NavbarItemProps) => (
  <Link
    href={href}
    prefetch={false}
    {...(newWindow ? { target: "_blank", rel: "noreferrer" } : {})}
  >
    {children}
  </Link>
);
