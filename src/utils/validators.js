export const MAX_SIZE = 5 * 1024 * 1024;
export const ALLOWED_TYPES = ["image/png", "image/jpeg", "application/pdf"];
export const FORBIDDEN_EXTENSIONS = ["exe", "js", "bat"];

export function validateFile(file) {
  const extension = file.name.split(".").pop().toLowerCase();
  
  if (!ALLOWED_TYPES.includes(file.type) || FORBIDDEN_EXTENSIONS.includes(extension)) {
    return { valid: false, error: "File type not allowed" };
  }
  if (file.size > MAX_SIZE) {
    return { valid: false, error: "File is too large" };
  }

  return { valid: true };
}

export function sanitizeFileName(name) {
  return name.replace(/[^a-z0-9\\.\-_]/gi, "_");
}