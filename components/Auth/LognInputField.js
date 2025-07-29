"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LogInInputField() {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Phone:", phone);
    console.log("Password:", password);
    try {
      const result = await signIn("credentials", {
        phone,
        password,
        redirect: false,
        
      });

      if (result?.error) {
        alert("Login failed");
      } else {
        // redirect or do something after successful login
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-center mb-3">Login</h2>

      <form onSubmit={handleLogin} className="space-y-2 text-sm">
        {/* Phone */}
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          className="w-full px-3 py-1.5 border rounded focus:outline-none focus:ring focus:ring-blue-400"
        />

        {/* Password */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-3 py-1.5 border rounded focus:outline-none focus:ring focus:ring-blue-400"
        />

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-1.5 mt-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Logging..." : "Login"}
        </button>
      </form>

      <p className="text-xs text-center mt-3">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
