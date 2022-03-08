import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { useMutation, useQuery } from "react-query";

import DefaultLayout from "../../layouts/DefaultLayout";
import Loader from "../../shared/components/Loader";
import SearchBar from "../../shared/components/SearchBar";
import Table from "../../shared/components/Table";

import { deleteCategory, getCategories } from "../../shared/services/category";

const columns = [
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
  const query = useQuery("categories", getCategories, {
    cacheTime: 0,
  });

  const deleteMutation = useMutation((id: string) => deleteCategory(id), {
    onSuccess: () => query.refetch(),
  });

  const router = useRouter();

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
          {deleteMutation.isError && (
            <div
              className="alert alert-error text-white font-bold my-4"
              onClick={() => deleteMutation.reset()}
            >
              Error while deleting, Please make sure no sub-categories are
              attached to this category.
            </div>
          )}

          <div className="overflow-x-auto bg-base-300 rounded-lg">
            {query.isLoading ? (
              <Loader />
            ) : (
              <Table
                columns={columns}
                data={query.data?.data || []}
                classes={{
                  table: "table w-full",
                }}
                actions={["edit", "delete"]}
                onEdit={(id) => {
                  router.push(`/category/${id}`);
                }}
                onDelete={(id) => {
                  deleteMutation.mutate(id);
                }}
              />
            )}
          </div>

          <div className="flex justify-end">
            <Link href="/category/create" passHref>
              <div className="btn btn-wide bg-indigo-500 my-4">Create</div>
            </Link>
          </div>
        </main>
      </>
    </DefaultLayout>
  );
};

export default Category;
