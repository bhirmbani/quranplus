import { surahs } from "~/repositories/surahs";

export default function Index() {
  return (
    <div className="min-h-content">
      <h1>{surahs['id'][0].name}</h1>
      <h1>{surahs['id'][0].transliteration} - {surahs['id'][0].total_verses} Ayat</h1>
      {surahs["id"][0].verses.map((each) => (
        <div key={each.id}>
          <p>{each.text}</p>
          <p>{each.translation}</p>
        </div>
      ))}
    </div>
  );
}
