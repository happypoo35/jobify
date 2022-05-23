import { useGetStatsQuery } from "app/api.jobs";
import { Spinner } from "components/Common";
import { useEffect, useRef, useState } from "react";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const Stats = () => {
  const { data: stats, isLoading } = useGetStatsQuery();

  const data = [
    {
      count: stats?.stats.pending || 0,
      title: "pending applications",
      icon: <FaSuitcaseRolling />,
      name: "pending",
    },
    {
      count: stats?.stats.interview || 0,
      title: "interviews scheduled",
      icon: <FaCalendarCheck />,
      name: "interview",
    },
    {
      count: stats?.stats.declined || 0,
      title: "jobs declined",
      icon: <FaBug />,
      name: "declined",
    },
  ];

  const [w, setW] = useState(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setW(statsRef?.current?.scrollWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [statsRef?.current?.scrollWidth]);

  return (
    <section className="dashboard-section stats" ref={statsRef}>
      <section className="stats-cards">
        {data.map((el, id) => (
          <article key={id} className={`stats-card ${el.name}`}>
            <header className="stats-card-header">
              <span className="count">
                {isLoading ? <Spinner size="big" color="gray" /> : el.count}
              </span>
              <span className="icon">{el.icon}</span>
            </header>
            <h5 className="h5">{el.title}</h5>
          </article>
        ))}
      </section>
      {isLoading ? (
        <Spinner size="big" />
      ) : (
        stats?.monthlyApplications.length > 0 && (
          <section className="chart">
            <div className="text">
              <h4 className="h4">Monthly applications</h4>
              <p>Job applications in last 12 months</p>
            </div>
            <div className="chart-wrapper">
              <div className="chart-container">
                <LineChart
                  width={w}
                  height={300}
                  data={stats.monthlyApplications}
                >
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="hsl(185, 62%, 45%)"
                  />
                  <CartesianGrid
                    stroke="hsl(210, 31%, 85%)"
                    strokeDasharray="5 5"
                  />
                  <XAxis
                    stroke="hsl(211, 27%, 70%)"
                    dataKey="date"
                    tickMargin={10}
                  />
                  <YAxis stroke="hsl(211, 27%, 70%)" />
                  <Tooltip />
                </LineChart>
              </div>
            </div>
          </section>
        )
      )}
    </section>
  );
};
export default Stats;
