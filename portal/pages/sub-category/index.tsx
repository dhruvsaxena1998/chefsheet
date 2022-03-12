import { useMemo } from "react";
import Head from "next/head";
import Link from "next/link";

import { IErrors, IMeta, ISubCategory } from "@types";
import { GetServerSideProps, NextPage } from "next";

import DefaultLayout from "../../layouts/DefaultLayout";
import { Table, SearchBar } from "@shared/components";
import { SubCategoryService } from "@shared/services";

const columns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Code",
    accessor: "code",
  },
  {
    Header: "Category",
    accessor: "category",
  },
];

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { data } = await SubCategoryService.find({
      populate: ["category"],
    });

    const { data: subCategories, meta } = data;

    return {
      props: { subCategories, meta },
    };
  } catch (e) {
    return { props: { subCategories: [] } };
  }
};

const SubCategory: NextPage<{
  subCategories: ISubCategory[];
  meta: IMeta;
  error?: IErrors;
}> = (props) => {
  const rows = useMemo(
    () =>
      props.subCategories.map(({ id, code, name, category }) => ({
        id,
        code,
        name,
        category: category?.data?.name || "",
      })),
    [props.subCategories]
  );

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>Cheffsheet - Sub Categories</title>
        </Head>

        <main className="mb-4">
          <SearchBar slug="sub-category" />

          <div className="divider"></div>

          <div className="prose my-4">
            <h1>Sub - Categories</h1>
          </div>

          <div className="overflow-x-auto bg-base-300 rounded-lg">
            <Table
              columns={columns}
              data={rows}
              classes={{
                table: "table w-full",
              }}
              actions={["edit"]}
              onEdit={(row) => {
                console.log({ row });
                // router.push(`/sub-category/${id}`);
              }}
            />
          </div>

          <div className="flex justify-end">
            <Link href="/sub-category/create" passHref>
              <div className="btn btn-wide bg-indigo-500 my-4">Create</div>
            </Link>
          </div>
        </main>
      </>
    </DefaultLayout>
  );
};

export default SubCategory;
