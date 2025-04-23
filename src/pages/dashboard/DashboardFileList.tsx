
import FileList from "@/components/FileList";

interface DashboardFileListProps {
  files: {
    id: string;
    name: string;
    originalSize: number;
    compressedSize: number;
    createdAt: Date;
    type: string;
  }[];
  onDownload: (fileId: string) => void;
  onDelete: (fileId: string) => void;
}

const DashboardFileList = ({ files, onDownload, onDelete }: DashboardFileListProps) => (
  <div>
    <FileList files={files} onDownload={onDownload} onDelete={onDelete} />
  </div>
);

export default DashboardFileList;
