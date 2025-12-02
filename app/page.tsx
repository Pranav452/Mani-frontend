"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/cities");
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Panel - Stacked Images */}
      <div className="hidden lg:flex lg:w-150 flex-col relative">
        {/* Black overlay covers all stacked images */}
        <div className="absolute inset-0 z-10 bg-black/40 pointer-events-none rounded-br-3xl rounded-tr-3xl" />
        <div className="flex-1 relative overflow-hidden">
          <Image
            src="/1.jpg"
            alt="Shipping"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-br-3xl" />
        </div>
        <div className="flex-1 relative overflow-hidden">
          <Image
            src="/2.jpg"
            alt="Transportation"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
        <div className="flex-1 relative overflow-hidden">
          <Image
            src="/3.jpg"
            alt="Logistics"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-tr-3xl" />
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col">
        {/* Login Form */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 md:p-12">
          <div className="w-full max-w-md">
            {/* Company Logo and Name */}
            <div className="flex items-center gap-4 mb-10">
              <div className="w-16 h-16 flex items-center justify-center relative">
                <Image
                  src="/logo.png"
                  alt="Manilal Patel Group Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h1 className="text-gray-900 text-2xl sm:text-3xl font-semibold">Manilal Patel Group</h1>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Login
            </h2>
            <p className="text-gray-600 mb-8">
              Sign in to access your account
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="youremail@email.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
