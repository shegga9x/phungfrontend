"use client"

import * as React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import CommonLayout from '@/components/v2/Layout';
import ShoppingCartList from '@/components/v2/List/ShoppingCartList';
import { useAuthGuard } from '@/lib/auth/use-auth';
import { AvailableServices } from '@/components/v2/GHN/AvailableServices';
import { GHNAvailableServicesDTO } from '@/models/backend';

const Cart: NextPage = () => {
  const { user } = useAuthGuard({ middleware: "auth" });

  return (
    <>
      <Head>
        <title>Shopping Cart</title>
      </Head>
      <CommonLayout headerProps={{ hideMenu: true }}>
        <div className='flex justify-between items-center'>
          <h1 className='font-bold text-5xl'>Shopping Cart</h1>
          <AvailableServices />
        </div>
        <ShoppingCartList />
      </CommonLayout>
    </>
  );
};

export default Cart;
