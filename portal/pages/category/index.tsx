import { useMemo } from "react";
import clsx from "clsx";
import Head from "next/head";
import Link from "next/link";
import { toast } from "react-toastify";

import DefaultLayout from "../../layouts/DefaultLayout";

import { useRefresh, useTranslation } from "@shared/hooks";
import { CategoryService, SubCategoryService } from "@shared/services";
import { Table, SearchBar } from "@shared/components";

import { GetServerSideProps, NextPage } from "next";
import { ICategory, IErrors, IMeta } from "@types";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { page = 1 } = ctx.query;
    const { data } = await CategoryService.find({
      pagination: {
        page,
      },
    });

    const { data: categories, meta } = data;

    return {
      props: { categories, meta },
    };
  } catch (e) {
    return { props: { categories: [] } };
  }
};

const Category: NextPage<{
  categories: ICategory[];
  meta: IMeta;
  error?: IErrors;
}> = (props) => {
  const { refresh: refreshSsrProps, router } = useRefresh();
  const t = useTranslation();
  const rows: Array<ICategory> = useMemo(
    () =>
      props.categories.map(({ id, code, name }) => ({
        id,
        code,
        name,
      })),
    [props.categories]
  );

  const columns = useMemo(
    () => [
      {
        Header: t.table.name,
        accessor: "name",
      },
      {
        Header: t.table.code,
        accessor: "code",
      },
    ],
    [t]
  );

  const handleOnDelete = async (row: ICategory) => {
    await CategoryService.remove(row.id!);
    refreshSsrProps();
    toast.success(t.category.messages.delete_success);
  };

  const handleOnEdit = (row: ICategory) => {
    router.push(`/category/${row.id}`);
  };

  const handlePaginate = (page: number) => {
    router.push(`/category?page=${page}`);
  };

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>{t.category.titles.index}</title>
        </Head>

        <main className="mb-4">
          <SearchBar slug="sub-category" />

          <div className="divider"></div>
          <div className="flex justify-between items-center mb-4s">
            <div className="prose my-4">
              <h1>{t.category.headings.index}</h1>
            </div>
            <Link href="/category/create" passHref>
              <div className="btn btn-wide bg-indigo-500 text-white border-0">
                {t.buttons.create}
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
              onEdit={(row: ICategory) => handleOnEdit(row)}
              onDelete={(row: ICategory) => handleOnDelete(row)}
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

export default Category;
