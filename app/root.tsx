import type { MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Navbar from "./components/navbar";
import NavbarBottom from "./components/bottom-nav";
import styles from "./styles/app.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en" data-theme="corporate">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="container sm mx-auto max-w-2xl">
        <div>
          <Navbar />
          <Outlet />
          <NavbarBottom />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
