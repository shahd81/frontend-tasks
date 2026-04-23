import { useState } from "react";
import { toast } from "react-toastify";
// import { uploadFile } from "../services/uploadFile";
import { useChunkUpload } from "../hooks/useChunkUpload.js";
import { validateFile, sanitizeFileName } from "../utils/validators";
import { useRef } from "react";
export default function FileUpload() {
  const MAX_SIZE = 5 * 1024 * 1024;
  const ALLOWED_TYPES = ["image/png", "image/jpeg", "application/pdf"];
  // const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const forbidden = ["exe", "js", "bat"]
    const { uploads, addFiles, startUpload, pauseUpload, resumeUpload, cancelUpload } = useChunkUpload();
  const handleFiles = (selectedFiles) => {
  const validFiles = [];

  selectedFiles.forEach((file) => {
    const sanitizedFile = new File([file], sanitizeFileName(file.name), { type: file.type || "application/octet-stream" });
    const { valid, error } = validateFile(sanitizedFile);
    if (!valid) return toast.error(`${sanitizedFile.name}: ${error}`);

    const extension = sanitizedFile.name.split(".").pop().toLowerCase();
    if (forbidden.includes(extension)) {
      return toast.error(`${sanitizedFile.name}: forbidden file type`);
    }
    if (sanitizedFile.size > MAX_SIZE) {
      return toast.error(`${sanitizedFile.name}: File too large`);
    }
    validFiles.push(sanitizedFile);
  });

  if (validFiles.length) {
    addFiles(validFiles); 
    const imagePreviews = validFiles.map((file) =>
      file.type?.startsWith("image/") || file.type === "application/pdf"
        ? URL.createObjectURL(file)
        : null
    );
    setPreviews(prev => [...prev, ...imagePreviews]);
  }
    if (validFiles.length === 1) {
      setPreviews([URL.createObjectURL(validFiles[0])]);
    } else {
      setPreviews(validFiles.map((file) => URL.createObjectURL(file)));
    }
  };
  const handleFileChange = (e) => {
    handleFiles(Array.from(e.target.files));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(Array.from(e.dataTransfer.files));
  };

 const handleUploadAll = () => {
  if (!uploads.length) {
    toast.error("No files selected!");
    return;
  }

  uploads.forEach(fileObj => {
    if (fileObj.status === "idle" || fileObj.status === "failed") {
      startUpload(fileObj);
    }
  });
};

  return (
    <div className=" flex-col gap-6 bg-gray-50 dark:bg-gray-900 p-4 min-h-screen border pt-16">
      <h3 className="text-xl font-semibold mb-4 text-black dark:text-white p-5">
        File Upload
      </h3>

      {/* Drag & Drop Area */}
      <div
        onClick={() => fileInputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="mb-4 p-8 border-2 border-dashed border-gray-400 rounded text-center text-gray-500 dark:text-gray-300 cursor-pointer hover:border-blue-500 transition"
      >
        Drag & Drop files here or click to select
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
          id="fileInput"
        />
      </div>

     {uploads.filter(f => f.status !== "completed").length> 0 && (
      uploads.filter(f => f.status !== "completed").length === 1 && previews.length === 1 ? (
    <div className="mb-4 bg-gray-100 dark:bg-gray-700 p-4 rounded">
      <p className="text-sm mb-2">{uploads[0].file.name}</p>
      {uploads[0].file.type?.startsWith("image/") && (
        <img src={previews[0]} alt="preview" className="max-h-60 rounded" />
      )}
      {uploads[0].file.type === "application/pdf" && (
        <iframe
          src={previews[0]}
          title="PDF Preview"
          className="w-full h-96 rounded border"
        />
      )}

      {/* أزرار التحكم + progress */}
      <div className="flex items-center gap-2 mt-2">
        {uploads[0].status === "idle" && (
          <button onClick={() => startUpload(uploads[0])} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Upload</button>
        )}
        {uploads[0].status === "uploading" && (
          <button onClick={() => pauseUpload(uploads[0].id)} className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">Pause</button>
        )}
        {uploads[0].status === "paused" && (
          <button onClick={() => resumeUpload(uploads[0].id)} className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">Resume</button>
        )}
        {uploads[0].status === "failed" && (
          <button onClick={() => startUpload(uploads[0])} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">Retry</button>
        )}
        <button onClick={() => cancelUpload(uploads[0].id)} className="px-2 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition">Cancel</button>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded overflow-hidden mt-2">
        <div
          className={`h-2 rounded ${
            uploads[0].status === "failed"
              ? "bg-red-500"
              : uploads[0].status === "completed"
              ? "bg-green-500"
              : "bg-blue-500"
          }`}
          style={{ width: `${uploads[0].progress}%` }}
        ></div>
      </div>
    </div>
  ) : (
    <div className="mb-4 flex flex-col gap-2">
      { uploads.filter(f => f.status !== "completed").map((fileObj) => (
        <div key={fileObj.id} className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b p-2">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="font-medium text-black dark:text-white">{fileObj.file.name}</span>
            <span className="text-sm text-gray-500">{Math.round(fileObj.progress)}%</span>
          </div>
          <div className="flex items-center gap-2">
            {fileObj.status === "idle" && <button onClick={() => startUpload(fileObj)} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Upload</button>}
            {fileObj.status === "uploading" && <button onClick={() => pauseUpload(fileObj.id)} className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">Pause</button>}
            {fileObj.status === "paused" && <button onClick={() => resumeUpload(fileObj.id)} className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">Resume</button>}
            {fileObj.status === "failed" && <button onClick={() => startUpload(fileObj)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">Retry</button>}
            <button onClick={() => cancelUpload(fileObj.id)} className="px-2 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition">Cancel</button>
          </div>

          <div className="w-full sm:w-48 bg-gray-200 h-2 rounded overflow-hidden mt-2 sm:mt-0">
            <div
              className={`h-2 rounded ${
                fileObj.status === "failed"
                  ? "bg-red-500"
                  : fileObj.status === "completed"
                  ? "bg-green-500"
                  : "bg-blue-500"
              }`}
              style={{ width: `${fileObj.progress}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
)}

      <button
        onClick={handleUploadAll}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload All"}
      </button>
    </div>
  );
}
