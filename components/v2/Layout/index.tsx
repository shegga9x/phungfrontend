import * as React from 'react';
import NextLink from 'next/link';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

import Header, { HeaderProps } from '@/components/v2/Layout/Header';
import { AppShell, Burger } from '@mantine/core';
import { Group } from 'lucide-react';
import Navbar from '@/components/navbar';

export interface CommonLayoutProps {
  children?: any;
  headerProps?: HeaderProps;
}

export default function CommonLayout(props: CommonLayoutProps) {
  const { headerProps, children } = props;

  return (
    <>
      <AppShell>
          <Header {...headerProps} />
        <AppShell.Main>
          <div className='mx-auto max-w-7xl py-6 px-4'>
            {children}
          </div>
        </AppShell.Main>
      </AppShell>

    </>
  );
}
