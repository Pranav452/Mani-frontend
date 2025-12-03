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

export default function ExportConsignmentPage() {
  const router = useRouter();
  const params = useParams();
  const city = params?.city ? decodeURIComponent(params.city as string) : "";
  const [consignmentExpanded, setConsignmentExpanded] = useState(true);
  const [consignmentNestedExpanded, setConsignmentNestedExpanded] = useState(true);
  const [selectedSubMenu, setSelectedSubMenu] = useState("Consignment");
  
  const handleNavigation = (menuName: string) => {
    if (menuName === "Export Master" || menuName === "Add New Job") {
      setSelectedSubMenu("Consignment");
    } else if (menuName === "Search") {
      router.push(`/companies/${encodeURIComponent(city)}/modules/export/consignment/search`);
    } else {
      setSelectedSubMenu(menuName);
    }
  };
  
  // Form state
  const [formData, setFormData] = useState({
    modeType: "Exporter/Shipper",
    mode: "",
    exporterShipper: "",
    billTo: "",
    manufacturer: "",
    agent: "",
    subAgent: "",
    notifySame: false,
    consigneeBuyer: "Consignee",
    consignee: "",
    buyerName: "",
    consignedToBank: "",
    modeOfShipment: "Docks/Godown Stuffing",
    vesselName: "",
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleReset = () => {
    setFormData({
      modeType: "Exporter/Shipper",
      mode: "",
      exporterShipper: "",
      billTo: "",
      manufacturer: "",
      agent: "",
      subAgent: "",
      notifySame: false,
      consigneeBuyer: "Consignee",
      consignee: "",
      buyerName: "",
      consignedToBank: "",
      modeOfShipment: "Docks/Godown Stuffing",
      vesselName: "",
    });
  };

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
                                            setSelectedSubMenu("Consignment");
                                            setConsignmentNestedExpanded(!consignmentNestedExpanded);
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
                  <span className="hover:text-gray-900 cursor-pointer" onClick={() => router.push(`/companies/${encodeURIComponent(city)}/modules`)}>Modules</span>
                  <span>/</span>
                  <span className="hover:text-gray-900 cursor-pointer" onClick={() => router.push(`/companies/${encodeURIComponent(city)}/modules/export`)}>Export</span>
                  <span>/</span>
                  <span className="hover:text-gray-900 cursor-pointer">Consignment</span>
                  <span>/</span>
                  <span className="text-gray-900 font-semibold">Consignment</span>
                </nav>
              </div>

              {/* Form Container */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                {/* Form Header */}
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">EXPORT CONSIGNMENT</h2>
                  <h3 className="text-lg font-semibold text-gray-700">EXPORT CONSIGNMENT DETAILS</h3>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Mode Section */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Mode*</Label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="modeType"
                            value="Exporter/Shipper"
                            checked={formData.modeType === "Exporter/Shipper"}
                            onChange={(e) => handleInputChange("modeType", e.target.value)}
                            className="w-4 h-4 text-blue-600"
                          />
                          <span className="text-sm text-gray-700">Exporter/Shipper</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="modeType"
                            value="Bill To"
                            checked={formData.modeType === "Bill To"}
                            onChange={(e) => handleInputChange("modeType", e.target.value)}
                            className="w-4 h-4 text-blue-600"
                          />
                          <span className="text-sm text-gray-700">Bill To</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="modeType"
                            value="Manufacture"
                            checked={formData.modeType === "Manufacture"}
                            onChange={(e) => handleInputChange("modeType", e.target.value)}
                            className="w-4 h-4 text-blue-600"
                          />
                          <span className="text-sm text-gray-700">Manufacture</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="mode" className="text-sm font-medium text-gray-700">
                          Mode
                        </Label>
                        <select
                          id="mode"
                          value={formData.mode}
                          onChange={(e) => handleInputChange("mode", e.target.value)}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">--Select--</option>
                        </select>
                      </div>

                      {formData.modeType === "Exporter/Shipper" && (
                        <div>
                          <Label htmlFor="exporterShipper" className="text-sm font-medium text-gray-700">
                            Exporter/Shipper*
                          </Label>
                          <Input
                            id="exporterShipper"
                            value={formData.exporterShipper}
                            onChange={(e) => handleInputChange("exporterShipper", e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                      )}

                      {formData.modeType === "Bill To" && (
                        <div>
                          <Label htmlFor="billTo" className="text-sm font-medium text-gray-700">
                            Bill To*
                          </Label>
                          <Input
                            id="billTo"
                            value={formData.billTo}
                            onChange={(e) => handleInputChange("billTo", e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                      )}

                      {formData.modeType === "Manufacture" && (
                        <div>
                          <Label htmlFor="manufacturer" className="text-sm font-medium text-gray-700">
                            Manufacturer
                          </Label>
                          <Input
                            id="manufacturer"
                            value={formData.manufacturer}
                            onChange={(e) => handleInputChange("manufacturer", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="agent" className="text-sm font-medium text-gray-700">
                          Agent
                        </Label>
                        <select
                          id="agent"
                          value={formData.agent}
                          onChange={(e) => handleInputChange("agent", e.target.value)}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">--Select--</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="subAgent" className="text-sm font-medium text-gray-700">
                          Sub Agent
                        </Label>
                        <select
                          id="subAgent"
                          value={formData.subAgent}
                          onChange={(e) => handleInputChange("subAgent", e.target.value)}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">--Select--</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Consignee/Buyer Section */}
                  <div className="space-y-4 border-t border-gray-200 pt-6">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="notifySame"
                        checked={formData.notifySame}
                        onChange={(e) => handleInputChange("notifySame", e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <Label htmlFor="notifySame" className="text-sm font-medium text-gray-700 cursor-pointer">
                        Notify whether consignee & buyer are the same
                      </Label>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Select Type</Label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="consigneeBuyer"
                            value="Consignee"
                            checked={formData.consigneeBuyer === "Consignee"}
                            onChange={(e) => handleInputChange("consigneeBuyer", e.target.value)}
                            className="w-4 h-4 text-blue-600"
                          />
                          <span className="text-sm text-gray-700">Consignee</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="consigneeBuyer"
                            value="Buyer Name"
                            checked={formData.consigneeBuyer === "Buyer Name"}
                            onChange={(e) => handleInputChange("consigneeBuyer", e.target.value)}
                            className="w-4 h-4 text-blue-600"
                          />
                          <span className="text-sm text-gray-700">Buyer Name</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {formData.consigneeBuyer === "Consignee" && (
                        <div>
                          <Label htmlFor="consignee" className="text-sm font-medium text-gray-700">
                            Consignee*
                          </Label>
                          <select
                            id="consignee"
                            value={formData.consignee}
                            onChange={(e) => handleInputChange("consignee", e.target.value)}
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          >
                            <option value="">--Select--</option>
                          </select>
                        </div>
                      )}

                      {formData.consigneeBuyer === "Buyer Name" && (
                        <div>
                          <Label htmlFor="buyerName" className="text-sm font-medium text-gray-700">
                            Buyer Name*
                          </Label>
                          <Input
                            id="buyerName"
                            value={formData.buyerName}
                            onChange={(e) => handleInputChange("buyerName", e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                      )}

                      <div>
                        <Label htmlFor="consignedToBank" className="text-sm font-medium text-gray-700">
                          If consigned to bank*
                        </Label>
                        <select
                          id="consignedToBank"
                          value={formData.consignedToBank}
                          onChange={(e) => handleInputChange("consignedToBank", e.target.value)}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="">--Select--</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Mode of Shipment Section - Highlighted */}
                  <div className="space-y-4 border-t border-gray-200 pt-6 bg-green-50 p-4 rounded-lg border-green-200">
                    <Label className="text-sm font-semibold text-gray-900 mb-2 block">Mode of Shipment</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="modeOfShipment"
                          value="Factory Stuffing"
                          checked={formData.modeOfShipment === "Factory Stuffing"}
                          onChange={(e) => handleInputChange("modeOfShipment", e.target.value)}
                          className="w-4 h-4 text-green-600"
                        />
                        <span className="text-sm text-gray-700">Factory Stuffing</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="modeOfShipment"
                          value="Docks/Godown Stuffing"
                          checked={formData.modeOfShipment === "Docks/Godown Stuffing"}
                          onChange={(e) => handleInputChange("modeOfShipment", e.target.value)}
                          className="w-4 h-4 text-green-600"
                        />
                        <span className="text-sm text-gray-700">Docks/Godown Stuffing</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="modeOfShipment"
                          value="Air Shipment"
                          checked={formData.modeOfShipment === "Air Shipment"}
                          onChange={(e) => handleInputChange("modeOfShipment", e.target.value)}
                          className="w-4 h-4 text-green-600"
                        />
                        <span className="text-sm text-gray-700">Air Shipment</span>
                      </label>
                    </div>
                  </div>

                  {/* Vessel Name */}
                  <div>
                    <Label htmlFor="vesselName" className="text-sm font-medium text-gray-700">
                      Vessel Name*
                    </Label>
                    <select
                      id="vesselName"
                      value={formData.vesselName}
                      onChange={(e) => handleInputChange("vesselName", e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">--Select--</option>
                    </select>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-4 pt-4 border-t border-gray-200">
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Submit
                    </Button>
                    <Button
                      type="button"
                      onClick={handleReset}
                      variant="outline"
                      className="border-red-300 text-red-700 hover:bg-red-50 px-6"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Reset
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}

