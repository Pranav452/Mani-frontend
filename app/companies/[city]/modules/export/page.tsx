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
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

const subMenuItems = [
  { name: "Vessel Details", icon: "ship" },
  { name: "Profile", icon: "user" },
  { name: "Messages", icon: "message" },
  { name: "Settings", icon: "settings" },
];

const vessels = [
  {
    id: "wan-hai-377",
    name: "WAN HAI 377",
    code: "E014",
    etd: "21/10/2025",
    port: "NH1",
    sailingDt: "",
    details: [
      {
        exptno: "011012510002032",
        shipper: "AQUAPHARM CHEMICAL LIMITED",
        invoice: "1020020382 17/10/2025",
        bl: "6278485",
        shipBlDt: "17/10/2025",
        custClr: "17/10/2025",
        contNo: "NLLU2029405",
        remark: "SAILING DT. CANNOT UPDATE , AS PENDING : BL ,",
      },
      {
        exptno: "011012510002033",
        shipper: "AQUAPHARM CHEMICAL LIMITED",
        invoice: "1020020381 17/10/2025",
        bl: "6278485",
        shipBlDt: "17/10/2025",
        custClr: "17/10/2025",
        contNo: "BWLU2101829",
        remark: "SAILING DT. CANNOT UPDATE , AS PENDING : BL ,",
      },
    ],
  },
  {
    id: "msc-tavvishi",
    name: "MSC TAVVISHI",
    code: "R1896",
    etd: "22/10/2025",
    port: "NH1",
    sailingDt: "",
  },
  {
    id: "george-washington-bridge",
    name: "GEORGE WASHINGTON BRIDGE",
    code: "0042E",
    etd: "23/10/2025",
    port: "NH1",
    sailingDt: "",
  },
  {
    id: "sm-manal",
    name: "SM MANAL",
    code: "0060NSA",
    etd: "25/10/2025",
    port: "NH1",
    sailingDt: "",
  },
  {
    id: "msc-ingrid",
    name: "MSC INGRID",
    code: "R1961",
    etd: "29/10/2025",
    port: "NH1",
    sailingDt: "",
  },
  {
    id: "loa-peace",
    name: "LOA PEACE",
    code: "R1847",
    etd: "29/10/2025",
    port: "NH1",
    sailingDt: "",
  },
  {
    id: "cma-cgm-global",
    name: "CMA CGM GLOBAL",
    code: "001",
    etd: "29/10/2025",
    port: "NH1",
    sailingDt: "",
  },
  {
    id: "msc-gabon",
    name: "MSC GABON",
    code: "R1995",
    etd: "30/10/2025",
    port: "NH1",
    sailingDt: "",
  },
  {
    id: "oocl-taipei",
    name: "OOCL TAIPEI",
    code: "V-87E",
    etd: "31/10/2025",
    port: "NH1",
    sailingDt: "",
  },
  {
    id: "mpc-32",
    name: "MPC",
    code: "32",
    etd: "03/11/2025",
    port: "NH1",
    sailingDt: "",
  },
  {
    id: "jolly-oro",
    name: "JOLLY ORO",
    code: "477",
    etd: "03/11/2025",
    port: "NH1",
    sailingDt: "",
  },
  {
    id: "clementine-maersk",
    name: "CLEMENTINE MAERSK",
    code: "R1932",
    etd: "05/11/2025",
    port: "NH1",
    sailingDt: "",
  },
  {
    id: "wan-hai-351",
    name: "WAN HAI 351 / E037",
    code: "E037",
    etd: "06/11/2025",
    port: "NH1",
    sailingDt: "",
  },
  {
    id: "x-press-cassiopeia",
    name: "X-PRESS CASSIOPEIA / 25044W",
    code: "25044W",
    etd: "07/11/2025",
    port: "NH1",
    sailingDt: "",
  },
  {
    id: "mpcl-002",
    name: "MPCL",
    code: "002",
    etd: "10/11/2025",
    port: "NH1",
    sailingDt: "",
  },
  {
    id: "viven-oti104",
    name: "VIVIEN OTI104",
    code: "OTI104",
    etd: "11/11/2025",
    port: "NH1",
    sailingDt: "",
  },
  {
    id: "al-rawanda",
    name: "AL RAWANDA",
    code: "R2038",
    etd: "11/11/2025",
    port: "NH1",
    sailingDt: "",
  },
  {
    id: "one-marvel",
    name: "ONE MARVEL",
    code: "R2082",
    etd: "12/11/2025",
    port: "NH1",
    sailingDt: "",
  },
  {
    id: "maersk-kensington",
    name: "MAERSK KENSINGTON",
    code: "R1952",
    etd: "13/11/2025",
    port: "NH1",
    sailingDt: "",
  },
  {
    id: "one-recognition",
    name: "ONE RECOGNITION",
    code: "R2122",
    etd: "19/11/2025",
    port: "NH1",
    sailingDt: "",
  },
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
    user: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    message: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    settings: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  };
  return icons[iconType] || icons.file;
};

