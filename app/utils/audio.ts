export const generateAudioPromises = () => {
  const promises = [];
  surahs.forEach((surah) => {
    surah.verses.forEach((verse) => {
      promises.push(
        new Promise((resolve, reject) => {
          const audio = new Audio();
          audio.src = `${verse.audio}`;
          audio.onloadeddata = () => {
            resolve(audio);
          };
          audio.onerror = () => {
            reject(audio);
          };
        })
      );
    });
  });
  return promises;
}