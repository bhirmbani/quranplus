import type { MetaFunction } from "@remix-run/cloudflare";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import Navbar from "./components/navbar";
import NavbarBottom from "./components/bottom-nav";
import styles from "./styles/app.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "QuranPlus",
  description:
    "Aplikasi Baca dan Menghafal Quran Gratis, Simpel, Menarik, Cepat dan Mudah Digunakan.",
  viewport: "width=device-width,initial-scale=1",
  // open graph/facebook
  "og:description":
    "Aplikasi Baca dan Menghafal Quran Gratis, Simpel, Menarik, Cepat dan Mudah Digunakan.",
  //facebook
  "og:type": "website",
  "og:url": "https://quranplus.xyz",
  "og:title": "QuranPlus",
  "og:image": "",
  // twitter
  "twitter:card": "summary_large_image",
  "twitter:url": "https://quranplus.xyz",
  "twitter:title": "QuranPlus",
  "twitter:description":
    "Aplikasi Baca dan Menghafal Quran Gratis, Simpel, Menarik, Cepat dan Mudah Digunakan.",
  "twitter:image": "",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="container sm mx-auto max-w-2xl h-screen overflow-y-hidden">
        <>
          <Navbar />
          <Outlet />
          <NavbarBottom />
        </>
        <ScrollRestoration />
        <Scripts />
        <LiveReload port={8002} />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="container sm mx-auto max-w-2xl h-screen overflow-y-hidden">
        {caught.status === 404 && (
          <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">
              404
            </h1>
            <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
              Page Not Found
            </div>
            <button className="mt-5">
              <Link
                to="/"
                className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
              >
                Go Home
              </Link>
            </button>
          </main>
        )}
        <ScrollRestoration />
        <Scripts />
        <LiveReload port={8002} />
      </body>
    </html>
  );
}
