import { useState, useEffect } from "react"
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from "recharts"
import TopBarDash from "../../../components/TopBarDash";
import { useNavigate } from "react-router-dom";

interface Skill {
  name: string
  level: number
}

export default function SkOverview() {
  const nav = useNavigate();

  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("skills")
    if (saved) {
      setSkills(JSON.parse(saved))
    }
  }, [])

  return (
    <div className="progress-chart">
      <TopBarDash/>
      <h2>Skills Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="80%"
          data={skills.map(s => ({ skill: s.name, level: s.level }))}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="skill" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Skills"
            dataKey="level"
            stroke="var(--btn-primary)"
            fill="var(--btn-primary)"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer><br />

        <button className="back-btn" onClick={() => nav("/dashboard/progress")}>
        ⬅ Back to Progress
      </button>
    </div>
  )
}
