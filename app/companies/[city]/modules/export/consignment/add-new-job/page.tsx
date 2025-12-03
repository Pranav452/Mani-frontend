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

export default function AddNewJobPage() {
  const router = useRouter();
  const params = useParams();
  const city = params?.city ? decodeURIComponent(params.city as string) : "";
  const [consignmentExpanded, setConsignmentExpanded] = useState(true);
  const [consignmentNestedExpanded, setConsignmentNestedExpanded] = useState(true);
  const [selectedSubMenu, setSelectedSubMenu] = useState("Add New Job");

  const [formData, setFormData] = useState({
    jobNo: "EXP-2024-001234",
    mode: "Docks/Godown Stuffing",
    subMode: "FCL",
    shipper: "AQUAPHARM CHEMICAL LIMITED",
    billTo: "ABC Trading Company",
    consignee: "Tech Solutions International",
    buyer: "Global Trading Corporation",
    agent: "ABC Shipping Agents Pvt. Ltd.",
    subAgent: "Sub Agent Alpha",
    serviceType: "Door to Door",
    vessel: "WAN HAI 377",
    noOfPkgs: "150",
    typeOfPkgs: "PKG",
    noOfPcs: "300",
    typeOfPcs: "PIECES",
    grossWt: "1250.50",
    netWt: "1180.25",
    volume: "45.75",
    chblWt: "1300.00",
    invNo: "INV-2024-5678",
    invDt: "2024-12-01",
    docRecdDt: "2024-12-02",
    actualDocRecd: "No",
    incoterm: "FREE",
    freight: "Prepaid",
    typeOfShippingBill: "DEEC",
    pol: "Mumbai",
    pod: "New York",
  });

  const handleNavigation = (menuName: string) => {
    if (menuName === "Export Master") {
      router.push(`/companies/${encodeURIComponent(city)}/modules/export/consignment`);
    } else if (menuName === "Search") {
      router.push(`/companies/${encodeURIComponent(city)}/modules/export/consignment/search`);
    } else if (menuName === "Add New Job") {
      setSelectedSubMenu("Add New Job");
    } else {
      setSelectedSubMenu(menuName);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateJob = () => {
    console.log("Creating job:", formData);
  };

  const handleResetJob = () => {
    setFormData({
      jobNo: "EXP-2024-001234",
      mode: "Docks/Godown Stuffing",
      subMode: "FCL",
      shipper: "AQUAPHARM CHEMICAL LIMITED",
      billTo: "ABC Trading Company",
      consignee: "Tech Solutions International",
      buyer: "Global Trading Corporation",
      agent: "ABC Shipping Agents Pvt. Ltd.",
      subAgent: "Sub Agent Alpha",
      serviceType: "Door to Door",
      vessel: "WAN HAI 377",
      noOfPkgs: "150",
      typeOfPkgs: "PKG",
      noOfPcs: "300",
      typeOfPcs: "PIECES",
      grossWt: "1250.50",
      netWt: "1180.25",
      volume: "45.75",
      chblWt: "1300.00",
      invNo: "INV-2024-5678",
      invDt: "2024-12-01",
      docRecdDt: "2024-12-02",
      actualDocRecd: "No",
      incoterm: "FREE",
      freight: "Prepaid",
      typeOfShippingBill: "DEEC",
      pol: "Mumbai",
      pod: "New York",
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
            <div className="flex-1 overflow-y-auto overflow-x-auto p-6 min-h-0">
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
                  <span className="text-gray-900 font-semibold">Job Creation</span>
                </nav>
              </div>

              {/* Warning Message */}
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>New feature...</strong> Please select [Differed Air] , Air [Normal Air] or SEA- AIR for AIR SHIPMENT !!!
                </p>
              </div>

              {/* Job Creation Form */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-6 space-y-6">
                  {/* Row 1: Basic Job Information */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-200 pb-2">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Job No</Label>
                        <Input
                          type="text"
                          value={formData.jobNo}
                          onChange={(e) => handleInputChange("jobNo", e.target.value)}
                          className="h-9 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Mode</Label>
                        <div className="relative">
                          <select
                            value={formData.mode}
                            onChange={(e) => handleInputChange("mode", e.target.value)}
                            className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option>Docks/Godown Stuffing</option>
                            <option>Factory Stuffing</option>
                            <option>Air Shipment</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => handleInputChange("mode", "")}
                            className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Sub Mode</Label>
                        <select
                          value={formData.subMode}
                          onChange={(e) => handleInputChange("subMode", e.target.value)}
                          className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>--Select--</option>
                          <option>FCL</option>
                          <option>LCL</option>
                          <option>Break Bulk</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Service Type</Label>
                        <select
                          value={formData.serviceType}
                          onChange={(e) => handleInputChange("serviceType", e.target.value)}
                          className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>--Select--</option>
                          <option>Door to Door</option>
                          <option>Port to Port</option>
                          <option>Door to Port</option>
                          <option>Port to Door</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Party Information */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-200 pb-2">Party Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Shipper</Label>
                        <select
                          value={formData.shipper}
                          onChange={(e) => handleInputChange("shipper", e.target.value)}
                          className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>--Select--</option>
                          <option>AQUAPHARM CHEMICAL LIMITED</option>
                          <option>Pharma Export Solutions</option>
                          <option>Chemical Industries Ltd.</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Bill To</Label>
                        <select
                          value={formData.billTo}
                          onChange={(e) => handleInputChange("billTo", e.target.value)}
                          className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>--Select--</option>
                          <option>ABC Trading Company</option>
                          <option>XYZ Importers Ltd.</option>
                          <option>International Buyers Inc.</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Consignee</Label>
                        <select
                          value={formData.consignee}
                          onChange={(e) => handleInputChange("consignee", e.target.value)}
                          className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>--Select--</option>
                          <option>Tech Solutions International</option>
                          <option>Global Trading Corporation</option>
                          <option>Merchant Exporters Ltd.</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Buyer</Label>
                        <select
                          value={formData.buyer}
                          onChange={(e) => handleInputChange("buyer", e.target.value)}
                          className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>--Select--</option>
                          <option>Global Trading Corporation</option>
                          <option>International Commerce Inc.</option>
                          <option>Trade Partners Worldwide</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Agent</Label>
                        <select
                          value={formData.agent}
                          onChange={(e) => handleInputChange("agent", e.target.value)}
                          className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>--Select--</option>
                          <option>ABC Shipping Agents Pvt. Ltd.</option>
                          <option>Global Logistics Solutions</option>
                          <option>Maritime Forwarding Co.</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Sub Agent</Label>
                        <select
                          value={formData.subAgent}
                          onChange={(e) => handleInputChange("subAgent", e.target.value)}
                          className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>--Select--</option>
                          <option>Sub Agent Alpha</option>
                          <option>Sub Agent Beta</option>
                          <option>Sub Agent Gamma</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Shipping Information */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-200 pb-2">Shipping Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Vessel</Label>
                        <select
                          value={formData.vessel}
                          onChange={(e) => handleInputChange("vessel", e.target.value)}
                          className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>--Select--</option>
                          <option>WAN HAI 377</option>
                          <option>MSC TAVVISHI</option>
                          <option>GEORGE WASHINGTON BRIDGE</option>
                          <option>SM MANAL</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Pol</Label>
                        <select
                          value={formData.pol}
                          onChange={(e) => handleInputChange("pol", e.target.value)}
                          className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>--Select--</option>
                          <option>Mumbai</option>
                          <option>Chennai</option>
                          <option>Kolkata</option>
                          <option>Nhava Sheva</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Pod</Label>
                        <select
                          value={formData.pod}
                          onChange={(e) => handleInputChange("pod", e.target.value)}
                          className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>--Select--</option>
                          <option>New York</option>
                          <option>Los Angeles</option>
                          <option>Chicago</option>
                          <option>Houston</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Freight</Label>
                        <select
                          value={formData.freight}
                          onChange={(e) => handleInputChange("freight", e.target.value)}
                          className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>--Select--</option>
                          <option>Prepaid</option>
                          <option>Collect</option>
                          <option>Third Party</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Package & Weight Information */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-200 pb-2">Package & Weight Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">No of pkgs</Label>
                        <Input
                          type="text"
                          value={formData.noOfPkgs}
                          onChange={(e) => handleInputChange("noOfPkgs", e.target.value)}
                          className="h-9 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Type of pkgs</Label>
                        <select
                          value={formData.typeOfPkgs}
                          onChange={(e) => handleInputChange("typeOfPkgs", e.target.value)}
                          className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>PKG</option>
                          <option>BOX</option>
                          <option>CARTON</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">No of pcs</Label>
                        <Input
                          type="text"
                          value={formData.noOfPcs}
                          onChange={(e) => handleInputChange("noOfPcs", e.target.value)}
                          className="h-9 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Type of pcs</Label>
                        <select
                          value={formData.typeOfPcs}
                          onChange={(e) => handleInputChange("typeOfPcs", e.target.value)}
                          className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>PIECES</option>
                          <option>UNITS</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Gross wt</Label>
                        <Input
                          type="text"
                          value={formData.grossWt}
                          onChange={(e) => handleInputChange("grossWt", e.target.value)}
                          className="h-9 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Net wt</Label>
                        <Input
                          type="text"
                          value={formData.netWt}
                          onChange={(e) => handleInputChange("netWt", e.target.value)}
                          className="h-9 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Volume</Label>
                        <Input
                          type="text"
                          value={formData.volume}
                          onChange={(e) => handleInputChange("volume", e.target.value)}
                          className="h-9 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Chbl wt</Label>
                        <Input
                          type="text"
                          value={formData.chblWt}
                          onChange={(e) => handleInputChange("chblWt", e.target.value)}
                          className="h-9 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 5: Document & Terms Information */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-200 pb-2">Document & Terms Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Inv No</Label>
                        <Input
                          type="text"
                          value={formData.invNo}
                          onChange={(e) => handleInputChange("invNo", e.target.value)}
                          className="h-9 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Inv Dt</Label>
                        <div className="relative">
                          <Input
                            type="date"
                            value={formData.invDt}
                            onChange={(e) => handleInputChange("invDt", e.target.value)}
                            className="h-9 text-sm"
                          />
                          <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Doc Recd Dt</Label>
                        <div className="relative">
                          <Input
                            type="date"
                            value={formData.docRecdDt}
                            onChange={(e) => handleInputChange("docRecdDt", e.target.value)}
                            className="h-9 text-sm"
                          />
                          <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Actual Doc Recd</Label>
                        <div className="relative">
                          <select
                            value={formData.actualDocRecd}
                            onChange={(e) => handleInputChange("actualDocRecd", e.target.value)}
                            className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option>No</option>
                            <option>Yes</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => handleInputChange("actualDocRecd", "")}
                            className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Incoterm</Label>
                        <div className="relative">
                          <select
                            value={formData.incoterm}
                            onChange={(e) => handleInputChange("incoterm", e.target.value)}
                            className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option>FREE</option>
                            <option>FOB</option>
                            <option>CIF</option>
                            <option>EXW</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => handleInputChange("incoterm", "")}
                            className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-700 mb-1 block">Type of Shipping Bill</Label>
                        <select
                          value={formData.typeOfShippingBill}
                          onChange={(e) => handleInputChange("typeOfShippingBill", e.target.value)}
                          className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>--Select--</option>
                          <option>DEEC</option>
                          <option>DEPB</option>
                          <option>Duty Drawback</option>
                          <option>Advance License</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Order
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Pkgs Dtls
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Mark No
                  </Button>
                  <Button
                    type="button"
                    onClick={handleCreateJob}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Create Job
                  </Button>
                  <Button
                    type="button"
                    onClick={handleResetJob}
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-50 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reset Job
                  </Button>
                </div>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}

