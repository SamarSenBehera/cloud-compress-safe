
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HardDrive, Download, Upload } from "lucide-react";

interface DashboardStatsProps {
  totalFiles: number;
  savedSpace: number;
  percentSaved: number;
  totalCompressedSize: number;
}

const DashboardStats = ({
  totalFiles,
  savedSpace,
  percentSaved,
  totalCompressedSize
}: DashboardStatsProps) => (
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
);

export default DashboardStats;
