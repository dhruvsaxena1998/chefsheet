import "../styles/globals.css";
import type { AppProps } from "next/app";

import { useEffect } from "react";
import { setTheme } from "../shared/services/theme";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    setTheme();
  });

  return <Component {...pageProps} />;
}

export default MyApp;
