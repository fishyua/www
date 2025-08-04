import styles from "./navbar.module.scss";
import { JSX, ParentProps } from "solid-js";

export function Navbar(props: ParentProps) {
  return <nav class={styles.navbar}>{props.children}</nav>;
}

interface NavbarItemProps extends ParentProps {
  href: string;
  newTab?: boolean;
}

export function NavbarItem({
  href,
  newTab = false,
  children,
}: NavbarItemProps) {
  return (
    <a href={href} {...(newTab && { target: "_blank", rel: "noreferrer" })}>
      {children}
    </a>
  );
}
