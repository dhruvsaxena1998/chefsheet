import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserContext } from "shared/hooks/useUser";

const Index: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    }

    router.replace("/home");
  }, []);

  return <></>;
};

export default Index;
