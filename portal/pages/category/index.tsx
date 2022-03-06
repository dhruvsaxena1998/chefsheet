import { useMemo } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useTable } from "react-table";

import DefaultLayout from "../../layouts/DefaultLayout";
import SearchBar from "../../shared/components/SearchBar";
import Table from "../../shared/components/Table";

const data = [
  {
    id: 1,
    name: "Reusable",
    code: "reusable",
  },
  {
    id: 2,
    name: "Plastic",
    code: "plastic",
  },
  {
    id: 3,
    name: "Metal",
    code: "metal",
  },
];

const columns = [
  {
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Code",
    accessor: "code",
  },
];

const Category: NextPage = () => {
  return (
    <DefaultLayout>
      <>
        <Head>
          <title>Cheffsheet - Categories</title>
        </Head>

        <main className="mb-4">
          <SearchBar slug="category" />

          <div className="divider"></div>

          <div className="prose my-4">
            <h1>Categories</h1>
          </div>

          <div className="overflow-x-auto bg-base-300 rounded-lg">
            <Table
              columns={columns}
              data={data}
              classes={{
                table: "table w-full",
              }}
            />
          </div>

          <div className="flex justify-end">
            <div className="btn btn-wide bg-indigo-500 my-4">
              <Link href="/category/create" passHref>
                Create
              </Link>
            </div>
          </div>
        </main>
      </>
    </DefaultLayout>
  );
};

export default Category;
