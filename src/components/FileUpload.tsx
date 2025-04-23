
import { useState, ChangeEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
}

const FileUpload = ({ onFileSelect, isLoading = false }: FileUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className={`border-2 border-dashed ${dragActive ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300"}`}>
      <CardContent className="p-6">
        <div
          className="flex flex-col items-center justify-center space-y-4 py-8"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-gray-400" />
          <div className="text-center">
            <p className="text-lg font-medium">Drag & drop your file here</p>
            <p className="text-sm text-gray-500 mt-1">or click to browse files</p>
          </div>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <Button 
            variant="outline" 
            className="cursor-pointer"
            disabled={isLoading}
            onClick={handleButtonClick}
          >
            Select File
          </Button>
          {selectedFile && (
            <div className="text-sm text-gray-600 mt-2">
              Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
