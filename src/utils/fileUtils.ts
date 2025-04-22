
// Utility functions for file compression simulation

/**
 * Helper function to format file size in a human-readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Calculate compression ratio between original and compressed size
 */
export const calculateCompressionRatio = (originalSize: number, compressedSize: number): string => {
  if (originalSize === 0) return '0%';
  
  const ratio = ((originalSize - compressedSize) / originalSize) * 100;
  return ratio.toFixed(1) + '%';
};

/**
 * Simulate file compression (for demo purposes)
 * In a real app, this would use actual compression algorithms
 */
export const simulateCompression = (file: File): Promise<{
  compressedSize: number;
  compressionRatio: string;
}> => {
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      // Simulate compression based on file type
      let compressionFactor = 0.5; // Default 50% reduction
      
      const fileExt = file.name.split('.').pop()?.toLowerCase() || '';
      
      // Different compression factors based on file type
      if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExt)) {
        compressionFactor = 0.7; // Images are harder to compress losslessly
      } else if (['txt', 'html', 'css', 'js'].includes(fileExt)) {
        compressionFactor = 0.3; // Text files compress well
      } else if (['mp4', 'mov', 'avi'].includes(fileExt)) {
        compressionFactor = 0.85; // Video files are already compressed
      } else if (['pdf', 'doc', 'docx'].includes(fileExt)) {
        compressionFactor = 0.6; // Documents compress moderately
      }
      
      // Calculate simulated compressed size
      const compressedSize = Math.floor(file.size * compressionFactor);
      const compressionRatio = calculateCompressionRatio(file.size, compressedSize);
      
      resolve({
        compressedSize,
        compressionRatio
      });
    }, 1500);
  });
};

/**
 * Generate a unique file ID for storage
 */
export const generateFileId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Get file MIME type as a friendly string
 */
export const getFileType = (file: File): string => {
  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  
  const typeMap: Record<string, string> = {
    'pdf': 'PDF Document',
    'doc': 'Word Document',
    'docx': 'Word Document',
    'xls': 'Excel Spreadsheet',
    'xlsx': 'Excel Spreadsheet',
    'ppt': 'PowerPoint',
    'pptx': 'PowerPoint',
    'jpg': 'JPEG Image',
    'jpeg': 'JPEG Image',
    'png': 'PNG Image',
    'gif': 'GIF Image',
    'svg': 'SVG Image',
    'mp4': 'MP4 Video',
    'mov': 'MOV Video',
    'mp3': 'MP3 Audio',
    'wav': 'WAV Audio',
    'zip': 'ZIP Archive',
    'rar': 'RAR Archive',
    'txt': 'Text File',
    'html': 'HTML File',
    'css': 'CSS File',
    'js': 'JavaScript File',
    'json': 'JSON File',
    'xml': 'XML File'
  };
  
  return typeMap[extension] || extension.toUpperCase();
};
