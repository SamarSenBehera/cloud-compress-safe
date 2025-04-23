
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import {
  simulateCompression,
  getFileType
} from "@/utils/fileUtils";
import { useUserFiles, useAddUserFile, uploadFileToSupabase, useDeleteUserFile, downloadFile } from "@/hooks/useUserFiles";

import DashboardStats from "./dashboard/DashboardStats";
import DashboardUploader from "./dashboard/DashboardUploader";
import DashboardFileList from "./dashboard/DashboardFileList";

const Dashboard = () => {
  const { user, isLoggedIn } = useAuth();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);

  const userId = user?.id || null;
  const navigate = useNavigate();

  const fileQuery = useUserFiles(userId);
  const addUserFile = useAddUserFile();
  const deleteUserFile = useDeleteUserFile();

  const files = fileQuery.data || [];
  const totalFiles = files.length;
  const totalOriginalSize = files.reduce((sum, file) => sum + file.original_size, 0);
  const totalCompressedSize = files.reduce((sum, file) => sum + file.compressed_size, 0);
  const savedSpace = totalOriginalSize - totalCompressedSize;
  const percentSaved = totalOriginalSize === 0
    ? 0
    : Math.round((savedSpace / totalOriginalSize) * 100);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

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

      const storagePath = await uploadFileToSupabase(userId, selectedFile);

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

  const handleDownloadFile = async (fileId: string) => {
    try {
      const fileMeta = files.find(f => f.id === fileId);
      if (fileMeta && fileMeta.storage_path) {
        const blob = await downloadFile(fileMeta.storage_path);
        if (blob) {
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

          <DashboardStats
            totalFiles={totalFiles}
            savedSpace={savedSpace}
            percentSaved={percentSaved}
            totalCompressedSize={totalCompressedSize}
          />

          <DashboardUploader
            selectedFile={selectedFile}
            isCompressing={isCompressing}
            progress={progress}
            onFileSelect={handleFileSelect}
            onCompressFile={handleCompressFile}
          />

          <DashboardFileList
            files={files.map(f => ({
              id: f.id,
              name: f.name,
              originalSize: f.original_size,
              compressedSize: f.compressed_size,
              createdAt: new Date(f.created_at),
              type: f.file_type,
            }))}
            onDownload={handleDownloadFile}
            onDelete={handleDeleteFile}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
