import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import { setTheme } from "../shared/services/theme";


function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    setTheme();
  });

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyApp;
