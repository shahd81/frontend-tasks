// // uploadFile.js
// import axios from "axios";

// export async function uploadFile({ file, onProgress, signal }) {
//   try {
//     const formData = new FormData();
//     formData.append("file", file); 
//     const res = await axios.post("https://httpbin.org/post", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//       onUploadProgress: (e) => {
//         if (onProgress) onProgress(Math.round((e.loaded * 100) / e.total));
//       },
//       signal,
//     });
//     return res.data;
//   } catch (err) {
//     if (axios.isCancel(err)) throw new Error("paused"); 
//     console.error(err);
//     throw new Error(err.message || "Upload failed");
//   }
// }