import { AppShell, Navbar, Header } from "@mantine/core";
import { PropsWithChildren } from "react";

import AppHeader from "../shared/components/Header";

export default function DefaultLayout({ children }: PropsWithChildren<{}>) {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} padding="xs">
          <div>NavBar</div>
        </Navbar>
      }
      header={
        <Header height={50} padding="xs">
          <AppHeader title="chefsheet" />
        </Header>
      }
      styles={(theme) => {
        return {
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }
      }}
    >
      {children}
    </AppShell>
  );
}
