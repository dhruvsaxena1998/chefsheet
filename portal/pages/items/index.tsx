import { useMemo } from "react";
import clsx from "clsx";
import Head from "next/head";
import Link from "next/link";
import { toast } from "react-toastify";

import DefaultLayout from "../../layouts/DefaultLayout";

import { useRefresh } from "@shared/hooks";
import { ItemService } from "@shared/services";
import { Table, SearchBar } from "@shared/components";

import { GetServerSideProps, NextPage } from "next";
import { IErrors, IMeta, ISubCategory } from "@types";
import { Items } from "@types";

const columns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Expiry Date",
    accessor: "expiration_date",
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Sub-Category",
    accessor: "sub_category",
  },
];

interface SubCategoryRow {
  id?: number;
  name: string;
  description?: string;
  quantity: number;
  expiration_date?: string;
  category: string;
  sub_category: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { page = 1 } = ctx.query;
    const { data } = await ItemService.find({
      populate: ["category", "sub_category"],
      pagination: {
        page,
      },
    });
    const { data: items, meta } = data;

    return {
      props: { items, meta },
    };
  } catch (e) {
    return { props: { items: [] } };
  }
};

const Items: NextPage<{
  items: Items[];
  meta: IMeta;
  error?: IErrors;
}> = (props) => {
  const { refresh: refreshSsrProps, router } = useRefresh();
  const rows: SubCategoryRow[] = useMemo(
    () =>
      props.items.map(
        ({
          id,
          name,
          description,
          quantity,
          expiration_date,
          category,
          sub_category,
        }) => ({
          id,
          name,
          description,
          quantity,
          expiration_date: expiration_date || "N/A",
          category: category?.data?.name || "-",
          sub_category: sub_category?.data?.name || "-",
        })
      ),
    [props.items]
  );

  const handleOnDelete = async (row: SubCategoryRow) => {
    await ItemService.remove(row.id!);
    refreshSsrProps();
    toast.success("Item deleted successfully");
  };

  const handleOnEdit = (row: SubCategoryRow) => {
    router.push(`/items/${row.id}`);
  };

  const handlePaginate = (page: number) => {
    router.push(`/items?page=${page}`);
  };

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>Cheffsheet - Items</title>
        </Head>

        <main className="mb-4">
          <SearchBar slug="sub-category" />

          <div className="divider"></div>
          <div className="flex justify-between items-center mb-4s">
            <div className="prose my-4">
              <h1>Items</h1>
            </div>
            <Link href="/sub-category/create" passHref>
              <div className="btn btn-wide bg-indigo-500 text-white border-0">
                Create
              </div>
            </Link>
          </div>

          <div className="rounded-lg">
            <Table
              columns={columns}
              data={rows}
              index={true}
              classes={{
                table: "table w-full",
              }}
              actions={["edit", "delete"]}
              onEdit={(row: SubCategoryRow) => handleOnEdit(row)}
              onDelete={(row: SubCategoryRow) => handleOnDelete(row)}
            />
            <div className="flex justify-center">
              <div className="btn-group">
                {Array(props?.meta?.pagination?.pageCount || 0)
                  .fill(true)
                  .map((_, index) => {
                    return (
                      <div
                        className={clsx([
                          "btn btn-sm",
                          {
                            "btn-active":
                              index + 1 === props?.meta?.pagination?.page,
                          },
                        ])}
                        key={index}
                        onClick={() => {
                          if (index + 1 !== props.meta.pagination.page)
                            handlePaginate(index + 1);
                        }}
                      >
                        1
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </main>
      </>
    </DefaultLayout>
  );
};

export default Items;
