import { PropsWithChildren } from "react";

import { AppHeader, Sidebar } from "@shared/components";

export default function DefaultLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div>
      <AppHeader title="Chefsheet" />
      <div className="flex gap-2 m-4">
        <Sidebar />
        <div className="m-4 w-full">{children}</div>
      </div>
    </div>
  );
}
