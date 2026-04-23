import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./context/ThemesContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { LoaderProvider } from "./context/loaderContext.jsx";
import { UserProvider } from "./context/userContext.jsx";
import { OfflineProvider } from "./context/OfflineContext.jsx";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
     cacheTime: 1000 * 60 * 60,
     refetchOnMount: false,    
    },
      mutations: {
      networkMode: "online",
    }
  },
});createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <OfflineProvider>
      <LoaderProvider>
        <UserProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
        </UserProvider>
      </LoaderProvider>
      </OfflineProvider>
    </QueryClientProvider>
   </StrictMode>
);
