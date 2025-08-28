import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const auth = useContext(AuthContext);
  const username = auth?.user?.username ?? "Guest";
  const formatted = username.charAt(0).toUpperCase() + username.slice(1);

  const nav = useNavigate();

  function handleNav(path: string) {
    nav(`/dashboard/${path}`);
  }

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-content">
        <h1>Welcome back, {formatted}!</h1>

        {/* Top grid with small cards */}
        <div className="dashboard-grid">
          {/* Progress Card */}
          <div
            onClick={() => handleNav("progress")}
            id="progress"
            className="dashboard-card-1"
          >
            <h2>📊 Progress</h2>
            <p>Coming soon: topics studied and evolution.</p>
          </div>

          {/* Streak Card */}
          <div
            onClick={() => handleNav("streak")}
            id="streak"
            className="dashboard-card-2"
          >
            <h2>🔥 Streak</h2>
            <p>You are on day X of your journey!</p>
          </div>

          {/* Notes Card */}
          <div
            onClick={() => handleNav("notes")}
            id="notes"
            className="dashboard-card-3"
          >
            <h2>📝 Notes</h2>
            <p>Quick notes will appear here.</p>
          </div>
        </div>

        {/* Big card below grid */}
        <div className="dashboard-carousel">
          <div className="carousel-card">
            <h2>💡 Tip of the Day</h2>
            <p>Remember: consistency beats intensity. Keep coding daily.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
