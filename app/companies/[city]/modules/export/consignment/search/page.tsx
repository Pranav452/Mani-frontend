"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const exportMenus = [
  { name: "Master", icon: "users" },
  { name: "Consignment", icon: "file", hasSubMenu: true },
  { name: "Shipment Progress", icon: "truck" },
  { name: "Container List", icon: "box" },
  { name: "Print Document", icon: "printer" },
  { name: "Report", icon: "chart" },
];

const consignmentSubMenus = [
  { name: "Consignment", icon: "ship", hasSubMenu: true },
  { name: "PSS", icon: "ticket" },
  { name: "Branch Job Transfer", icon: "ticket" },
  { name: "MISC", icon: "ticket", hasSubMenu: true },
  { name: "Warehouse Job", icon: "ticket" },
  { name: "Booking", icon: "ticket", hasSubMenu: true },
];

const consignmentNestedSubMenus = [
  { name: "Export Master", icon: "play" },
  { name: "Search", icon: "play" },
  { name: "Add New Job", icon: "play" },
];

const getIcon = (iconType: string) => {
  const icons: Record<string, React.ReactElement> = {
    users: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    file: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    truck: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    box: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    printer: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
    ),
    chart: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    ship: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h18M5 21V7l8-4v18m4-18v14m0 0l4-4m-4 4l-4-4" />
      </svg>
    ),
    ticket: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      </svg>
    ),
    play: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    ),
  };
  return icons[iconType] || icons.file;
};

