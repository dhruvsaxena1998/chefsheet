import { PropsWithChildren } from "react";
import Header from "../shared/components/Header";
import Sidebar from "../shared/components/Sidebar";

export default function DefaultLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div>
      <Header title="Chefsheet" />
      <div className="flex gap-2 m-4">
        <Sidebar />
        <div className="m-4 w-full">{children}</div>
      </div>
    </div>
  );
}
