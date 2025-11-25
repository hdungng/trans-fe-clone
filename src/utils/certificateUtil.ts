// utils/loadInitialFiles.ts

export const loadInitialFiles = async (
  baseUrl: string,
  filesData: { project_id: string, filename: string; file_path: string, file_id: string, id: number, result_json: string | null }[]
): Promise<File[]> => {
  const filePromises = filesData.map(async ({ filename, file_path }) => {
    try {
      const normalizedPath = file_path.replace(/\\/g, "/");
      const fileUrl = `${baseUrl}${normalizedPath}`;

      const res = await fetch(fileUrl);

      const blob = await res.blob();

      return new File([blob], filename, { type: blob.type });
    } catch (error) {
      console.error(`Không tải được file ${filename}`, error);
      return null;
    }
  });

  const files = await Promise.all(filePromises);
  return files.filter((f): f is File => f !== null);
};
