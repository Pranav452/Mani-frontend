"use client";

import Image from "next/image";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
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
import { Button } from "@/components/ui/button";
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
import { FolderIcon } from "lucide-react";

const documentTitles = [
  "ALL",
  "AIR CARGO MAINFEST",
  "ANNEX -1",
  "ARE-1",
  "B/L (Where there is no HBL)",
  "B/L INSTRUCTIONS",
  "BILL - MP",
  "BOOKING COPY AND DO",
  "CARGO RECEIPT",
  "CARTING_CFS RECEIPTS",
  "CERTIFICATE OF ORIGIN",
  "CHECK LIST - CUSTOMS",
  "CLP",
  "CMC Recipts",
  "Consignee Docs",
  "CONSIGNEE INVOICE",
  "CONSIGNEE PACKING LIST",
  "CORRESPONDENCE (Email,Letters,ETC)",
  "COVER SHEET - MP",
  "COVERING LETTER",
  "CRANE BILL",
  "DECLARATION",
  "DEEC DECLARATION",
  "DELIVERY NOTE",
  "DOCKET (to be Scanned on Completion of Job)",
  "EXCHANGE CONTROL COPY OF SHIPPING BILL",
  "FUMIGATION CERTIFICATE",
  "GSP FORM A",
  "HAWB",
  "HBL - FCR / MTO",
  "INVOICE",
  "LABOUR BILL",
  "LORRY RECPT",
  "MAWB",
  "MBL - SEA",
  "MEASUREMENT CERTIFICATE",
  "OTHER RECEIPTS",
  "PACKING DECLARATION",
  "PACKING LIST",
  "PREALERT",
  "Sanoj Test",
  "SDF FORM",
  "SHIPPING INSTRUCTIONS",
];

// Mock data - in real app, this would come from an API
const mockDocuments = [
  {
    id: 1,
    documentTitle: "INVOICE",
    fileName: "011032520000952 EXP INV 00001.pdf",
    actualFileName: "BUTTERBLU INV# 250167 BUYER.pdf",
    remarks: "",
    uploadedBy: "MRS. ANGEL JABAKUMAR",
    uploadedOn: "Dec 1 2025 1:25PM",
  },
  {
    id: 2,
    documentTitle: "PACKING LIST",
    fileName: "011032520000952 EXP PL 00001.pdf",
    actualFileName: "PACKING_LIST_250167.pdf",
    remarks: "Verified",
    uploadedBy: "MRS. ANGEL JABAKUMAR",
    uploadedOn: "Dec 1 2025 2:15PM",
  },
  {
    id: 3,
    documentTitle: "SHIPPING INSTRUCTIONS",
    fileName: "011032520000952 EXP SI 00001.pdf",
    actualFileName: "SHIPPING_INSTRUCTIONS.pdf",
    remarks: "",
    uploadedBy: "MRS. ANGEL JABAKUMAR",
    uploadedOn: "Dec 1 2025 3:00PM",
  },
];

function ExportDocumentsPageContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const city = params?.city ? decodeURIComponent(params.city as string) : "";
  const jobNumber = searchParams.get("jobNumber") || "";
  const [selectedDocumentTitle, setSelectedDocumentTitle] = useState("ALL");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadDocument, setUploadDocument] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadRemark, setUploadRemark] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    document: string;
    fileName: string;
    remark: string;
  }>>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);

  const filteredDocuments =
    selectedDocumentTitle === "ALL"
      ? mockDocuments
      : mockDocuments.filter((doc) => doc.documentTitle === selectedDocumentTitle);

  const handleBack = () => {
    router.push(`/companies/${encodeURIComponent(city)}/modules/e-doc`);
  };

  const handleUpload = () => {
    if (!uploadDocument || !uploadFile) {
      return;
    }
    
    const newFile = {
      document: uploadDocument,
      fileName: uploadFile.name,
      remark: uploadRemark,
    };
    
    setUploadedFiles([...uploadedFiles, newFile]);
    setUploadDocument("");
    setUploadFile(null);
    setUploadRemark("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadFile(e.dataTransfer.files[0]);
    }
  };

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
              E-Document Management - Export
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
          <p className="text-gray-700 text-sm font-medium">Hi!, PDG3</p>
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
          {/* Sidebar */}
          <Sidebar collapsible="none" className="border-r border-gray-200 bg-white flex flex-col">
            <SidebarHeader className="border-b border-gray-200">
              <div className="px-4 py-3">
                <h3 className="text-sm font-semibold text-gray-900">Documents Title</h3>
              </div>
            </SidebarHeader>
            <SidebarContent className="overflow-y-auto flex-1">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {documentTitles.map((title) => (
                      <SidebarMenuItem key={title}>
                        <SidebarMenuButton
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedDocumentTitle(title);
                          }}
                          isActive={selectedDocumentTitle === title}
                          className="w-full justify-start cursor-pointer"
                          type="button"
                        >
                          <FolderIcon className="w-4 h-4 mr-2" />
                          <span className="text-sm">{title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t border-gray-200 p-4 flex-shrink-0">
              <p className="text-xs text-gray-500 text-center">
                Version 3.0.09.0606.01 Copyright ©2017 Manilal Patel Group. All Rights Reserved.
              </p>
            </SidebarFooter>
          </Sidebar>

          {/* Main Content */}
          <SidebarInset className="flex flex-col overflow-hidden bg-gray-50">
            <div className="flex-1 overflow-y-auto p-6" style={{ maxHeight: '100%' }}>
              {/* Back Button Row */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <button
                  onClick={handleBack}
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
                <div className="text-base font-bold text-gray-900">
                  E-Document - Export - Document - Consignment - {jobNumber || "Job Number"}
                </div>
              </div>

              {/* Sub-header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Document Title: {selectedDocumentTitle}
                </h3>
                <Button 
                  onClick={() => setIsUploadModalOpen(true)}
                  className="bg-green-600 hover:bg-green-700 text-white"
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
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  Upload
                </Button>
              </div>

              {/* Documents Table */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold text-gray-900">Document Title</TableHead>
                      <TableHead className="font-semibold text-gray-900">File Name</TableHead>
                      <TableHead className="font-semibold text-gray-900">Actual File Name</TableHead>
                      <TableHead className="font-semibold text-gray-900">Remarks</TableHead>
                      <TableHead className="font-semibold text-gray-900">Uploaded By</TableHead>
                      <TableHead className="font-semibold text-gray-900">Uploaded On.</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.length > 0 ? (
                      filteredDocuments.map((doc) => (
                        <TableRow key={doc.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium text-gray-900">
                            {doc.documentTitle}
                          </TableCell>
                          <TableCell>
                            <a
                              href="#"
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              {doc.fileName}
                            </a>
                          </TableCell>
                          <TableCell className="text-gray-700">{doc.actualFileName}</TableCell>
                          <TableCell className="text-gray-600">{doc.remarks || "-"}</TableCell>
                          <TableCell className="text-gray-700">{doc.uploadedBy}</TableCell>
                          <TableCell className="text-gray-600">{doc.uploadedOn}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          No documents found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Summary */}
              <div className="mt-4 text-sm text-gray-600">
                Showing {filteredDocuments.length} Files From {selectedDocumentTitle}
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>

      {/* Upload File Modal */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Upload File
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Select a document type and upload your file
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Document Select */}
            <div className="space-y-2">
              <Label htmlFor="document" className="text-sm font-medium text-gray-700">
                Document <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsListOpen(!isListOpen)}
                  className="w-full flex items-center justify-between px-4 py-2 h-10 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="truncate text-sm text-gray-700">
                    {uploadDocument || "--Select--"}
                  </span>
                  <svg
                    className={`ml-2 h-4 w-4 shrink-0 text-gray-500 transition-transform ${
                      isListOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isListOpen && (
                  <div className="absolute z-50 w-full mt-1 border border-gray-300 rounded-md bg-white shadow-lg max-h-[300px] overflow-y-auto">
                    {documentTitles.map((title) => (
                      <button
                        key={title}
                        type="button"
                        onClick={() => {
                          setUploadDocument(title);
                          setIsListOpen(false);
                        }}
                        className={`
                          w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors
                          ${uploadDocument === title ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}
                        `}
                      >
                        {title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* File Upload with Drag and Drop */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                File <span className="text-red-500">*</span>
              </Label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                  relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
                  ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:border-gray-400'}
                  ${uploadFile ? 'border-green-500 bg-green-50' : ''}
                `}
              >
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                {uploadFile ? (
                  <div className="space-y-2">
                    <svg className="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{uploadFile.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {(uploadFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadFile(null);
                        const input = document.getElementById('file-upload') as HTMLInputElement;
                        if (input) input.value = '';
                      }}
                      className="mt-2"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {isDragging ? 'Drop file here' : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Remark Input */}
            <div className="space-y-2">
              <Label htmlFor="remark" className="text-sm font-medium text-gray-700">
                Remark
              </Label>
              <Input
                id="remark"
                type="text"
                value={uploadRemark}
                onChange={(e) => setUploadRemark(e.target.value)}
                placeholder="Enter remarks (optional)"
                className="w-full"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsUploadModalOpen(false);
                setUploadDocument("");
                setUploadFile(null);
                setUploadRemark("");
                setIsDragging(false);
              }}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleUpload}
              disabled={!uploadDocument || !uploadFile}
              className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Upload
            </Button>
          </DialogFooter>

          {/* List of Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-900 mb-4">
                List of Uploaded files.
              </h4>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{file.document}</p>
                      <p className="text-xs text-gray-600 mt-1 truncate">{file.fileName}</p>
                      {file.remark && (
                        <p className="text-xs text-gray-500 mt-1">Remark: {file.remark}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function ExportDocumentsPage() {
  return (
    <Suspense fallback={
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    }>
      <ExportDocumentsPageContent />
    </Suspense>
  );
}

