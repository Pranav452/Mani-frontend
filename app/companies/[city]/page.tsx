"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

const companies = [
  "MANILAL PATEL CLEARING FORWARDING PVT. LTD.",
  "RICAL LOGISTICS PVT. LTD.",
  "SPEEDFRET",
  "INTERNATIONAL MOVERS",
  "MANILAL PATEL & CO. AND ASSOCIATED CONCERNS EMPLOYEES PROVIDENT FUND",
  "J.P. FREIGHT FORWARDERS",
  "SPEDITION PVT. LTD.",
];

export default function CompaniesPage() {
  const router = useRouter();
  const params = useParams();
  const city = params?.city ? decodeURIComponent(params.city as string) : "";

  const handleCompanyClick = (company: string, index: number) => {
    if (index === 0) {
      router.push(`/companies/${encodeURIComponent(city)}/modules`);
    }
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
        <div className="max-w-4xl mx-auto">
          {/* Back Button Row */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.push("/cities")}
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
              <span className="text-sm font-medium">Back to Cities</span>
            </button>
            {city && (
              <span className="text-gray-900 font-semibold text-sm sm:text-base">
                {city}
              </span>
            )}
          </div>

          <div className="space-y-3">
            {companies.map((company, index) => {
              const isClickable = index === 0;
              
              return (
                <div
                  key={company}
                  onClick={() => handleCompanyClick(company, index)}
                  className={`
                    group relative px-6 py-4 rounded-xl border-2 transition-all duration-200
                    ${isClickable 
                      ? "bg-white border-gray-200 hover:border-blue-500 hover:shadow-lg cursor-pointer hover:bg-blue-50/50" 
                      : "bg-gray-50 border-gray-100 cursor-not-allowed opacity-60"
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-2 h-2 rounded-full transition-colors
                        ${isClickable ? "bg-blue-500 group-hover:bg-blue-600" : "bg-gray-300"}
                      `} />
                      <h3 className={`
                        font-semibold text-base sm:text-lg
                        ${isClickable ? "text-gray-900 group-hover:text-blue-700" : "text-gray-500"}
                      `}>
                        {company}
                      </h3>
                    </div>
                    {isClickable && (
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              );
            })}
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

