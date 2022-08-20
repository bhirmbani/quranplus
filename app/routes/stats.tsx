import { useLiveQuery } from "dexie-react-hooks";
import { copies } from "~/repositories/messages";
import { getStatistics } from "~/services/stats";
import Chart from "react-frappe-charts";
import { formatDate, formatDateDayJs } from "~/utils/time-manipulation";
import { InfoIcon } from "~/components/icon";
import { surahs } from "~/repositories/surahs";

export default function Stats() {
  const statistics = useLiveQuery(() => getStatistics());

  const statisticsReady = statistics && statistics[0] && statistics[0];

  const statsLastReadData =
  statistics && statistics[0] && statistics[0].last_read;

  const surahProgressFirstDate =
    statisticsReady?.memorized.progress.surah[0].date;
  const surahProgressLatestDate =
    statisticsReady?.memorized.progress.surah[
      statisticsReady?.memorized.progress.surah.length - 1
    ].date;

  const verseProgressFirstDate =
    statisticsReady?.memorized.progress.verse[0].date;
  const verseProgressLatestDate =
    statisticsReady?.memorized.progress.verse[
      statisticsReady?.memorized.progress.verse.length - 1
    ].date;

  // timestamp in second
  // Math. floor(Date.now() / 1000)

  // only return the last 7 days
  const verseProgressChartDate = statisticsReady?.memorized.progress.verse
    .slice(-7)
    .map((each) => {
      return formatDateDayJs(each.date);
    });

  const verseProgressChartCount = statisticsReady?.memorized.progress.verse
    .slice(-7)
    .map((each) => {
      return each.count;
    });

  const surahProgressChartCount = statisticsReady?.memorized.progress.surah
    .slice(-7)
    .map((each) => {
      return each.count;
    });

  // let verseProgressChartData: Record<number, number> = {};
  // let surahProgressChartData: Record<number, number> = {};

  // statisticsReady?.memorized.progress.verse.forEach((each) => {
  //   verseProgressChartData[Math.floor(new Date(each.date).getTime() / 1000)] =
  //     each.count;
  // });
  // statisticsReady?.memorized.progress.surah.forEach((each) => {
  //   surahProgressChartData[Math.floor(new Date(each.date).getTime() / 1000)] =
  //     each.count;
  // });

  // console.log(verseProgressChartData);

  return (
    statistics !== undefined && (
      <div className="flex flex-col min-h-content">
        <div className="prose prose-sm flex justify-center mt-5 mb-4 min-w-full">
          <h2 className="text-center m-0 mr-0.5">Statistik kamu</h2>
          <div className="flex items-center">
            <button className="btn btn-xs btn-ghost btn-circle">
              <InfoIcon />
            </button>
          </div>
        </div>
        <div className="flex flex-1">
          <div className="mb-5 prose prose-sm overflow-y-scroll scroll-smooth min-w-full flex flex-col justify-between">
            <div className="flex flex-row">
              <div className="stat">
                <div className="stat-title">{copies["id"].surah}</div>
                <div className="stat-value">
                  {statisticsReady?.memorized.surah}
                </div>
                <div className="stat-desc">{`${formatDate(
                  surahProgressFirstDate || new Date()
                )} - ${formatDate(
                  surahProgressLatestDate || new Date()
                )}`}</div>
              </div>

              <div className="stat">
                <div className="stat-title">{copies["id"].verse}</div>
                <div className="stat-value">
                  {statisticsReady?.memorized.verse}
                </div>
                <div className="stat-desc">{`${formatDate(
                  verseProgressFirstDate || new Date()
                )} - ${formatDate(
                  verseProgressLatestDate || new Date()
                )}`}</div>
              </div>
            </div>

            <div className="min-w-full flex justify-center">
              <p className="prose prose-sm m-0">Ayat yang terakhir kamu baca</p>
            </div>
            <div className="min-w-full flex justify-center">
              <p className="prose prose-sm m-0">
                {surahs["id"][statsLastReadData?.surah_idx || 0].transliteration}{" "}
                {surahs["id"][statsLastReadData?.surah_idx || 0].id}:
                {surahs["id"][statsLastReadData?.surah_idx || 0].verses[statsLastReadData?.verse_idx || 0].id}
              </p>
            </div>

            <div className="min-w-full flex justify-center">
              <p className="prose prose-sm m-0 font-bold">
                Kemajuan hafalan Quran kamu{" "}
                <span className="underline align-super">BETA</span>
              </p>
            </div>
            <div className="max-w-full">
              <Chart
                type="line"
                // colors={["#21ba45"]}
                axisOptions={{
                  xAxisMode: "tick",
                  yAxisMode: "tick",
                  xIsSeries: 1,
                }}
                // height={700}
                data={{
                  // dataPoints: surahProgressChartData,
                  // start: decrementTime(
                  //   surahProgressFirstDate as Date,
                  //   2,
                  //   "months"
                  // ).toDate(),
                  // end: surahProgressLatestDate,
                  labels: verseProgressChartDate,
                  datasets: [
                    {
                      values: surahProgressChartCount as number[],
                      name: "surat",
                    },
                    {
                      values: verseProgressChartCount as number[],
                      name: "ayat",
                    },
                  ],
                }}
              />
              {/* <Chart
            type="heatmap"
            // colors={["#21ba45"]}
            axisOptions={{
              xAxisMode: "tick",
              yAxisMode: "tick",
              xIsSeries: 1,
            }}
            // height={200}
            data={{
              dataPoints: verseProgressChartData,
              start: decrementTime(
                verseProgressFirstDate as Date,
                2,
                "months"
              ).toDate(),
              end: verseProgressLatestDate,
              // labels: verseProgressChartDate,
              // datasets: [{ values: verseProgressChartCount as number[] }],
            }}
          /> */}
            </div>
          </div>
        </div>
      </div>
    )
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
