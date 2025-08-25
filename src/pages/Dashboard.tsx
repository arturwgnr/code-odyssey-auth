import Navbar from "../components/Navbar"

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Navbar/>
      <div className="dashboard-box">
        <h1>Welcome to Dashboard</h1>
        <p>This page also follows the theme filter 🎨</p>
      </div>
    </div>
  )
}
