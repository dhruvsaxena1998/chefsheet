import { useMemo } from "react";
import clsx from "clsx";
import Head from "next/head";
import Link from "next/link";
import { toast } from "react-toastify";

import DefaultLayout from "../../layouts/DefaultLayout";

import { useRefresh, useTranslation } from "@shared/hooks";
import { SubCategoryService, UserService } from "@shared/services";
import { Table, SearchBar } from "@shared/components";

import { GetServerSideProps, NextPage } from "next";
import { IErrors, IMeta, IUser } from "@types";

interface UsersRow {
  id?: number;
  name: string;
  role: string;
  contact_number: string;
  profile_image?: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { data: users } = await UserService.find({
      populate: ["profile_image", "role"],
    });

    return {
      props: { users, meta: {} },
    };
  } catch (e) {
    return { props: { users: [], meta: {} } };
  }
};

const Users: NextPage<{
  users: IUser[];
  meta: IMeta;
  error?: IErrors;
}> = (props) => {
  const { refresh: refreshSsrProps, router } = useRefresh();
  const t = useTranslation();

  const rows: UsersRow[] = useMemo(
    () =>
      props.users.map(({ id, name, contact_number, role }) => ({
        id,
        name,
        contact_number,
        role: role.name,
      })),
    [props.users]
  );

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "profile_image",
      },
      {
        Header: t.users.table.name,
        accessor: "name",
      },
      {
        Header: t.users.table.contact_number,
        accessor: "contact_number",
      },
      {
        Header: t.users.table.role,
        accessor: "role",
        capitalize: true,
      },
    ],
    [t]
  );

  const handleOnDelete = async (row: UsersRow) => {
    await UserService.remove(row.id!);
    refreshSsrProps();
    toast.success(t.users.messages.delete_success);
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
          <title>{t.users.titles.index}</title>
        </Head>

        <main className="mb-4">
          <SearchBar slug="sub-category" />

          <div className="divider"></div>
          <div className="flex justify-between items-center mb-4s">
            <div className="prose my-4">
              <h1>{t.users.headings.index}</h1>
            </div>
            <Link href="/users/create" passHref>
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
              onEdit={(row: UsersRow) => handleOnEdit(row)}
              onDelete={(row: UsersRow) => handleOnDelete(row)}
            />
          </div>
        </main>
      </>
    </DefaultLayout>
  );
};

export default Users;
