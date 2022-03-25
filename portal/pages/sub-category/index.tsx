import { useMemo } from "react";
import clsx from "clsx";
import Head from "next/head";
import Link from "next/link";
import { toast } from "react-toastify";

import DefaultLayout from "../../layouts/DefaultLayout";

import { useRefresh, useTranslation } from "@shared/hooks";
import { SubCategoryService } from "@shared/services";
import { Table, SearchBar } from "@shared/components";

import { GetServerSideProps, NextPage } from "next";
import { IErrors, IMeta, ISubCategory } from "@types";

interface SubCategoryRow {
  id?: number;
  name: string;
  code: string;
  category: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { page = 1 } = ctx.query;
    const { data } = await SubCategoryService.find({
      populate: ["category"],
      pagination: {
        page,
      },
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
  const { refresh: refreshSsrProps, router } = useRefresh();
  const t = useTranslation();

  const rows: SubCategoryRow[] = useMemo(
    () =>
      props.subCategories.map(({ id, code, name, category }) => ({
        id,
        code,
        name,
        category: category?.data?.name || "",
      })),
    [props.subCategories]
  );

  const handleOnDelete = async (row: SubCategoryRow) => {
    await SubCategoryService.remove(row.id!);
    refreshSsrProps();
    toast.success(t.sub_category.messages.delete_success);
  };

  const handleOnEdit = (row: SubCategoryRow) => {
    router.push(`/sub-category/${row.id}`);
  };

  const handlePaginate = (page: number) => {
    router.push(`/sub-category?page=${page}`);
  };

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
      {
        Header: t.sub_category.table.category,
        accessor: "category",
      },
    ],
    [t]
  );

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>{t.sub_category.titles.index}</title>
        </Head>

        <main className="mb-4">
          <SearchBar slug="sub-category" />

          <div className="divider"></div>
          <div className="flex justify-between items-center mb-4s">
            <div className="prose my-4">
              <h1>{t.sub_category.headings.index}</h1>
            </div>
            <Link href="/sub-category/create" passHref>
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

export default SubCategory;