export default function ExportSearchPage() {
  const router = useRouter();
  const params = useParams();
  const city = params?.city ? decodeURIComponent(params.city as string) : "";
  const [consignmentExpanded, setConsignmentExpanded] = useState(true);
  const [consignmentNestedExpanded, setConsignmentNestedExpanded] = useState(true);
  const [selectedSubMenu, setSelectedSubMenu] = useState("Search");
  
  const [searchType, setSearchType] = useState("Number Wise");
  const [numberType, setNumberType] = useState("Export No.");
  const [searchValue, setSearchValue] = useState("");

  const handleNavigation = (menuName: string) => {
    if (menuName === "Export Master" || menuName === "Add New Job") {
      router.push(`/companies/${encodeURIComponent(city)}/modules/export/consignment`);
    } else if (menuName === "Search") {
      setSelectedSubMenu("Search");
    } else {
      setSelectedSubMenu(menuName);
    }
  };

  const handleSearch = () => {
    console.log("Searching:", { searchType, numberType, searchValue });
    // Handle search logic here
  };

  const numberTypeOptions = [
    "Export No.",
    "HAWB No.",
    "Order No.",
    "Invoice No.",
    "MAWB No.",
    "Ref. No.",
    "FCR No.",
    "GRI No.",
    "No. of Pkgs",
    "BL No.",
    "Shipping Bill No.",
    "No. of Pcs",
  ];

  const companyName = "Manilal Patel Clearing Forwarding Pvt. Ltd.";

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between flex-shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 relative">
            <Image
              src="/logo.png"
              alt="Manilal Patel Group Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-gray-900 text-lg sm:text-xl font-semibold">
              {companyName}
            </h1>
            {city && (
              <p className="text-gray-500 text-xs sm:text-sm font-medium">{city.toUpperCase()}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
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
          <p className="text-gray-700 text-sm font-medium">Welcome PDG1</p>
          <button
            onClick={() => router.push(`/companies/${encodeURIComponent(city)}/modules`)}
            className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Home
          </button>
          <button
            onClick={() => router.push("/")}
            className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </header>

      <SidebarProvider defaultOpen={true}>
        <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 73px)', maxHeight: 'calc(100vh - 73px)' }}>
          {/* Left Sidebar */}
          <Sidebar collapsible="none" className="border-r border-gray-200 bg-white flex flex-col">
            <SidebarContent className="overflow-y-auto flex-1">
              <SidebarGroup>
                <SidebarGroupContent>
                  <div className="px-4 py-3">
                    <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
                      EXPORT MENUS
                    </h4>
                  </div>
                  <SidebarMenu>
                    {exportMenus.map((menu) => (
                      <SidebarMenuItem key={menu.name}>
                        {menu.name === "Consignment" ? (
                          <div>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setConsignmentExpanded(!consignmentExpanded);
                              }}
                              className={`w-full flex items-center justify-between gap-3 px-2 py-2 rounded-md text-sm transition-colors cursor-pointer ${
                                consignmentExpanded
                                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                  : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                              }`}
                              type="button"
                            >
                              <div className="flex items-center gap-3">
                                <div className="text-gray-600">
                                  {getIcon(menu.icon)}
                                </div>
                                <span className="text-sm">{menu.name}</span>
                              </div>
                              <svg 
                                className={`w-4 h-4 transition-transform duration-200 ${consignmentExpanded ? 'rotate-90' : ''}`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                            {consignmentExpanded && (
                              <div className="ml-4 mt-1 space-y-1 pl-2">
                                {consignmentSubMenus.map((subMenu) => (
                                  <div key={subMenu.name}>
                                    {subMenu.name === "Consignment" ? (
                                      <>
                                        <button
                                          onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setConsignmentNestedExpanded(!consignmentNestedExpanded);
                                          }}
                                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                                            consignmentNestedExpanded
                                              ? "bg-gray-50 text-gray-700"
                                              : "text-gray-700 hover:bg-gray-50"
                                          }`}
                                        >
                                          <div className="text-gray-500">
                                            {getIcon(subMenu.icon)}
                                          </div>
                                          <span>{subMenu.name}</span>
                                          <svg 
                                            className={`w-3 h-3 ml-auto transition-transform duration-200 ${consignmentNestedExpanded ? 'rotate-90' : ''}`}
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                          >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                          </svg>
                                        </button>
                                        {consignmentNestedExpanded && (
                                          <div className="ml-4 mt-1 space-y-1 pl-2">
                                            {consignmentNestedSubMenus.map((nestedMenu) => (
                                              <button
                                                key={nestedMenu.name}
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  e.stopPropagation();
                                                  handleNavigation(nestedMenu.name);
                                                }}
                                                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                                                  selectedSubMenu === nestedMenu.name
                                                    ? "bg-blue-50 text-blue-700"
                                                    : "text-gray-700 hover:bg-gray-50"
                                                }`}
                                              >
                                                <div className={selectedSubMenu === nestedMenu.name ? "text-blue-600" : "text-gray-500"}>
                                                  {getIcon(nestedMenu.icon)}
                                                </div>
                                                <span>{nestedMenu.name}</span>
                                              </button>
                                            ))}
                                          </div>
                                        )}
                                      </>
                                    ) : (
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          handleNavigation(subMenu.name);
                                        }}
                                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                                          selectedSubMenu === subMenu.name
                                            ? "bg-blue-50 text-blue-700"
                                            : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                      >
                                        <div className={selectedSubMenu === subMenu.name ? "text-blue-600" : "text-gray-500"}>
                                          {getIcon(subMenu.icon)}
                                        </div>
                                        <span>{subMenu.name}</span>
                                        {subMenu.hasSubMenu && (
                                          <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                          </svg>
                                        )}
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <SidebarMenuButton
                            onClick={() => {}}
                            isActive={false}
                            className="w-full justify-between cursor-pointer"
                            type="button"
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-gray-600">
                                {getIcon(menu.icon)}
                              </div>
                              <span className="text-sm">{menu.name}</span>
                            </div>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </SidebarMenuButton>
                        )}
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t border-gray-200 p-4 flex-shrink-0">
              <p className="text-xs text-gray-500 text-center">
                Version 9.0.30729.1 ©2014 Manilal Patel Group. All Rights Reserved.
              </p>
            </SidebarFooter>
          </Sidebar>

          {/* Main Content */}
          <SidebarInset className="flex flex-col overflow-hidden bg-gray-50">
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 min-h-0">
              {/* Breadcrumbs */}
              <div className="mb-6">
                <nav className="flex items-center gap-2 text-sm text-gray-600">
                  <span 
                    className="hover:text-gray-900 cursor-pointer" 
                    onClick={() => router.push(`/companies/${encodeURIComponent(city)}/modules`)}
                  >
                    Modules
                  </span>
                  <span>/</span>
                  <span 
                    className="hover:text-gray-900 cursor-pointer" 
                    onClick={() => router.push(`/companies/${encodeURIComponent(city)}/modules/export`)}
                  >
                    Export
                  </span>
                  <span>/</span>
                  <span 
                    className="hover:text-gray-900 cursor-pointer" 
                    onClick={() => router.push(`/companies/${encodeURIComponent(city)}/modules/export/consignment`)}
                  >
                    Consignment
                  </span>
                  <span>/</span>
                  <span className="text-gray-900 font-semibold">Export Master Search</span>
                </nav>
              </div>

              {/* Search Form */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-xl font-bold text-gray-900">Search</h2>
                </div>

                <div className="p-6 space-y-6">
                  {/* Search Type Selection */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Search By</Label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="searchType"
                          value="Number Wise"
                          checked={searchType === "Number Wise"}
                          onChange={(e) => setSearchType(e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Number Wise</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="searchType"
                          value="Vessel Wise"
                          checked={searchType === "Vessel Wise"}
                          onChange={(e) => setSearchType(e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Vessel Wise</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="searchType"
                          value="Shipper Wise"
                          checked={searchType === "Shipper Wise"}
                          onChange={(e) => setSearchType(e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Shipper Wise</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="searchType"
                          value="Consignee Wise"
                          checked={searchType === "Consignee Wise"}
                          onChange={(e) => setSearchType(e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Consignee Wise</span>
                      </label>
                    </div>
                  </div>

                  {/* Number Type Selection (shown when Number Wise is selected) */}
                  {searchType === "Number Wise" && (
                    <div className="space-y-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Select Number Type</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {numberTypeOptions.map((option) => (
                          <label key={option} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="numberType"
                              value={option}
                              checked={numberType === option}
                              onChange={(e) => setNumberType(e.target.value)}
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="text-sm text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Search Input */}
                  <div className="space-y-2">
                    <Label htmlFor="searchValue" className="text-sm font-medium text-gray-700">
                      {numberType}
                    </Label>
                    <Input
                      id="searchValue"
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder={`Enter ${numberType.toLowerCase()}`}
                      className="w-full"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearch();
                        }
                      }}
                    />
                  </div>

                  {/* Search Button */}
                  <div className="pt-4">
                    <Button
                      onClick={handleSearch}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}

