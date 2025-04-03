"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Textfield from "../../../Components/Textfield";

const API_BASE_URL = "http://127.0.0.1:7878/admin_login";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/admin");
    }
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setError("กรุณากรอกชื่อผู้ใช้งานและรหัสผ่าน");
      return;
    }

    setError("");
    setIsLoading(true);

    const loginData = { username, password };

    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      setIsLoading(false);
      setUsername("");
      setPassword("");

      router.push("/admin");
    } catch (err: any) {
      console.error("Error logging in:", err);
      setError(err.message || "An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDE8D6] p-16">
      <div className="bg-white p-16 rounded-[20px] shadow-xl w-full max-w-[calc(100%-128px)] h-[calc(100vh-128px)] flex items-center">
        {/* Logo */}
        <div className="w-1/2 flex flex-col items-center">
          <img src="logo.png" alt="Kidney Care Logo" className="w-96 mb-6" />
        </div>

        {/* Form */}
        <div className="w-1/2 pl-12">
          <h2 className="text-orange-500 text-2xl font-bold mb-6">Welcome!</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <Textfield
            label="ชื่อผู้ใช้งาน"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />

          <Textfield
            label="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-orange-500 text-white py-3 rounded-md font-semibold text-lg hover:bg-orange-600 transition"
            disabled={isLoading}
          >
            {isLoading ? "กรุณารอสักครู่..." : "เข้าสู่ระบบ"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
