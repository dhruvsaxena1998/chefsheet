import { useMemo } from "react";
import clsx from "clsx";
import Head from "next/head";
import Link from "next/link";
import { toast } from "react-toastify";

import DefaultLayout from "../../layouts/DefaultLayout";

import { useRefresh, useTranslation } from "@shared/hooks";
import { ClientService } from "@shared/services";
import { Table, SearchBar } from "@shared/components";

import { GetServerSideProps, NextPage } from "next";
import { IClient, IErrors, IMeta } from "@types";

interface ClientRow {
  id?: number;
  name: string;
  email: string;
  contact_number: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { page = 1 } = ctx.query;
    const { data } = await ClientService.find({
      pagination: {
        page,
      },
    });

    const { data: clients, meta } = data;

    return {
      props: { clients, meta },
    };
  } catch (e) {
    return { props: { clients: [], meta: {} } };
  }
};

const Clients: NextPage<{
  clients: IClient[];
  meta: IMeta;
  error?: IErrors;
}> = (props) => {
  const { refresh: refreshSsrProps, router } = useRefresh();
  const t = useTranslation();

  const rows: ClientRow[] = useMemo(
    () =>
      props.clients.map(({ id, name, contact_number, email }) => ({
        id,
        name,
        contact_number,
        email,
      })),
    [props.clients]
  );

  const columns = useMemo(
    () => [
      {
        Header: t.client.table.name,
        accessor: "name",
      },
      {
        Header: t.client.table.contact_number,
        accessor: "contact_number",
      },
      {
        Header: t.client.table.email,
        accessor: "email",
      },
    ],
    [t]
  );

  const handleOnDelete = async (row: ClientRow) => {
    await ClientService.remove(row.id!);
    refreshSsrProps();
    toast.success(t.client.messages.delete_success);
  };

  const handleOnEdit = (row: ClientRow) => {
    router.push(`/clients/${row.id}`);
  };

  const handlePaginate = (page: number) => {
    router.push(`/clients?page=${page}`);
  };

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>{t.client.titles.index}</title>
        </Head>

        <main className="mb-4">
          <SearchBar slug="clients" />

          <div className="divider"></div>
          <div className="flex justify-between items-center mb-4s">
            <div className="prose my-4">
              <h1>{t.client.headings.index}</h1>
            </div>
            <Link href="/clients/create" passHref>
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
              onEdit={(row: ClientRow) => handleOnEdit(row)}
              onDelete={(row: ClientRow) => handleOnDelete(row)}
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
                        {index + 1}
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

export default Clients;
