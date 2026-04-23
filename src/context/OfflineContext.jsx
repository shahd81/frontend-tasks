import { createContext, useContext, useState, useEffect } from "react";
import { deletePost } from "../services/posts.service";
const OfflineContext = createContext();

export function OfflineProvider({ children }) {
  const [offlineQueue, setOfflineQueue] = useState(() => {
    return JSON.parse(localStorage.getItem("offlineQueue") || "[]");
  });

  const addToQueue = (action) => {
    setOfflineQueue((prev) => {
      const updated = [...prev, action];
      localStorage.setItem("offlineQueue", JSON.stringify(updated));
      return updated;
    });
  };

 // داخل OfflineContext.js
const replayQueue = async () => {
  if (!navigator.onLine || offlineQueue.length === 0) return;

  const queueCopy = [...offlineQueue];
  
  for (const action of queueCopy) {
    try {
      if (action.type === "DELETE") {
        await deletePost(action.id); 
      }
      setOfflineQueue(prev => {
        const updated = prev.filter(item => item.id !== action.id);
        localStorage.setItem("offlineQueue", JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      console.error("Sync failed for item:", action.id, err);
      break; 
    }
  }
};

  useEffect(() => {
    const handleOnline = () => replayQueue();
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);
  return (
    <OfflineContext.Provider value={{ offlineQueue, addToQueue, replayQueue }}>
      {children}
    </OfflineContext.Provider>
  );
}

export const useOffline = () => useContext(OfflineContext);