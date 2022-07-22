import { json, LoaderFunction } from "@remix-run/cloudflare";
import { Link, Outlet, useCatch, useNavigate } from "@remix-run/react";
import { copies } from "~/repositories/messages";

export const loader: LoaderFunction = async () => {
  return json({ data: 'data from parent route' });
};

export default function TafsirRoot() {
  return (
    <div className="flex max-h-content">
      <div
        id="quran-content"
        className="mx-auto my-5 prose prose-sm overflow-y-scroll hide-scrollbar scroll-smooth"
      >
        <h2 className="text-center">Tafsir Ayat Page</h2>
        <Outlet />
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  const navigate = useNavigate();
  return (
    <div className="flex max-h-content h-screen">
      <div
        id="quran-content"
        className="mx-auto my-5 prose prose-sm overflow-y-scroll hide-scrollbar scroll-smooth flex flex-col justify-center items-center"
      >
        <p className="text-center text-red-800">{error.message}</p>
        <button
          onClick={() => navigate("/?surah=1", { replace: true })}
          className="btn btn-success btn-wide btn-sm"
        >
          {copies["id"]["go-back-home"]}
        </button>
      </div>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
        {caught.data}
      </div>
      <button className="mt-5">
        <Link
          to="/"
          replace={true}
          className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
        >
          {copies["id"]["go-back-home"]}
        </Link>
      </button>
    </main>
  );
}
