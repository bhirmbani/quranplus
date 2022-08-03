import { useLiveQuery } from "dexie-react-hooks";
import { getStatistics } from "~/services/stats";

export default function Stats() {
  const statistics = useLiveQuery(() => getStatistics());

  console.log(statistics);
  return (
    <div className="min-h-content">
      <div className="stats stats-vertical md:stats-horizontal shadow min-w-full">
        <div className="stat">
          <div className="stat-title">Downloads</div>
          <div className="stat-value">31K</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-title">New Users</div>
          <div className="stat-value">4,200</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-title">New Registers</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
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
