import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import "nprogress/nprogress.css";

import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Router from "next/router";
import NProgress from "nprogress";

import { setTheme } from "../shared/services/theme";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    setTheme();

    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());
  });

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyApp;
