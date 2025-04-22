
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
  const query = useQuery({
    queryKey: ["user_files", userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from("user_files")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as UserFile[];
    },
    enabled: !!userId,
  });
  return query;
}

export function useAddUserFile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (fileMeta: Omit<UserFile, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("user_files")
        .insert([fileMeta])
        .select()
        .maybeSingle();
      if (error) throw error;
      return data as UserFile;
    },
    onSuccess: (_, __, context) => {
      // Invalidate query to refresh file list
      queryClient.invalidateQueries({ queryKey: ["user_files"] });
    }
  });
}

export async function uploadFileToSupabase(userId: string, file: File): Promise<string> {
  // Files stored as 'userId/filename'
  const path = `${userId}/${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from("compressed_files")
    .upload(path, file);
  if (error) throw error;
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
  const { data, error } = await supabase.storage
    .from("compressed_files")
    .download(path);
  if (error) return null;
  return data;
}

export function useDeleteUserFile() {
  const queryClient = useQueryClient();
  return useMutation({
    // fileMeta should have id and storage_path
    mutationFn: async ({ id, storage_path }: { id: string, storage_path: string }) => {
      // Remove from db first
      const { error: dbError } = await supabase.from("user_files").delete().eq("id", id);
      if (dbError) throw dbError;
      // Remove the file from storage
      const { error: storageError } = await supabase.storage
        .from("compressed_files")
        .remove([storage_path]);
      if (storageError) throw storageError;
      return id;
    },
    onSuccess: (_, __, context) => {
      queryClient.invalidateQueries({ queryKey: ["user_files"] });
    }
  });
}
