"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ParentRegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/parent/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Inscription échouée");
      } else {
        // Une fois inscrit, on redirige vers la page de connexion
        router.push("/parent/login");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 border rounded-lg p-6"
      >
        <h1 className="text-2xl font-semibold text-center">
          Créer mon compte parent
        </h1>

        <div>
          <label className="block mb-1 text-sm">Nom complet</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Ex: Mohamed Amraoui"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Email</label>
          <input
            className="w-full border rounded px-3 py-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="vous@exemple.com"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Mot de passe</label>
          <input
            className="w-full border rounded px-3 py-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded mt-2 disabled:opacity-60"
        >
          {loading ? "Inscription..." : "Je m'inscris"}
        </button>

        <p className="text-sm text-center mt-2">
          Déjà un compte ?{" "}
          <a href="/parent/login" className="underline">
            Se connecter
          </a>
        </p>
      </form>
    </main>
  );
}
