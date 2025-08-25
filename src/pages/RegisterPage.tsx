import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function RegisterPage() {

  const auth = useContext(AuthContext);
  const nav = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('')
  const [userRole, setUserRole] = useState<"admin" | "user">("user");

 function handleRegister(e: React.FormEvent) {
  e.preventDefault();

    if(!username || !password) return;

    if(password !== repeatedPassword) {
      window.alert('Passwords must match!')

      return;
    }

    auth?.register(username, password, userRole);

    nav('/');
 

    setUsername('');
    setPassword('');
    setRepeatedPassword('');
  } 


  return (
    <div 
    className="register-container">
      <Navbar />
      <div className="register-box">
        <h1>Register</h1>
        <form>
          <input value={username} onChange={(e) => setUsername(e.target.value)}  type="text" placeholder="Username" />
          <input value={password} onChange={(e) => setPassword(e.target.value)}    type="password" placeholder="Password" />
          <input value={repeatedPassword} onChange={(e) => setRepeatedPassword(e.target.value)} type="password" placeholder="Repeat Password" />
          <select value={userRole} onChange={(e) => setUserRole(e.target.value as "admin" | "user") } >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={handleRegister} type="submit">Register</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
