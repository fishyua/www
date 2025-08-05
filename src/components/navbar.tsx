import styles from "./navbar.module.scss";
import { ParentProps } from "solid-js";
import { A } from "@solidjs/router";

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
    <A href={href} {...(newTab && { target: "_blank", rel: "noreferrer" })}>
      {children}
    </A>
  );
}
