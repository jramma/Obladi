'use client'

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      username: credentials.username,
      password: credentials.password,
    });

    if (res?.error) {
      alert("Invalid credentials");
    } else {
      router.push("/dashboard"); // Redirige al dashboard o página principal
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-6 p-10 rounded-lg shadow-lg w-80 bg-white">
        <h2 className="text-2xl font-bold">Login</h2>
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
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">Sign In</button>
      </form>
    </div>
  );
}
