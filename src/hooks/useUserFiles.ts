
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface UserFile {
  id: string;
  user_id: string;
  name: string;
  original_size: number;
  compressed_size: number;
  file_type: string;
  created_at: string;
  updated_at: string;
  storage_path: string;
}

export function useUserFiles(userId: string | null) {
  return useQuery({
    queryKey: ["user_files", userId],
    queryFn: async () => {
      if (!userId) return [];
      
      console.log("Fetching files for user:", userId);
      const { data, error } = await supabase
        .from("user_files")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching files:", error);
        throw error;
      }
      
      console.log("Files fetched:", data);
      return data as UserFile[];
    },
    enabled: !!userId,
  });
}

export function useAddUserFile() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (fileMeta: Omit<UserFile, "id" | "created_at" | "updated_at">) => {
      console.log("Adding file:", fileMeta);
      
      const { data, error } = await supabase
        .from("user_files")
        .insert([fileMeta])
        .select()
        .maybeSingle();
      
      if (error) {
        console.error("Error adding file:", error);
        throw error;
      }
      
      console.log("File added:", data);
      return data as UserFile;
    },
    onSuccess: (data, variables) => {
      console.log("File added successfully:", data);
      // Invalidate query to refresh file list
      queryClient.invalidateQueries({ queryKey: ["user_files"] });
    },
    onError: (error) => {
      console.error("Error in useAddUserFile:", error);
      toast.error("Failed to save file metadata");
    }
  });
}

export async function uploadFileToSupabase(userId: string, file: File): Promise<string> {
  // Files stored as 'userId/filename'
  const path = `${userId}/${Date.now()}_${file.name}`;
  
  console.log("Uploading file to path:", path);
  
  const { data, error } = await supabase.storage
    .from("compressed_files")
    .upload(path, file);
  
  if (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
  
  console.log("File uploaded:", data);
  return path;
}

export function getPublicFileUrl(path: string) {
  const { data } = supabase
    .storage
    .from("compressed_files")
    .getPublicUrl(path);
  
  return data.publicUrl;
}

export async function downloadFile(path: string): Promise<Blob | null> {
  console.log("Downloading file from path:", path);
  
  const { data, error } = await supabase.storage
    .from("compressed_files")
    .download(path);
  
  if (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
  
  console.log("File downloaded successfully");
  return data;
}

export function useDeleteUserFile() {
  const queryClient = useQueryClient();
  
  return useMutation({
    // fileMeta should have id and storage_path
    mutationFn: async ({ id, storage_path }: { id: string, storage_path: string }) => {
      console.log("Deleting file:", id, storage_path);
      
      // Remove from db first
      const { error: dbError } = await supabase
        .from("user_files")
        .delete()
        .eq("id", id);
      
      if (dbError) {
        console.error("Error deleting file from db:", dbError);
        throw dbError;
      }
      
      // Remove the file from storage
      const { error: storageError } = await supabase.storage
        .from("compressed_files")
        .remove([storage_path]);
      
      if (storageError) {
        console.error("Error deleting file from storage:", storageError);
        throw storageError;
      }
      
      console.log("File deleted successfully");
      return id;
    },
    onSuccess: (id) => {
      console.log("File deletion completed:", id);
      queryClient.invalidateQueries({ queryKey: ["user_files"] });
    },
    onError: (error) => {
      console.error("Error in useDeleteUserFile:", error);
      toast.error("Failed to delete file");
    }
  });
}
