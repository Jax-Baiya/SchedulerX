"use client";
import { useState } from "react";
import { login, register } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      if (isRegister) {
        await register(username, password);
      } else {
        await login(username, password);
      }
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Auth failed");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form className="bg-white p-8 rounded shadow-md w-80 flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-2">{isRegister ? "Register" : "Login"}</h2>
        <input
          className="border p-2 rounded"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button className="bg-blue-600 text-white rounded p-2" type="submit">
          {isRegister ? "Register" : "Login"}
        </button>
        <button
          type="button"
          className="text-blue-600 underline text-sm mt-2"
          onClick={() => setIsRegister((v) => !v)}
        >
          {isRegister ? "Already have an account? Login" : "No account? Register"}
        </button>
        <Link href="/admin" className="text-xs text-gray-500 mt-2 hover:underline">Admin/Monitoring</Link>
      </form>
    </div>
  );
}