export default function ExportModulePage() {
  const router = useRouter();
  const params = useParams();
  const city = params?.city ? decodeURIComponent(params.city as string) : "";
  const [selectedMenu, setSelectedMenu] = useState("Consignment");
  const [selectedSubMenu, setSelectedSubMenu] = useState("Vessel Details");
  const [selectedVessel, setSelectedVessel] = useState<string | null>(null);
  const [rightNavOpen, setRightNavOpen] = useState(true);
  const [consignmentExpanded, setConsignmentExpanded] = useState(true);
  const [consignmentNestedExpanded, setConsignmentNestedExpanded] = useState(true);
  
  const handleNavigation = (menuName: string) => {
    if (menuName === "Export Master") {
      router.push(`/companies/${encodeURIComponent(city)}/modules/export/consignment`);
    } else if (menuName === "Search") {
      router.push(`/companies/${encodeURIComponent(city)}/modules/export/consignment/search`);
    } else if (menuName === "Add New Job") {
      router.push(`/companies/${encodeURIComponent(city)}/modules/export/consignment/add-new-job`);
    } else {
      setSelectedMenu(menuName);
    }
  };

  const companyName = "Manilal Patel Clearing Forwarding Pvt. Ltd.";

  const selectedVesselData = vessels.find((v) => v.id === selectedVessel);

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
                                                  selectedMenu === nestedMenu.name
                                                    ? "bg-blue-50 text-blue-700"
                                                    : "text-gray-700 hover:bg-gray-50"
                                                }`}
                                              >
                                                <div className={selectedMenu === nestedMenu.name ? "text-blue-600" : "text-gray-500"}>
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
                                          selectedMenu === subMenu.name
                                            ? "bg-blue-50 text-blue-700"
                                            : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                      >
                                        <div className={selectedMenu === subMenu.name ? "text-blue-600" : "text-gray-500"}>
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
                            onClick={() => handleNavigation(menu.name)}
                            isActive={selectedMenu === menu.name}
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
          <SidebarInset className="flex flex-col overflow-hidden bg-gray-50 relative">
            <div className={`flex-1 overflow-y-auto overflow-x-hidden p-6 min-h-0 transition-all duration-300 ${
              rightNavOpen ? "pr-72" : "pr-6"
            }`}>
              {/* Breadcrumbs */}
              <div className="mb-6 flex items-center justify-between">
                <nav className="flex items-center gap-2 text-sm text-gray-600">
                  <span 
                    className="hover:text-gray-900 cursor-pointer" 
                    onClick={() => router.push(`/companies/${encodeURIComponent(city)}/modules`)}
                  >
                    Modules
                  </span>
                  <span>/</span>
                  <span className="text-gray-900 font-semibold">Export</span>
                </nav>
                {!rightNavOpen && (
                  <button
                    onClick={() => setRightNavOpen(true)}
                    className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                    title="Expand Navigation"
                  >
                    <svg 
                      className="w-5 h-5 text-gray-500"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Main Content Area */}
              <div className="flex flex-col min-w-0 w-full">
                {selectedSubMenu === "Vessel Details" ? (
                  <>
                    {selectedVessel ? (
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col h-full flex-1 min-h-0">
                          {/* Vessel Header with Back Button */}
                          <div className="bg-red-50 border-b border-red-200 px-6 py-4 flex-shrink-0">
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-4 flex-1 min-w-0">
                                <button
                                  onClick={() => setSelectedVessel(null)}
                                  className="flex-shrink-0 p-2 hover:bg-red-100 rounded-lg transition-colors"
                                  title="Back to Vessel List"
                                >
                                  <svg className="w-5 h-5 text-red-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                  </svg>
                                </button>
                                <h2 className="text-lg font-semibold text-red-900 truncate">
                                  VSL NAME: {selectedVesselData?.name} ({selectedVesselData?.code}) & ETD: {selectedVesselData?.etd} & PORT: {selectedVesselData?.port} & SAILING DT: {selectedVesselData?.sailingDt || ""}
                                </h2>
                              </div>
                              {/* Status Badge */}
                              <div className="flex-shrink-0">
                                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                                  Active
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Scrollable Vessel Details Table Container */}
                          {selectedVesselData?.details && selectedVesselData.details.length > 0 ? (
                            <div className="flex-1 overflow-auto p-6 min-h-0">
                              <div className="overflow-x-auto">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead className="whitespace-nowrap">EXPTNO</TableHead>
                                      <TableHead className="whitespace-nowrap">SHIPPER</TableHead>
                                      <TableHead className="whitespace-nowrap">INVOICE</TableHead>
                                      <TableHead className="whitespace-nowrap">BL</TableHead>
                                      <TableHead className="whitespace-nowrap">SHIP. BL/DT</TableHead>
                                      <TableHead className="whitespace-nowrap">CUST. CLR.</TableHead>
                                      <TableHead className="whitespace-nowrap">CONT. NO</TableHead>
                                      <TableHead className="whitespace-nowrap">REMARK</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {selectedVesselData.details.map((detail, idx) => (
                                      <TableRow key={idx}>
                                        <TableCell className="font-medium whitespace-nowrap">{detail.exptno}</TableCell>
                                        <TableCell className="whitespace-nowrap">{detail.shipper}</TableCell>
                                        <TableCell className="whitespace-nowrap">{detail.invoice}</TableCell>
                                        <TableCell className="whitespace-nowrap">{detail.bl}</TableCell>
                                        <TableCell className="whitespace-nowrap">{detail.shipBlDt}</TableCell>
                                        <TableCell className="whitespace-nowrap">{detail.custClr}</TableCell>
                                        <TableCell className="whitespace-nowrap">{detail.contNo}</TableCell>
                                        <TableCell className="max-w-xs">{detail.remark}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                              
                              {/* Journey Progress for Each Detail */}
                              <div className="mt-8 space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900">Journey Details</h3>
                                {selectedVesselData.details.map((detail, idx) => (
                                  <div key={idx} className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                                    <div className="mb-4">
                                      <h4 className="text-md font-semibold text-gray-900 mb-2">
                                        EXPTNO: {detail.exptno}
                                      </h4>
                                      <p className="text-sm text-gray-600">Shipper: {detail.shipper}</p>
                                    </div>
                                    
                                    {/* Journey Progress Timeline */}
                                    <div className="relative">
                                      <div className="flex items-start justify-between">
                                        {[
                                          { name: "Booking", status: "completed", date: detail.custClr },
                                          { name: "Loading", status: "completed", date: detail.shipBlDt },
                                          { name: "Departure", status: "in-progress", date: selectedVesselData.etd },
                                          { name: "Arrival", status: "pending", date: "" },
                                          { name: "Delivery", status: "pending", date: "" },
                                        ].map((stage, stageIdx, stages) => (
                                          <div key={stage.name} className="flex-1 flex flex-col items-center relative">
                                            {/* Progress Line */}
                                            {stageIdx < stages.length - 1 && (
                                              <div
                                                className={`absolute top-5 left-[50%] h-0.5 ${
                                                  stage.status === "completed" && stages[stageIdx + 1].status === "completed"
                                                    ? "bg-green-500"
                                                    : stage.status === "completed"
                                                    ? "bg-green-500"
                                                    : "bg-gray-300"
                                                }`}
                                                style={{ width: 'calc(100% - 40px)', marginLeft: '20px' }}
                                              />
                                            )}
                                            {/* Stage Icon */}
                                            <div className="relative z-10 mb-3">
                                              <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                                  stage.status === "completed"
                                                    ? "bg-green-500 text-white"
                                                    : stage.status === "in-progress"
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-gray-200 text-gray-400"
                                                }`}
                                              >
                                                {stage.status === "completed" ? (
                                                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                  </svg>
                                                ) : stage.status === "in-progress" ? (
                                                  <div className="w-4 h-4 rounded-full bg-white animate-pulse" />
                                                ) : (
                                                  <div className="w-4 h-4 rounded-full bg-current" />
                                                )}
                                              </div>
                                            </div>
                                            <div className="text-center">
                                              <p className={`text-xs font-semibold ${
                                                stage.status === "completed"
                                                  ? "text-green-600"
                                                  : stage.status === "in-progress"
                                                  ? "text-blue-600"
                                                  : "text-gray-500"
                                              }`}>
                                                {stage.name}
                                              </p>
                                              {stage.date && (
                                                <p className="text-xs text-gray-500 mt-1">{stage.date}</p>
                                              )}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="p-6">
                              <p className="text-gray-600">No details available for this vessel.</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col h-full min-h-0">
                          <div className="flex-shrink-0 mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Vessel Details</h2>
                          </div>
                          <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
                            {vessels.map((vessel) => (
                              <div
                                key={vessel.id}
                                onClick={() => setSelectedVessel(vessel.id)}
                                className="bg-red-50 border border-red-200 rounded-lg px-6 py-4 cursor-pointer hover:bg-red-100 transition-colors"
                              >
                                <p className="text-red-900 font-medium">
                                  VSL NAME: {vessel.name} ({vessel.code}) & ETD: {vessel.etd} & PORT: {vessel.port} & SAILING DT: {vessel.sailingDt || ""}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </>
                ) : (
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {selectedSubMenu}
                    </h3>
                    <p className="text-gray-600">
                      Content for {selectedSubMenu} will be displayed here.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar - Navigation (Fixed Position) */}
            <div
              className={`absolute right-0 top-0 bottom-0 bg-white border-l border-gray-200 flex flex-col transition-all duration-300 ease-in-out shadow-lg z-10 ${
                rightNavOpen ? "w-64 translate-x-0 opacity-100" : "w-64 translate-x-full opacity-0 pointer-events-none"
              }`}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 flex-shrink-0">
                <h3 className="text-sm font-semibold text-gray-900">Navigation</h3>
                <button
                  onClick={() => setRightNavOpen(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Close Navigation"
                >
                  <svg 
                    className="w-5 h-5 text-gray-500"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <nav className="space-y-1">
                  {subMenuItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => setSelectedSubMenu(item.name)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        selectedSubMenu === item.name
                          ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className={selectedSubMenu === item.name ? "text-blue-600" : "text-gray-500"}>
                        {getIcon(item.icon)}
                      </div>
                      <span>{item.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>

    </div>
  );
}

