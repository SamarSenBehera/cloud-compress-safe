
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import FileUpload from "@/components/FileUpload";
import CompressProgress from "@/components/CompressProgress";

interface DashboardUploaderProps {
  selectedFile: File | null;
  isCompressing: boolean;
  progress: number;
  onFileSelect: (file: File) => void;
  onCompressFile: () => Promise<void>;
}

const DashboardUploader = ({
  selectedFile,
  isCompressing,
  progress,
  onFileSelect,
  onCompressFile,
}: DashboardUploaderProps) => (
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
          onFileSelect={onFileSelect}
          isLoading={isCompressing}
        />
        {selectedFile && !isCompressing && (
          <div className="mt-4 flex justify-end">
            <Button
              onClick={onCompressFile}
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
);

export default DashboardUploader;
