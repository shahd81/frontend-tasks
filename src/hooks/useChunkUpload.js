import { useState } from "react";

export function useChunkUpload() {
  const [uploads, setUploads] = useState([]);
  const CHUNK_SIZE = 512 * 1024;
  const addFiles = (files) => {
    const filesMeta = files.map(file => ({
      id: crypto.randomUUID(),
      file,
      progress: 0,
      status: "idle",
      currentChunk: 0, 
      totalChunks: Math.ceil(file.size / CHUNK_SIZE),
    }));
    setUploads(prev => [...prev, ...filesMeta]);
  };

  const startUpload = (fileObj) => {
    if (!fileObj || fileObj.status === "uploading" || fileObj.status === "completed") return;

    fileObj.status = "uploading";
    setUploads(prev => prev.map(f => f.id === fileObj.id ? { ...fileObj } : f));

    const CHUNK_DELAY = 9000; 

    const uploadNextChunk = () => {
      if (fileObj.status !== "uploading") return; 

      if (fileObj.currentChunk < fileObj.totalChunks) {
        fileObj.currentChunk += 1;
        fileObj.progress = (fileObj.currentChunk / fileObj.totalChunks) * 100;
        fileObj.currentChunk += 1; 
        setUploads(prev => prev.map(f => f.id === fileObj.id ? { ...fileObj } : f));

        setTimeout(uploadNextChunk, CHUNK_DELAY);
      } else {
       
        fileObj.status = "completed";
        setUploads(prev => prev.filter(f => f.id !== fileObj.id));
      }
    };

    uploadNextChunk();
  };

  const pauseUpload = (id) => {
    setUploads(prev =>
      prev.map(f => f.id === id ? { ...f, status: "paused" } : f)
    );
  };

  const resumeUpload = (id) => {
  setUploads(prev =>
    prev.map(file => {
      if (file.id === id && file.status === "paused") {
        const updatedFile = { ...file, status: "uploading" };
        startUpload(updatedFile); 
        return updatedFile;
      }
      return file;
    })
  );
};
  const cancelUpload = (id) => {
    setUploads(prev => prev.filter(f => f.id !== id));
  };

  return { uploads, addFiles, startUpload, pauseUpload, resumeUpload, cancelUpload };
}