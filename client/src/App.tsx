// src/App.tsx
import React, { useEffect } from "react";
import Routes from "@/routes";
import { ThemeProvider } from "@/components/theme-provider";
import useAppStore from "@/stores/appStore";
import Logo from "/logo.png";

const App: React.FC = () => {
  const { checkAuth, authIsLoading } = useAppStore();

  useEffect(() => {
    console.log("Checking auth...");
    checkAuth();
  }, [checkAuth]);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      {authIsLoading && (
        <div
          className="fixed flex-col inset-0 text-4xl font-bold z-20 flex items-center justify-center"
          style={{ backdropFilter: "blur(5px)" }}
        >
          <img src={Logo} alt="Loading..." className="w-24 h-24 mb-6" />
          <div className="flex">
            <p>Loading</p>
            <p className="animate-bounce ml-2">...</p>
          </div>
        </div>
      )}
      <Routes />
    </ThemeProvider>
  );
};

export default App;
