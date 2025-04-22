
import { Progress } from "@/components/ui/progress";

interface CompressProgressProps {
  progress: number;
  fileName: string;
  isCompressing: boolean;
}

const CompressProgress = ({ progress, fileName, isCompressing }: CompressProgressProps) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-blue-600 truncate max-w-[80%]">
          {isCompressing ? "Compressing" : "Processing"}: {fileName}
        </span>
        <span className="text-sm font-medium text-blue-600">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
      <p className="text-xs text-gray-500 mt-2">
        {isCompressing 
          ? "Compressing your file for secure storage..." 
          : "Processing your file..."}
      </p>
    </div>
  );
};

export default CompressProgress;
