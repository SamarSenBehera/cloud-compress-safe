
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import FileList from "@/components/FileList";
import CompressProgress from "@/components/CompressProgress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload, HardDrive } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  simulateCompression,
  getFileType
} from "@/utils/fileUtils";

// Hooks for user files
import { useUserFiles, useAddUserFile, uploadFileToSupabase, useDeleteUserFile, downloadFile } from "@/hooks/useUserFiles";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { user, isLoggedIn } = useAuth();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);

  // Get user ID from Auth context
  const userId = user?.id || null;
  const navigate = useNavigate();

  // React Query hooks
  const fileQuery = useUserFiles(userId);
  const addUserFile = useAddUserFile();
  const deleteUserFile = useDeleteUserFile();

  // Stats
  const files = fileQuery.data || [];
  const totalFiles = files.length;
  const totalOriginalSize = files.reduce((sum, file) => sum + file.original_size, 0);
  const totalCompressedSize = files.reduce((sum, file) => sum + file.compressed_size, 0);
  const savedSpace = totalOriginalSize - totalCompressedSize;
  const percentSaved = totalOriginalSize === 0
    ? 0
    : Math.round((savedSpace / totalOriginalSize) * 100);

  // On file select/upload
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  // Handle Compression/Upload
  const handleCompressFile = async () => {
    if (!selectedFile || !userId) {
      toast({
        title: "Error",
        description: "No file selected or you're not logged in",
        variant: "destructive"
      });
      return;
    }
    
    setIsCompressing(true);
    setProgress(0);

    // Simulate compression and progress UI
    try {
      let timer: NodeJS.Timeout;
      let current = 0;
      timer = setInterval(() => {
        current += 10;
        setProgress(current);
        if (current >= 100) {
          clearInterval(timer);
        }
      }, 250);

      const { compressedSize } = await simulateCompression(selectedFile);
      
      // Upload to storage
      const storagePath = await uploadFileToSupabase(userId, selectedFile);
      
      // Insert metadata into user_files
      await addUserFile.mutateAsync({
        user_id: userId,
        name: selectedFile.name,
        original_size: selectedFile.size,
        compressed_size: compressedSize,
        file_type: getFileType(selectedFile),
        storage_path: storagePath,
      });
      
      setTimeout(() => {
        setProgress(100);
        setIsCompressing(false);
        setSelectedFile(null);
        
        // Refresh file list
        fileQuery.refetch();
        
        toast({
          title: "Success",
          description: `File "${selectedFile.name}" compressed and uploaded successfully`,
        });
      }, 400);
    } catch (e) {
      setIsCompressing(false);
      toast({
        title: "Upload Error",
        description: String((e as any)?.message || e),
        variant: "destructive"
      });
    }
  };

  // Download handler
  const handleDownloadFile = async (fileId: string) => {
    try {
      const fileMeta = files.find(f => f.id === fileId);
      if (fileMeta && fileMeta.storage_path) {
        const blob = await downloadFile(fileMeta.storage_path);
        if (blob) {
          // Download as file
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = fileMeta.name;
          document.body.appendChild(a);
          a.click();
          a.remove();
          
          toast({
            title: "Downloaded",
            description: `File "${fileMeta.name}" downloaded successfully`,
          });
        }
      }
    } catch (error) {
      toast({
        title: "Download Error",
        description: String((error as any)?.message || error),
        variant: "destructive"
      });
    }
  };

  // Delete handler
  const handleDeleteFile = async (fileId: string) => {
    try {
      const fileMeta = files.find(f => f.id === fileId);
      if (fileMeta) {
        await deleteUserFile.mutateAsync({ id: fileMeta.id, storage_path: fileMeta.storage_path });
        toast({
          title: "Deleted",
          description: `File "${fileMeta.name}" deleted successfully`,
        });
      }
    } catch (error) {
      toast({
        title: "Delete Error",
        description: String((error as any)?.message || error),
        variant: "destructive"
      });
    }
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} />

      <main className="flex-1 py-10 bg-gray-50 dark:bg-zinc-900 transition-colors">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Your Dashboard</h1>

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
              files={files.map(f => ({
                id: f.id,
                name: f.name,
                originalSize: f.original_size,
                compressedSize: f.compressed_size,
                createdAt: new Date(f.created_at),
                type: f.file_type
              }))}
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
