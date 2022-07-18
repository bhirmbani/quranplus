export async function getVerseAudio(verseNumber: number) {
  const res = fetch(
    `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${verseNumber}.mp3`
  );
  return (await res).blob();
}
