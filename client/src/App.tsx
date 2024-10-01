// src/App.tsx
import React, { useEffect, useState } from "react";
import Routes from "@/routes";
import { ThemeProvider } from "@/components/theme-provider";
import useAppStore from "@/stores/appStore";
import Logo from "/logo.png";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import OrganizationCredentialSelector from "@/components/OrganizationCredentialSelector";

const CHECK_INTERVAL = 10000; // 10 seconds

const App: React.FC = () => {
  const { checkConnection, isConnected, checkAuth } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(CHECK_INTERVAL / 1000);

  useEffect(() => {
    const initApp = async () => {
      await checkAuth();
      await checkConnection();
      setIsLoading(false);
    };

    initApp();

    const connectionInterval = setInterval(() => {
      checkConnection();
      setCountdown(CHECK_INTERVAL / 1000);
    }, CHECK_INTERVAL);

    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown > 0 ? prevCountdown - 1 : CHECK_INTERVAL / 1000
      );
    }, 1000);

    return () => {
      clearInterval(connectionInterval);
      clearInterval(countdownInterval);
    };
  }, [checkAuth, checkConnection]);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      {isLoading && (
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
      {!isLoading && !isConnected && (
        <div className="h-18 absolute bottom-8 w-full items-center">
          <div className="m-auto max-w-2xl ">
            <Alert variant="warning" className="flex justify-between z-10">
              <AlertTitle>You're not connected to ClickHouse!</AlertTitle>
              <AlertDescription className="flex items-center">
                Please select a valid organization and credential to connect to
                ClickHouse. Retrying in {countdown} seconds.
                <OrganizationCredentialSelector isExpanded={true} />
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}
      <Routes />
    </ThemeProvider>
  );
};

export default App;
