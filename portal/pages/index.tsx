import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { Button } from "@mantine/core";
import DefaultLayout from "../layouts/DefaultLayout";

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <>
        <Head>
          <title>Mantine</title>
        </Head>

        <main>
          <Button uppercase>Settings</Button>
        </main>
      </>
    </DefaultLayout>
  );
};

export default Home;
