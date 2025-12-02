"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

// Order matches the image: starting from top-center (Finance) going clockwise
const modules = [
  { name: "Finance", icon: "rupee" },      // top-center
  { name: "Master", icon: "plus" },        // top-right
  { name: "Export", icon: "arrows" },      // middle-right
  { name: "Order", icon: "cart" },         // bottom-right
  { name: "Raise Ticket", icon: "hand" },   // bottom-center
  { name: "EDI/XML", icon: "message" },    // bottom-left
  { name: "E-Doc", icon: "folder" },       // middle-left
  { name: "Import", icon: "box" },         // top-left
  { name: "Admin", icon: "gear" },         // top (above Import)
];

const getIcon = (iconType: string) => {
  const icons: Record<string, JSX.Element> = {
    rupee: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    plus: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    arrows: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    cart: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    folder: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
    message: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    hand: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
      </svg>
    ),
    box: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    gear: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  };
  return icons[iconType] || icons.plus;
};

export default function ModulesPage() {
  const router = useRouter();
  const params = useParams();
  const city = params?.city ? decodeURIComponent(params.city as string) : "";

  const handleModuleClick = (moduleName: string) => {
    if (moduleName === "E-Doc") {
      const url = `/companies/${encodeURIComponent(city)}/modules/e-doc`;
      window.open(url, '_blank');
    } else {
      console.log(`Navigating to ${moduleName}`);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0 relative">
            <Image
              src="/logo.png"
              alt="Manilal Patel Group Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <h1 className="text-gray-900 text-base sm:text-xl font-semibold truncate">
            Manilal Patel Group
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <button
            onClick={() => router.push("/")}
            className="text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base px-2 sm:px-0"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-5 md:p-6">
        <div className="w-full max-w-4xl mx-auto">
          {/* Back Button Row */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.push(`/companies/${encodeURIComponent(city)}`)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <svg
                className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="text-sm font-medium">Back</span>
            </button>
            {city && (
              <span className="text-gray-900 font-semibold text-sm sm:text-base">
                {city}
              </span>
            )}
          </div>

          {/* Circular Modules Layout */}
          <div className="relative w-full aspect-square max-w-xl mx-auto">
            {/* Central MODULES Button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <button className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg sm:text-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center">
                MODULES
              </button>
            </div>

            {/* Module Buttons arranged in circle */}
            <div className="absolute inset-0">
              {modules.map((module, index) => {
                // Start from top-center (-90° from right, or 0° from top) and go clockwise
                const startAngle = -90; // top-center position
                const angle = startAngle + (index * 360) / modules.length;
                const radius = 32; // percentage from center
                const radian = (angle * Math.PI) / 180;
                const x = 50 + radius * Math.cos(radian - Math.PI / 2);
                const y = 50 + radius * Math.sin(radian - Math.PI / 2);

                return (
                  <button
                    key={module.name}
                    onClick={() => handleModuleClick(module.name)}
                    className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-2 border-gray-200 hover:border-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex flex-col items-center justify-center group text-gray-600 group-hover:text-blue-600"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="mb-1 group-hover:scale-110 transition-transform">
                      {getIcon(module.icon)}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold">
                      {module.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-600 text-xs sm:text-sm text-center">
            Version 9.0.30729.1 ©2014 Manilal Patel Group. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

