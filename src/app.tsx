import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

import "./app.css";
import { Navbar, NavbarItem } from "~/components/navbar";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>feiyeur</Title>
          <Navbar>
            <NavbarItem href="/">feiyeur</NavbarItem>
            <NavbarItem href="https://github.com/feiyeur" newTab>
              github
            </NavbarItem>
          </Navbar>
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
