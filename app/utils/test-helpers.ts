export const formatDateInProgress = (
  progress: StatisticModel["memorized"]["progress"]
) => {
  const newSurah = progress.surah.map((each) => {
    return {
      ...each,
      date: each.date.toDateString(),
      updated_date: each.date.toDateString(),
    };
  });
  const newVerse = progress.surah.map((each) => {
    return {
      ...each,
      date: each.date.toDateString(),
      updated_date: each.date.toDateString(),
    };
  });

  return {
    surah: newSurah,
    verse: newVerse,
  };
};
