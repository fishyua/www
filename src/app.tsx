import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

import "./app.css";
import { Navbar, NavbarItem } from "~/components/navbar";

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <Navbar>
            <NavbarItem href="/">feiyeur</NavbarItem>
            <NavbarItem href="/posts">posts</NavbarItem>
            <NavbarItem href="https://github.com/feiyeur" newTab>
              github
            </NavbarItem>
          </Navbar>
          <Suspense>{props.children}</Suspense>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
