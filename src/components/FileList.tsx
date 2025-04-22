
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, File, Trash } from "lucide-react";
import { formatFileSize, calculateCompressionRatio } from "@/utils/fileUtils";

// File type definition
export interface FileItem {
  id: string;
  name: string;
  originalSize: number;
  compressedSize: number;
  createdAt: Date;
  type: string;
}

interface FileListProps {
  files: FileItem[];
  onDownload: (fileId: string) => void;
  onDelete: (fileId: string) => void;
}

const FileList = ({ files, onDownload, onDelete }: FileListProps) => {

  if (files.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <File className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No files yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Upload a file to start compressing.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Files</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Original Size
                </th>
                <th scope="col" className="px-6 py-3">
                  Compressed Size
                </th>
                <th scope="col" className="px-6 py-3">
                  Saved
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 truncate max-w-[200px]">
                    {file.name}
                  </td>
                  <td className="px-6 py-4">{file.type}</td>
                  <td className="px-6 py-4">{formatFileSize(file.originalSize)}</td>
                  <td className="px-6 py-4">{formatFileSize(file.compressedSize)}</td>
                  <td className="px-6 py-4">
                    {calculateCompressionRatio(file.originalSize, file.compressedSize)}
                  </td>
                  <td className="px-6 py-4">
                    {file.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDownload(file.id)}
                        className="p-1 h-8 w-8"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDelete(file.id)}
                        className="p-1 h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileList;
