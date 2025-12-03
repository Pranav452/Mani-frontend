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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const eDocModules = [
  { 
    name: "Finance", 
    icon: "calculator", 
    description: "Manage financial documents, invoices, and accounting records",
    color: "blue"
  },
  { 
    name: "Import", 
    icon: "box", 
    description: "Handle import documentation and customs clearance",
    color: "green"
  },
  { 
    name: "Export", 
    icon: "arrows", 
    description: "Process export documents and shipping paperwork",
    color: "purple"
  },
  { 
    name: "Master", 
    icon: "users", 
    description: "Master data management and user administration",
    color: "indigo"
  },
];

const getIcon = (iconType: string) => {
  const icons: Record<string, React.ReactElement> = {
    calculator: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    box: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    arrows: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    users: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  };
  return icons[iconType] || icons.calculator;
};

const getColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; hoverBg: string; text: string; border: string }> = {
    blue: {
      bg: "bg-blue-50",
      hoverBg: "hover:bg-blue-100",
      text: "text-blue-600",
      border: "border-blue-200 hover:border-blue-400"
    },
    green: {
      bg: "bg-green-50",
      hoverBg: "hover:bg-green-100",
      text: "text-green-600",
      border: "border-green-200 hover:border-green-400"
    },
    purple: {
      bg: "bg-purple-50",
      hoverBg: "hover:bg-purple-100",
      text: "text-purple-600",
      border: "border-purple-200 hover:border-purple-400"
    },
    indigo: {
      bg: "bg-indigo-50",
      hoverBg: "hover:bg-indigo-100",
      text: "text-indigo-600",
      border: "border-indigo-200 hover:border-indigo-400"
    },
  };
  return colors[color] || colors.blue;
};

const stats = [
  { label: "Total Documents", value: "12,458", change: "+12%", trend: "up" },
  { label: "Pending Review", value: "234", change: "-5%", trend: "down" },
  { label: "Processed Today", value: "89", change: "+23%", trend: "up" },
  { label: "Active Users", value: "156", change: "+8%", trend: "up" },
];

const getSidebarIcon = (iconType: string) => {
  const icons: Record<string, React.ReactElement> = {
    calculator: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    box: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    arrows: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    users: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    home: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  };
  return icons[iconType] || icons.calculator;
};

export default function EDocPage() {
  const router = useRouter();
  const params = useParams();
  const city = params?.city ? decodeURIComponent(params.city as string) : "";
  const [selectedModule, setSelectedModule] = useState("");
  const [isJobNumberModalOpen, setIsJobNumberModalOpen] = useState(false);
  const [jobNumber, setJobNumber] = useState("");

  const handleModuleClick = (moduleName: string) => {
    if (moduleName === "Export") {
      setIsJobNumberModalOpen(true);
    } else {
      console.log(`Navigating to ${moduleName} module`);
    }
  };

  const handleJobNumberSubmit = () => {
    if (jobNumber.trim()) {
      router.push(`/companies/${encodeURIComponent(city)}/modules/e-doc/export?jobNumber=${encodeURIComponent(jobNumber.trim())}`);
      setIsJobNumberModalOpen(false);
      setJobNumber("");
    }
  };

  const sidebarMenus = [
    { name: "Home", icon: "home", path: `/companies/${encodeURIComponent(city)}/modules` },
    ...eDocModules.map(module => ({
      name: module.name,
      icon: module.icon,
      path: null,
    })),
  ];


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
              E-Document Management
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
            <SidebarHeader className="border-b border-gray-200">
              <div className="px-4 py-3">
                <h3 className="text-sm font-semibold text-gray-900">E-Doc Modules</h3>
              </div>
            </SidebarHeader>
            <SidebarContent className="overflow-y-auto flex-1">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {sidebarMenus.map((menu) => (
                      <SidebarMenuItem key={menu.name}>
                        <SidebarMenuButton
                          onClick={() => {
                            if (menu.path) {
                              router.push(menu.path);
                            } else {
                              setSelectedModule(menu.name);
                              handleModuleClick(menu.name);
                            }
                          }}
                          isActive={selectedModule === menu.name}
                          className="w-full justify-start cursor-pointer"
                          type="button"
                        >
                          <div className="text-gray-600">
                            {getSidebarIcon(menu.icon)}
                          </div>
                          <span className="text-sm">{menu.name}</span>
                        </SidebarMenuButton>
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
            <main className="flex-1 overflow-y-auto p-6 sm:p-8 max-w-7xl mx-auto w-full">
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
            <span className="text-gray-900 font-semibold">E-Doc</span>
          </nav>
        </div>
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome back
          </h2>
          <p className="text-gray-600">
            Manage and track your electronic documents efficiently
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <div className={`flex items-center gap-1 text-xs font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.trend === "up" ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Modules Grid */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Document Modules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {eDocModules.map((module) => {
              const colors = getColorClasses(module.color);
              return (
                <button
                  key={module.name}
                  onClick={() => handleModuleClick(module.name)}
                  className={`bg-white rounded-xl border-2 ${colors.border} p-6 text-left ${colors.hoverBg} transition-all duration-200 hover:shadow-lg group`}
                >
                  <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center ${colors.text} mb-4 group-hover:scale-110 transition-transform`}>
                    {getIcon(module.icon)}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-900">
                    {module.name}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {module.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-700">
                    <span>Open module</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Upload New Document</p>
                  <p className="text-sm text-gray-500">Add a new file to the system</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Generate Report</p>
                  <p className="text-sm text-gray-500">Create document activity report</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Search Documents</p>
                  <p className="text-sm text-gray-500">Find documents quickly</p>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Invoice #INV-2024-001 processed</p>
                  <p className="text-xs text-gray-500 mt-1">Finance module • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Export document approved</p>
                  <p className="text-xs text-gray-500 mt-1">Export module • 5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New import shipment registered</p>
                  <p className="text-xs text-gray-500 mt-1">Import module • 1 day ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Master data updated</p>
                  <p className="text-xs text-gray-500 mt-1">Master module • 2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>

      {/* Job Number Modal */}
      <Dialog open={isJobNumberModalOpen} onOpenChange={setIsJobNumberModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Enter Job Number
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Please enter the job number to proceed to Export Documents
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="jobNumber" className="text-sm font-medium text-gray-700">
                Job Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="jobNumber"
                type="text"
                value={jobNumber}
                onChange={(e) => setJobNumber(e.target.value)}
                placeholder="Enter job number"
                className="w-full"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && jobNumber.trim()) {
                    handleJobNumberSubmit();
                  }
                }}
                autoFocus
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsJobNumberModalOpen(false);
                setJobNumber("");
              }}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleJobNumberSubmit}
              disabled={!jobNumber.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
 