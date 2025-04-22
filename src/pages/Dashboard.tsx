
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import FileList, { FileItem } from "@/components/FileList";
import CompressProgress from "@/components/CompressProgress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload, HardDrive } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  simulateCompression,
  generateFileId,
  getFileType
} from "@/utils/fileUtils";

const Dashboard = () => {
  const { isLoggedIn } = useAuth();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // Demo data - in a real app, this would be fetched from your API
    const demoFiles: FileItem[] = [
      {
        id: "file1",
        name: "presentation.pptx",
        originalSize: 15 * 1024 * 1024, // 15MB
        compressedSize: 8 * 1024 * 1024, // 8MB
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        type: "pptx"
      },
      {
        id: "file2",
        name: "project-images.zip",
        originalSize: 64 * 1024 * 1024, // 64MB
        compressedSize: 25 * 1024 * 1024, // 25MB
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        type: "zip"
      },
      {
        id: "file3",
        name: "annual-report.pdf",
        originalSize: 12 * 1024 * 1024, // 12MB
        compressedSize: 7 * 1024 * 1024, // 7MB
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
        type: "pdf"
      }
    ];

    setFiles(demoFiles);
  }, [navigate]);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleCompressFile = () => {
    if (!selectedFile) return;
    
    setIsCompressing(true);
    setProgress(0);
    
    // Simulate compression process with progress updates
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + 10;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Use our utility to simulate compression
          simulateCompression(selectedFile).then(({ compressedSize }) => {
            // Add the "compressed" file to the list
            const newFile: FileItem = {
              id: generateFileId(),
              name: selectedFile.name,
              originalSize: selectedFile.size,
              compressedSize: compressedSize,
              createdAt: new Date(),
              type: getFileType(selectedFile)
            };
            
            setFiles(prevFiles => [newFile, ...prevFiles]);
            setIsCompressing(false);
            setSelectedFile(null);
          });
          
          return 100;
        }
        
        return newProgress;
      });
    }, 500);
  };

  const handleDownloadFile = (fileId: string) => {
    console.log("Downloading file:", fileId);
    // In a real app, this would trigger a download from your API
    alert(`File download started for ID: ${fileId}`);
  };

  const handleDeleteFile = (fileId: string) => {
    console.log("Deleting file:", fileId);
    // Remove the file from the list
    setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
  };

  // Calculate storage metrics
  const totalFiles = files.length;
  const totalOriginalSize = files.reduce((sum, file) => sum + file.originalSize, 0);
  const totalCompressedSize = files.reduce((sum, file) => sum + file.compressedSize, 0);
  const savedSpace = totalOriginalSize - totalCompressedSize;
  const percentSaved = totalOriginalSize === 0 
    ? 0 
    : Math.round((savedSpace / totalOriginalSize) * 100);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} />
      
      <main className="flex-1 py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Dashboard</h1>
          
          {/* Storage Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-500 text-sm font-medium">Total Files</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <HardDrive className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <p className="text-2xl font-bold">{totalFiles}</p>
                    <p className="text-sm text-gray-500">Files stored</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-500 text-sm font-medium">Storage Saved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Download className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <p className="text-2xl font-bold">{(savedSpace / (1024 * 1024)).toFixed(2)} MB</p>
                    <p className="text-sm text-gray-500">{percentSaved}% reduction</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-500 text-sm font-medium">Storage Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Upload className="h-8 w-8 text-orange-600 mr-3" />
                  <div>
                    <p className="text-2xl font-bold">{(totalCompressedSize / (1024 * 1024)).toFixed(2)} MB</p>
                    <p className="text-sm text-gray-500">Compressed storage</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* File Upload Section */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Upload a File</CardTitle>
                <CardDescription>
                  Select a file to compress and store securely
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload 
                  onFileSelect={handleFileSelect} 
                  isLoading={isCompressing}
                />
                
                {selectedFile && !isCompressing && (
                  <div className="mt-4 flex justify-end">
                    <Button 
                      onClick={handleCompressFile}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Compress & Upload
                    </Button>
                  </div>
                )}
                
                {isCompressing && selectedFile && (
                  <CompressProgress
                    progress={progress}
                    fileName={selectedFile.name}
                    isCompressing={isCompressing}
                  />
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* File List Section */}
          <div>
            <FileList 
              files={files}
              onDownload={handleDownloadFile}
              onDelete={handleDeleteFile}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
