"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function RegisterBody() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phone,
            password,
            role,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      if (data?.success === true && data?.user) {
        const result = await signIn("credentials", {
          phone:data?.user?.phone,
          password,
          redirect: false,
        });
         if (result?.error) {
        alert("Register failed");
      } else {
        console.log("Registration successful:", result);
      }
      }else{
        alert(data?.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-center mb-3">Register</h2>

      <form onSubmit={handleRegister} className="space-y-2 text-sm">
        {/* Name */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full px-3 py-1.5 border rounded focus:outline-none focus:ring focus:ring-blue-400"
        />

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

        {/* Role */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-3 py-1.5 border rounded focus:outline-none focus:ring focus:ring-blue-400"
        >
          <option value="agent">Delivery Agent</option>
          <option value="customer">Customer</option>
        </select>

        {/* Button */}
        <button
          disabled={loading}
          type="submit"
          className="w-full py-1.5 mt-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-xs text-center mt-3">
        Already have an account?{" "}
        <Link href="/" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
