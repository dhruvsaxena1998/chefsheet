import { PropsWithChildren, useEffect, useContext } from "react";

import { AppHeader, Sidebar } from "@shared/components";
import { useRouter } from "next/router";
import { client } from "@utils/axios";
import { UserContext } from "shared/hooks/useUser";
import { isClientSide } from "@utils/client-side-only";

export default function DefaultLayout({ children }: PropsWithChildren<{}>) {
  const router = useRouter();
  const { initUser } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        if (!isClientSide()) {
          return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
          router.replace("/login");
        }

        const { data } = await client.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        initUser!(data);
      } catch (e) {
        router.replace("/login");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
