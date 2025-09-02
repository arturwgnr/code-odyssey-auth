import { useState, useEffect } from "react"
import TopBarDash from "../../components/TopBarDash"
import { useNavigate } from "react-router-dom"

interface Skill {
  name: string
  level: number
}

export default function Progress() {

  const nav = useNavigate();

  function handleNav(id: string) {

    const format = '/progress/'

    nav(`${format + id}`)
  } 

  const [skills, setSkills] = useState<Skill[]>(() => {
    const saved = localStorage.getItem("skills")
    return saved ? JSON.parse(saved) : []
  })

  const [newSkill, setNewSkill] = useState("")
  const [newLevel, setNewLevel] = useState("")

  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editLevel, setEditLevel] = useState("")

  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills))
  }, [skills])

  // Add skill
  function handleAddSkill(e: React.FormEvent) {
    e.preventDefault()
    if (!newSkill || !newLevel) return
    setSkills([...skills, { name: newSkill, level: Number(newLevel) }])
    setNewSkill("")
    setNewLevel("")
  }

  // Delete skill
  function handleDeleteSkill(index: number) {
    const updated = skills.filter((_, i) => i !== index)
    setSkills(updated)
  }

  // Start edit
  function handleStartEdit(index: number) {
    setEditingIndex(index)
    setEditLevel(skills[index].level.toString())
  }

  // Save edit
  function handleSaveEdit(index: number) {
    const updated = [...skills]
    updated[index].level = Number(editLevel)
    setSkills(updated)
    setEditingIndex(null)
    setEditLevel("")
  }

  return (
    <div className="progress-container">
      <TopBarDash />
      <h1>📊 Progress</h1>
      <p className="subtitle">Topics studied and evolution</p> 
      
      <div className="button-options">
      <button className="skills-button" id="skills-overview" onClick={() => handleNav("skills-overview")} >Skills Overview</button><br />
      <button className="skills-button"  onClick={() => handleNav("study-analytics")} >Study Analytics</button><br />
       <button className="skills-button">Projects Progress</button>
      </div>

      

      {/* Skills Section */}
      <section className="progress-skills">
        <h2>Skills Progress</h2><br />

        {skills.map((s, i) => (
          <div key={i} className="skill">
            <span>{s.name}</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${s.level}%` }}></div>
            </div>

            {editingIndex === i ? (
              <>
                <input
                  type="number"
                  value={editLevel}
                  onChange={(e) => setEditLevel(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(i)}>💾 Save</button>
              </>
            ) : (
              <span className="percent">{s.level}%</span>
            )}

            <button onClick={() => handleStartEdit(i)}>✏️</button>
            <button onClick={() => handleDeleteSkill(i)}>❌</button>
          </div>
        ))}

        {/* Formulário */}
        <form onSubmit={handleAddSkill} className="skill-form">
          <input
            type="text"
            placeholder="Skill name"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <input
            type="number"
            placeholder="%"
            value={newLevel}
            onChange={(e) => setNewLevel(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </section>
    </div>
  )
}
