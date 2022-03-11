import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import DefaultLayout from "../../layouts/DefaultLayout";
import Loader from "../../shared/components/Loader";
import SearchBar from "../../shared/components/SearchBar";
import Table from "../../shared/components/Table";

const columns = [
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
  },
];

const data = [
  {
    id: 1,
    name: "John Doe",
    contact_number: "09123456789",
    role: "Staff",
  },
  {
    id: 2,
    name: "Jane Doe",
    contact_number: "09123456789",
    role: "Staff",
  },
  {
    id: 3,
    name: "John Reese",
    contact_number: "09123456789",
    role: "Manager",
  },
];

const Staff: NextPage = () => {
  const router = useRouter();

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>Cheffsheet - Staff Members</title>
        </Head>

        <main className="mb-4">
          <SearchBar slug="staff" />

          <div className="divider"></div>

          <div className="prose my-4">
            <h1>Staff Members</h1>
          </div>
          <div className="overflow-x-auto bg-base-300 rounded-lg">
            <Table
              columns={columns}
              data={data}
              classes={{
                table: "table w-full",
              }}
              actions={["edit", "delete"]}
              onEdit={(id) => {
                router.push(`/staff/${id}`);
              }}
              onDelete={(id) => {}}
            />
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

export default Staff;
