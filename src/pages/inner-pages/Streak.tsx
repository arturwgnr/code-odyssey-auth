import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";

export default function Streak() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // inicia fade-out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % sentences.length);
        setFade(false); // volta com fade-in
      }, 600); // tempo igual ao transition do CSS
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="streak-container">
      <Navbar />

      <div className="streak-content">
        {/* Title */}
        <h1>🔥 Your Streak</h1>
        <p className="streak-subtitle">Keep the fire alive!</p>

        {/* Current streak big number */}
        <div className="streak-current">
          <h2>12 Days in a Row</h2>
        </div>

        {/* Calendar grid */}
        <div className="streak-calendar">
          <div className="day done">Mon</div>
          <div className="day missed">Tue</div>
          <div className="day done">Wed</div>
          <div className="day done">Thu</div>
          <div className="day missed">Fri</div>
          <div className="day done">Sat</div>
          <div className="day today">Sun</div>
        </div>

        <div className="streak-quote">
  <p className={fade ? "fade" : ""}>
    "{sentences[currentIndex].text}"
  </p>
</div>

        {/* Action button */}
        <button className="streak-btn">✅ Mark today as done</button>
      </div>
    </div>
  );
}
