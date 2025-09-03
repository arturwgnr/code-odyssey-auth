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
import { useState, useEffect } from "react";

interface StudyLog {
  id: number;
  date: string;
  topic: string;
  duration: number;
}

export default function StAnalytics() {
  const nav = useNavigate();

  const [logs, setLogs] = useState<StudyLog[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("studyLogs");

    if (saved) {
      setLogs(JSON.parse(saved));
    }
  }, []);

  console.log(logs);

  // 📊 Dados mockados só para exemplo
  const dailyData = [
    { date: "01/09", hours: 2 },
    { date: "02/09", hours: 1 },
    { date: "03/09", hours: 2.5 },
    { date: "04/09", hours: 3 },
    { date: "05/09", hours: 1.5 },
  ];

  const COLORS = [
    "#3a7562", // verde musgo
    "#f5b453", // amarelo
    "#3b82f6", // azul
    "#e57373", // vermelho suave
    "#8e44ad", // roxo
    "#16a085", // verde água
    "#ff9800", // laranja
    "#2ecc71", // verde vivo
    "#9b59b6", // lilás
    "#3498db", // azul claro
  ];

  function formatDuration(minutes: number) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h${m > 0 ? `${m}m` : ""}` : `${m}m`;
  }

  function getTopicData(logs: StudyLog[]) {
    const totals: Record<string, number> = {};

    for (let log of logs) {
      if (!totals[log.topic]) {
        totals[log.topic] = 0;
      }
      totals[log.topic] += log.duration;
    }

    // transformar em array (pro PieChart)
    return Object.entries(totals).map(([name, value]) => ({
      name,
      value,
    }));
  }

  // já ordenado do maior pro menor
  const topicData = getTopicData(logs).sort((a, b) => b.value - a.value);

  return (
    <div className="st-analytics-container">
      <TopBarDash />
      <h1>📊 Study Analytics</h1>
      <br />
      <p className="subtitle">Track your study time and focus (Streak Page)</p>

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
              data={topicData} // agora vai o já ordenado
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
          {logs.map((item) => (
            <li key={item.id}>
              {item.date} → {formatDuration(item.duration)} → {item.topic}
            </li>
          ))}
        </ul>
      </section>

      <button className="back-btn" onClick={() => nav("/dashboard/progress")}>
        ⬅ Back to Progress
      </button>
    </div>
  );
}

//remover index e atualizar streaks com delete e css
