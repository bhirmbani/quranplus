export default function Stats() {
  return (
    <div className="flex flex-col min-h-content">
      <div className="prose prose-sm flex justify-center mt-5 mb-4 min-w-full">
        <div className="mx-5 my-5">
          <h2 className="text-center m-0 mr-0.5">Tentang QuranPlus</h2>
          <p>
            Aplikasi Baca dan Menghafal Quran Gratis, Simpel, Menarik, Cepat dan
            Mudah Digunakan.
          </p>
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <p>{error.message}</p>
      <p>{error.stack}</p>
    </div>
  );
}
