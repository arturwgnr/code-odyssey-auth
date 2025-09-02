import TopBarDash from "../../../components/TopBarDash";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function StAnalytics() {
  const nav = useNavigate();

  // 📊 Dados mockados só para exemplo
  const dailyData = [
    { date: "01/09", hours: 2 },
    { date: "02/09", hours: 1 },
    { date: "03/09", hours: 2.5 },
    { date: "04/09", hours: 3 },
    { date: "05/09", hours: 1.5 },
  ];

  const topicData = [
    { name: "React", value: 8 },
    { name: "TypeScript", value: 5 },
    { name: "Projects", value: 6 },
  ];

  const COLORS = ["#3a7562", "#f5b453", "#3b82f6"];

  return (
    <div className="st-analytics-container">
      <TopBarDash />
      <h1>📊 Study Analytics</h1>
      <p className="subtitle">Track your study time and focus</p>

      {/* Gráfico principal */}
      <section className="analytics-section">
        <h2>Hours Studied per Day</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dailyData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="hours"
              stroke="var(--btn-primary)"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* Métricas resumidas */}
      <section className="analytics-metrics">
        <h2>Summary</h2>
        <ul>
          <li>✅ Average per day: 1h45</li>
          <li>✅ Total this week: 12h</li>
          <li>✅ Total this month: 42h</li>
        </ul>
      </section>

      {/* Distribuição por tópicos */}
      <section className="analytics-distribution">
        <h2>By Topic</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={topicData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {topicData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </section>

      {/* Histórico */}
      <section className="analytics-log">
        <h2>History</h2>
        <ul>
          <li>01/09 → 2h → React Router</li>
          <li>02/09 → 1h → TypeScript</li>
          <li>03/09 → 2h30 → Project To-Do</li>
        </ul>
      </section>

      <button className="back-btn" onClick={() => nav("/dashboard/progress")}>
        ⬅ Back to Progress
      </button>
    </div>
  );
}
