import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import {
  Link,
  Outlet,
  useCatch,
  useLoaderData,
  useMatches,
  useNavigate,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import { copies } from "~/repositories/messages";
import { getTafsirByVerse } from "~/services/tafsir";

export const loader: LoaderFunction = async ({ params }) => {
  const { surahNum, verseNum } = params;
  console.log(params);
  invariant(surahNum, "surahNum is required");
  invariant(verseNum, "verseNum is required");
  const data = await getTafsirByVerse(Number(verseNum), Number(surahNum));
  if (data.code !== 200) {
    throw new Response(data.message, {
      status: data.code,
    });
  }
  return json<SutanlabTafsirVerseModel>(data);
};

export default function TafsirAyat() {
  const loader = useLoaderData() as SutanlabTafsirVerseModel;
  const matches = useMatches();
  return (
    <div className="flex max-h-content">
      <div
        id="quran-content"
        className="mx-auto my-5 prose prose-sm overflow-y-scroll hide-scrollbar scroll-smooth"
      >
        <h2 className="text-center">Tafsir Pendek</h2>
        <p className="text-center">{matches[1].data.data}</p>
        <div className="mx-5">
          <p>{loader.data.tafsir['id'].short}</p>
        </div>
        {/* <Outlet /> */}
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
    <div className="text-center mx-5">
      <h1>
        {caught.status}
      </h1>
      <p>{caught.data}</p>
    </div>
  );
}
