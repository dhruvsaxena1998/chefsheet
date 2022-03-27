import type { NextPage } from "next";
import Head from "next/head";

import DefaultLayout from "../layouts/DefaultLayout";
import { SearchBar } from "@shared/components";
import { useTranslation } from "@shared/hooks";

const Home: NextPage = () => {
  const t = useTranslation();

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>{t.chefsheet}</title>
        </Head>

        <main>
          <div className={"mb-4"}>
            <SearchBar />
          </div>

          <div className="flex flex-col w-full lg:flex-row">
            <div className="grid flex-grow min-h-32 card bg-base-300 p-4 rounded-box place-items-start">
              <section className={"prose"}>
                <h1>Events Today</h1>
                <p>Here are events for today.</p>

                <ul>
                  <li>Momento</li>
                  <li>Royal Enchanto</li>
                  <li>Meeting mania</li>
                </ul>
              </section>
            </div>
            <div className="divider lg:divider-horizontal" />
            <div className="grid flex-grow min-h-32 card bg-base-300 p-4 rounded-box place-items-start">
              <section className={"prose"}>
                <h1>Available Staff</h1>
                <p>There are no events for today.</p>
              </section>
            </div>
            <div className="divider lg:divider-horizontal" />
            <div className="grid flex-grow min-h-32 card bg-base-300 p-4 rounded-box place-items-start">
              <section className={"prose"}>
                <h1>Upcoming events</h1>
                <p>Here are your upcoming events</p>

                <ul>
                  <li>Party pies [04, May 2022]</li>
                  <li>Some Event [08, May 2022]</li>
                  <li>Party pies [12, May 2022]</li>
                </ul>
              </section>
            </div>
          </div>
        </main>
      </>
    </DefaultLayout>
  );
};

export default Home;
