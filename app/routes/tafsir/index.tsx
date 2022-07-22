import { ActionFunction, json, LoaderFunction } from "@remix-run/cloudflare";
import {
  Form,
  Link,
  useActionData,
  useCatch,
  useLoaderData,
  useMatches,
  useNavigate,
  useTransition,
} from "@remix-run/react";
import { copies } from "~/repositories/messages";

// const somethings = [
//   {
//     title: "one",
//     description: "this is one",
//   },
// ];

export const loader: LoaderFunction = async ({ params }) => {
  const somethings = [
    {
      title: "one",
      description: "this is one",
    },
  ];
  return json({ somethings });
};

const createSomething = async (body: {
  title: string;
  description: string;
}) => {
  // console.info(`${endpoints.sutanlab}${surahNumber}/${verseNumber}`);
  // return await (
  //   await fetch(`${endpoints.sutanlab}/surah/${surahNumber}/${verseNumber}`, { method: "GET"
  // })
  // ).json();

  return {
    code: 200,
    message: "Success create something",
    body,
  };
};

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  const somethingNew = Object.fromEntries(body);
  console.log(somethingNew);
  const project = await createSomething(somethingNew);
  // somethings.push(somethingNew)
  return project;
  // return redirect(`/projects/${project.id}`);
};

export default function TafsirIndex() {
  // const navigate = useNavigate();
  // const randomSurah = Math.floor(Math.random() * 256);
  // const randomAyah = Math.floor(Math.random() * 4);
  // const matches = useMatches();
  // console.log(matches);
  const transition = useTransition();
  const loader = useLoaderData();
  const actionData = useActionData();
  console.log(actionData, transition);
  return (
    <div className="flex max-h-content">
      <div id="quran-content" className="mx-auto my-5 prose prose-sm">
        {/* <button
          onClick={() => navigate(`/tafsir/${randomSurah}/${randomAyah}`, { replace: true })}
          className="btn btn-success btn-wide btn-sm"
        >
          {copies["id"]["random-surah-tafsir"]}
        </button> */}
        <div className="flex flex-col">
          <Form method="post">
            <div className="flex flex-col">
              <label>
                Title: <input type="text" name="title" />
              </label>
              <label htmlFor="description">Description:</label>
              <textarea name="description" id="description" />
              <button
                disabled={transition.submission}
                className="btn btn-sm"
                type="submit"
              >
                {transition.submission ? "Creating something..." : "Submit"}
              </button>
            </div>
          </Form>
          {loader.somethings.map((each) => (
            <div key={each.title}>
              <p>TITLE: {each.title}</p>
              <p>DESCRIPTION: {each.description}</p>
            </div>
          ))}
          {transition.submission ? (
            <div key={Object.fromEntries(transition.submission.formData).title}>
              <p>
                TITLE:{" "}
                {Object.fromEntries(transition.submission.formData).title}
              </p>
              <p>
                DESCRIPTION:{" "}
                {Object.fromEntries(transition.submission.formData).description}
              </p>
            </div>
          ) : actionData && actionData.code === 400 ? 'try again' : null}
        </div>
        <Link prefetch="intent" to={`/tafsir/${1}/${2}`}>
          {copies["id"]["random-surah-tafsir"]}
        </Link>
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
        {caught.status}
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
