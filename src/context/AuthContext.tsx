import { createContext, useState } from "react";
/* eslint-disable react-refresh/only-export-components */


interface User {
  id: number;
  username: string;
  password: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  register: (username: string, password: string, role: "admin" | "user") => void;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  function register(username: string, password: string, role: "admin" | "user") {
    const newUser: User = {
      id: Date.now(),
      username,
      password,
      role,
    };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  }

  function login(username: string, password: string) {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser) as User;
      if (parsed.username === username && parsed.password === password) {
        setUser(parsed);
      } else {
        alert("User not found");
      }
    }
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}