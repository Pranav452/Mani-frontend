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
    console.log(`Navigating to ${city}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
            <svg
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M10 10 L20 5 L30 10 L30 20 L20 25 L10 20 Z M10 20 L20 15 L30 20 L30 30 L20 35 L10 30 Z"
                stroke="#2563eb"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-gray-900 text-base sm:text-xl font-semibold truncate">Manilal Patel Group</h1>
        </div>
        <button
          onClick={() => router.push("/")}
          className="text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base px-2 sm:px-0"
        >
          Logout
        </button>
      </header>

      {/* Cities Grid */}
      <div className="p-4 sm:p-5 md:p-6">
        <div className="max-w-7xl mx-auto">
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
    </div>
  );
}
