'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí podrías hacer una solicitud a tu backend para registrar al usuario
    console.log("Registering:", credentials);
    router.push("/auth/signin"); // Redirige al login después del registro
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-6 p-10 rounded-lg shadow-lg w-80 bg-white">
        <h2 className="text-2xl font-bold">Sign Up</h2>
        <div>
          <label htmlFor="username" className="block">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">Sign Up</button>
      </form>
    </div>
  );
}
