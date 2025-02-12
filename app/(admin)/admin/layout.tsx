"use client";

import Loading from "@/components/loading";
import PermissionGuard from "@/components/permission-guard";
import RoleGuard from "@/components/role-guard";
import CommonLayout from "@/components/v2/Layout";
import { useAuthGuard } from "@/lib/auth/use-auth";
import { Role } from "@/models/user/UserResponse";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthGuard({ middleware: "auth" });

  if (!user) return <Loading />;

  return (
    <AppShell>
      <CommonLayout headerProps={{
        hideMenu: true,
      }}>
        <AppShell.Main>
          <PermissionGuard rolesAllowed={[Role.ADMIN]}></PermissionGuard>
          <RoleGuard rolesAllowed={[Role.ADMIN]}>{children}</RoleGuard>
        </AppShell.Main>
      </CommonLayout>
    </AppShell>
  );
}
