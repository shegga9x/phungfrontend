"use client"

import Navbar from '@/components/navbar';
import CommonLayout from '@/components/v2/Layout';
import { useSubscribeToPushNotifications } from '@/lib/hooks/useSubscribeToPushNotifications';
import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect, useRef } from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure(false);
  const { subscribe, subscription } = useSubscribeToPushNotifications();
  const hasSubscribed = useRef(false);

  useEffect(() => {
    if (!subscription && !hasSubscribed.current) {
      subscribe();
      hasSubscribed.current = true;
    }
  }, [subscription]);
  return (
    <AppShell>
      <CommonLayout headerProps={{
        hideMenu: true,
      }}>
        <AppShell.Main>
          {children}
        </AppShell.Main>
      </CommonLayout>
    </AppShell>
  )
}
