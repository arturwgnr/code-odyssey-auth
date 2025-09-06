import { createContext, useState } from "react";

/* Interfaces */
interface StreakData {
  count: number;
  lastDate: string | null;
}

interface User {
  id: number;
  username: string;
  password: string;
  role: "admin" | "user";
  streak: StreakData;
  progress: string[];
  notes: string[];
}

interface AuthContextType {
  user: User | null;
  register: (username: string, password: string, role: "admin" | "user") => void;
  login: (username: string, password: string) => void;
  logout: () => void;
}

/* Context */
export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  function getStoredUsers(): User[] {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  }

  function saveUsers(users: User[]) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  function register(username: string, password: string, role: "admin" | "user") {
    const users = getStoredUsers();

    // checar se já existe
    if (users.some((u) => u.username === username)) {
      alert("Username already exists");
      return;
    }

    const newUser: User = {
      id: Date.now(),
      username,
      password,
      role,
      streak: { count: 0, lastDate: null },
      progress: [],
      notes: [],
    };

    const updated = [...users, newUser];
    saveUsers(updated);
    setUser(newUser);
  }

  function login(username: string, password: string) {
    const users = getStoredUsers();
    const found = users.find(
      (u) => u.username === username && u.password === password
    );

    if (found) {
      setUser(found);
    } else {
      alert("User not found");
    }
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
