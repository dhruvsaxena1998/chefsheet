import "react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css";
import "../styles/globals.css";

import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Router from "next/router";
import NProgress from "nprogress";

import { setTheme } from "../shared/services/theme";
import type { AppProps } from "next/app";
import { UserProvider } from "shared/hooks/useUser";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    setTheme();

    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());
  });

  return (
    <>
      <UserProvider>
        <Component {...pageProps} />
        <ToastContainer limit={3} containerId="toastify" />
      </UserProvider>
    </>
  );
}

export default MyApp;
