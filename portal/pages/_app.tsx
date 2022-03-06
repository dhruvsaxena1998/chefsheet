import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { setTheme } from "../shared/services/theme";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    setTheme();
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
