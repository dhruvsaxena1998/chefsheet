import { useMemo } from "react";
import clsx from "clsx";
import Head from "next/head";
import Link from "next/link";
import { toast } from "react-toastify";

import DefaultLayout from "../../layouts/DefaultLayout";

import { useRefresh, useTranslation } from "@shared/hooks";
import { StaffMemberService } from "@shared/services";
import { Table, SearchBar } from "@shared/components";

import { GetServerSideProps, NextPage } from "next";
import { IErrors, IMeta, IStaffMember } from "@types";

interface StaffMembersRow {
  id?: number;
  name: string;
  role: string;
  contact_number: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { page = 1 } = ctx.query;
    const { data } = await StaffMemberService.find({
      pagination: {
        page,
      },
    });

    const { data: staffMembers, meta } = data;

    return {
      props: { staffMembers, meta },
    };
  } catch (e) {
    return { props: { staffMembers: [], meta: {} } };
  }
};

const StaffMembers: NextPage<{
  staffMembers: IStaffMember[];
  meta: IMeta;
  error?: IErrors;
}> = (props) => {
  const { refresh: refreshSsrProps, router } = useRefresh();
  const t = useTranslation();

  const rows: StaffMembersRow[] = useMemo(
    () =>
      props.staffMembers.map(({ id, name, contact_number, role }) => ({
        id,
        name,
        contact_number,
        role,
      })),
    [props.staffMembers]
  );

  const columns = useMemo(
    () => [
      {
        Header: t.staff_members.table.name,
        accessor: "name",
      },
      {
        Header: t.staff_members.table.contact_number,
        accessor: "contact_number",
      },
      {
        Header: t.staff_members.table.role,
        accessor: "role",
        capitalize: true,
      },
    ],
    [t]
  );

  const handleOnDelete = async (row: StaffMembersRow) => {
    await StaffMemberService.remove(row.id!);
    refreshSsrProps();
    toast.success(t.staff_members.messages.delete_success);
  };

  const handleOnEdit = (row: StaffMembersRow) => {
    router.push(`/staff-members/${row.id}`);
  };

  const handlePaginate = (page: number) => {
    router.push(`/staff-members?page=${page}`);
  };

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>{t.staff_members.titles.index}</title>
        </Head>

        <main className="mb-4">
          <SearchBar slug="staff-members" />

          <div className="divider"></div>
          <div className="flex justify-between items-center mb-4s">
            <div className="prose my-4">
              <h1>{t.staff_members.headings.index}</h1>
            </div>
            <Link href="/staff-members/create" passHref>
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
              onEdit={(row: StaffMembersRow) => handleOnEdit(row)}
              onDelete={(row: StaffMembersRow) => handleOnDelete(row)}
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

export default StaffMembers;
