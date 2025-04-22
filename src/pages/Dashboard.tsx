
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useQueryClient } from "@tanstack/react-query";

const Dashboard = () => {
  const { isLoggedIn } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);

  // For real user - fetch user id from supabase client
  const user = window.localStorage.getItem("sb-user"); // fallback method if `useAuth` doesn't expose user
  // You may want to update this to use proper user object if available (show avatar, name, etc)
  const userId = (window.localStorage.getItem("supabase.auth.token")
    ? JSON.parse(window.localStorage.getItem("supabase.auth.token") || "{}")?.currentSession?.user?.id
    : null
  ) || null;

  const navigate = useNavigate();

  // React Query hooks
  const fileQuery = useUserFiles(userId);
  const addUserFile = useAddUserFile();
  const deleteUserFile = useDeleteUserFile();
  const queryClient = useQueryClient();

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
    if (!selectedFile || !userId) return;
    setIsCompressing(true);
    setProgress(0);

    // Simulate compression and progress UI
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
    // Create a new File with the new (smaller) size for upload
    // For demo, we cannot shrink the file, so just upload the original
    let fileForUpload = selectedFile;
    // Upload to storage
    let storagePath: string = "";
    try {
      storagePath = await uploadFileToSupabase(userId, fileForUpload);
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
        queryClient.invalidateQueries({ queryKey: ["user_files", userId] });
      }, 400);
    } catch (e) {
      setIsCompressing(false);
      alert("Error uploading file: " + String((e as any)?.message || e));
    }
  };

  // Download handler
  const handleDownloadFile = async (fileId: string) => {
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
      }
    }
  };

  // Delete handler
  const handleDeleteFile = async (fileId: string) => {
    const fileMeta = files.find(f => f.id === fileId);
    if (fileMeta) {
      await deleteUserFile.mutateAsync({ id: fileMeta.id, storage_path: fileMeta.storage_path });
    }
  };

  // Only show dashboard if user is authenticated
  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

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
