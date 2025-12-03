"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const cities = [
  "Mumbai",
  "New Delhi",
  "Chennai",
  "Bangalore",
  "Ahmedabad",
  "Cochin",
  "Kolkata",
  "Tuticorin",
  "Tirupur",
];

// Map city names to their image file names
const getCityImage = (city: string): string | null => {
  const imageMap: Record<string, string> = {
    "Mumbai": "/cities/Mumbai 80x80.avif",
    "New Delhi": "/cities/NCR 80x80.avif",
    "Chennai": "/cities/Chen 80x80.avif",
    "Bangalore": "/cities/Bang 80x80.avif",
    "Ahmedabad": "/cities/AHD 80x80.avif",
    "Cochin": "/cities/Koch 80x80.avif",
    "Kolkata": "/cities/Kolk 80x80.avif",
    "Tuticorin": "/cities/Chen 80x80.avif", // Same as Chennai
    "Tirupur": "/cities/Chen 80x80.avif", // Same as Chennai
  };
  return imageMap[city] || null;
};

// Fallback gradient for cities without images
const getGradient = (index: number) => {
  const hues = [220, 240, 260, 280, 300, 320, 340, 0, 20];
  return `linear-gradient(135deg, hsl(${hues[index]}, 70%, 50%) 0%, hsl(${hues[index]}, 70%, 40%) 100%)`;
};

export default function CitiesPage() {
  const router = useRouter();

  const handleCityClick = (city: string) => {
    router.push(`/companies/${encodeURIComponent(city)}`);
  };

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-shrink-0 z-10 shadow-sm">
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
          <h1 className="text-gray-900 text-base sm:text-xl font-semibold truncate">Manilal Patel Group</h1>
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

      {/* Cities Grid */}
      <div className="p-4 sm:p-5 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <div className="mb-4">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <span 
                className="hover:text-gray-900 cursor-pointer" 
                onClick={() => router.push("/")}
              >
                Home
              </span>
              <span>/</span>
              <span className="text-gray-900 font-semibold">Cities</span>
            </nav>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Select Your City
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {cities.map((city, index) => {
              const cityImage = getCityImage(city);
              const hasImage = cityImage !== null;
              
              return (
                <div
                  key={city}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer h-36 sm:h-40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-gray-100"
                  onClick={() => handleCityClick(city)}
                  style={!hasImage ? {
                    background: getGradient(index),
                  } : undefined}
                >
                  {/* Background Image */}
                  {hasImage && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                      <Image
                        src={cityImage}
                        alt={city}
                        width={160}
                        height={160}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  )}
                  
                  {/* Darker Overlay Gradient for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20 rounded-2xl" />
                  
                  {/* Frosty White Overlay on Hover */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 backdrop-blur-[2px] rounded-2xl transition-all duration-300" />
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-between p-4 z-10">
                    <div className="flex-1 flex items-start">
                      <h3 className="text-gray-800 text-lg sm:text-xl font-bold group-hover:translate-x-1 transition-transform duration-300" >
                        {city}
                      </h3>
                    </div>
                    
                    {/* Arrow Icon */}
                    <div className="flex justify-end">
                      <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/30 backdrop-blur-sm border-2 border-white/40 group-hover:bg-white/40 group-hover:translate-x-1 transition-all duration-300 shadow-lg">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 px-4 sm:px-6 py-3 mt-auto">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-600 text-xs sm:text-sm text-center">
            Version 9.0.30729.1 ©2014 Manilal Patel Group. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
