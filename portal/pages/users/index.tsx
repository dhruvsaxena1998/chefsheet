import { useMemo } from "react";
import clsx from "clsx";
import Head from "next/head";
import Link from "next/link";
import { toast } from "react-toastify";

import DefaultLayout from "../../layouts/DefaultLayout";

import { useRefresh } from "@shared/hooks";
import { SubCategoryService, UserService } from "@shared/services";
import { Table, SearchBar } from "@shared/components";

import { GetServerSideProps, NextPage } from "next";
import { IErrors, IMeta, IUser } from "@types";

const columns = [
  {
    Header: "",
    accessor: "profile_image",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Contact Number",
    accessor: "contact_number",
  },
  {
    Header: "Role",
    accessor: "role",
    capitalize: true,
  },
];

interface UsersRow {
  id?: number;
  name: string;
  role: string;
  contact_number: string;
  profile_image?: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { page = 1 } = ctx.query;
    const { data } = await UserService.find({
      populate: ["profile_image"],
      pagination: {
        page,
      },
    });

    const { data: users, meta } = data;

    return {
      props: { users, meta },
    };
  } catch (e) {
    return { props: { subCategories: [] } };
  }
};

const Users: NextPage<{
  users: IUser[];
  meta: IMeta;
  error?: IErrors;
}> = (props) => {
  const { refresh: refreshSsrProps, router } = useRefresh();
  const rows: UsersRow[] = useMemo(
    () =>
      props.users.map(({ id, name, contact_number, role }) => ({
        id,
        name,
        contact_number,
        role,
      })),
    [props.users]
  );

  const handleOnDelete = async (row: UsersRow) => {
    await SubCategoryService.remove(row.id!);
    refreshSsrProps();
    toast.success("User deleted successfully");
  };

  const handleOnEdit = (row: UsersRow) => {
    router.push(`/users/${row.id}`);
  };

  const handlePaginate = (page: number) => {
    router.push(`/users?page=${page}`);
  };

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>Cheffsheet - Sub Categories</title>
        </Head>

        <main className="mb-4">
          <SearchBar slug="sub-category" />

          <div className="divider"></div>
          <div className="flex justify-between items-center mb-4s">
            <div className="prose my-4">
              <h1>Users</h1>
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
              onEdit={(row: UsersRow) => handleOnEdit(row)}
              onDelete={(row: UsersRow) => handleOnDelete(row)}
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

export default Users;
