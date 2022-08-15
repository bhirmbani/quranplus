import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { initializeApp } from "firebase/app";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
import Navbar from "./components/navbar";
import NavbarBottom from "./components/bottom-nav";
import styles from "./styles/app.css";
// import { getEnv } from "./env.server";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

// type LoaderData = {
//   ENV: ReturnType<typeof getEnv>;
// };

export const loader: LoaderFunction = async ({ request }) => {
  console.log(request)
  // return json<LoaderData>({
  //   ENV: getEnv(),
  // });
  return null
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "QuranPlus",
  description:
    "Aplikasi Baca dan Menghafal Quran Gratis, Simpel, Menarik, Cepat dan Mudah Digunakan.",
  viewport: "width=device-width,initial-scale=1",
  // open graph/facebook
  "og:description":
    "Aplikasi Baca dan Menghafal Quran Gratis, Simpel, Menarik, Cepat dan Mudah Digunakan.",
  "og:site_name": "QuranPlus",
  //facebook
  "og:type": "website",
  "og:url": "https://quranplus.xyz",
  "og:title": "QuranPlus",
  "og:image": "https://quranplus.xyz/main.png",
  // twitter
  "twitter:card": "summary_large_image",
  "twitter:url": "https://quranplus.xyz",
  "twitter:title": "QuranPlus",
  "twitter:description":
    "Aplikasi Baca dan Menghafal Quran Gratis, Simpel, Menarik, Cepat dan Mudah Digunakan.",
  "twitter:image": "https://quranplus.xyz/main.png",
});

export default function App() {
  // const data = useLoaderData() as LoaderData;
  // console.log(data)

  // const firebaseConfig = {
  //   apiKey: data.ENV.FIREBASE_APIKEY,
  //   authDomain: data.ENV.FIREBASE_AUTHDOMAIN,
  //   projectId: data.ENV.FIREBASE_PROJECTID,
  //   storageBucket: data.ENV.FIREBASE_STORAGEBUCKET,
  //   messagingSenderId: data.ENV.FIREBASE_MESSAGINGSENDERID,
  //   appId: data.ENV.FIREBASE_APPID,
  //   measurementId: data.ENV.FIREBASE_MEASUREMENTID,
  // };

  // Initialize Firebase
  // initializeApp(firebaseConfig);
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
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        /> */}
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
