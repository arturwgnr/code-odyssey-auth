import TopBarDash from "../../components/TopBarDash";
import { useState, useEffect } from "react";


interface StudyLog {
  date: string;    // YYYY-MM-DD
  topic: string;
  duration: number; // minutos
}

export default function Streak() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [logs, setLogs] = useState<StudyLog[]>(() => {
    const saved = localStorage.getItem("studyLogs");
    return saved ? JSON.parse(saved) : [];
  });

  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("");

  // Frases motivacionais
  const sentences = [
    { text: "Discipline over motivation." },
    { text: "Small steps, big results." },
    { text: "Show up, even on bad days." },
    { text: "Progress loves patience." },
    { text: "Routine builds resilience." },
    { text: "One day at a time." },
    { text: "Consistency compounds success." },
    { text: "Habits shape destiny." },
    { text: "The grind is the glory." },
    { text: "Win the day, every day." },
  ];

  // animação frases
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % sentences.length);
        setFade(false);
      }, 600);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // salvar no localStorage
  useEffect(() => {
    localStorage.setItem("studyLogs", JSON.stringify(logs));
  }, [logs]);

  // adicionar check-in
  function handleCheckIn(e: React.FormEvent) {
    e.preventDefault();
    if (!topic || !duration) return;

    const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
    const newLog: StudyLog = {
      date: today,
      topic,
      duration: Number(duration),
    };

    setLogs([...logs, newLog]);
    setTopic("");
    setDuration("");
  }

  return (
    <div className="streak-container">
      <TopBarDash />

      <div className="streak-content">
        <h1>🔥 Your Streak</h1>
        <p className="streak-subtitle">Keep the fire alive!</p>

        {/* Streak placeholder */}
        <div className="streak-current">
          <h2>{logs.length} Days Logged</h2>
        </div>

        {/* Formulário check-in */}
        <form onSubmit={handleCheckIn} className="streak-form">
          <input
            type="text"
            placeholder="Topic studied"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <input
            type="number"
            placeholder="Duration (min)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <button type="submit" className="streak-btn">
            ✅ Mark today as done
          </button>
        </form>

        {/* Lista rápida */}
        <div className="streak-log-preview">
          <h3>Recent Logs</h3>
          <ul>
            {logs.slice(-5).map((log, i) => (
              <li key={i}>
                {log.date} → {log.duration}min → {log.topic}
              </li>
            ))}
          </ul>
        </div>

        {/* Frase motivacional */}
        <div className="streak-quote">
          <p className={fade ? "fade" : ""}>
            "{sentences[currentIndex].text}"
          </p>
        </div>
      </div>
    </div>
  );
}
