import { useState } from "react";
import { add } from "./utils.js";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function App() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);

  async function handleGreet(e) {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/api/greet/${encodeURIComponent(name || "friend")}`);
    const data = await res.json();
    setGreeting(data.message || data.error);
  }

  return (
    <main style={{ fontFamily: "sans-serif", maxWidth: 480, margin: "40px auto" }}>
      <h1>CI/CD Demo</h1>
      <p>Flask backend + React frontend, wired up with GitHub Actions.</p>

      <section>
        <h2>Greet (calls the Flask API)</h2>
        <form onSubmit={handleGreet}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
          <button type="submit">Greet me</button>
        </form>
        {greeting && <p data-testid="greeting">{greeting}</p>}
      </section>

      <section>
        <h2>Add (pure JS, unit tested)</h2>
        <input type="number" value={a} onChange={(e) => setA(e.target.value)} />
        {" + "}
        <input type="number" value={b} onChange={(e) => setB(e.target.value)} />
        <p data-testid="sum">= {add(a, b)}</p>
      </section>
    </main>
  );
}
