"use client";

import * as React from 'react';

import { homePageBookSumState, homePageQueryState } from '@/atoms';

import CommonLayout from '@/components/v2/Layout';
import { FilteredChips } from '@/components/v2/Chips/FilteredChips';
import Head from 'next/head';
import type { NextPage } from 'next';
import { PAGE_SIZE } from '@/const';
import Pagination from '@/components/v2/Pagination';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useRecoilState } from 'recoil';
import { Helmet } from 'react-helmet-async';

const BookList = dynamic(() => import('@/components/v2/Cards/ShoppingItemCardList'), { ssr: false });

const Home: NextPage = () => {
  const [homePageQueryData, setHomePageQueryData] =
    useRecoilState(homePageQueryState);
  const [homePageBookSum] = useRecoilState(homePageBookSumState);

  const handleClickPagination = (page: number) => {
    setHomePageQueryData({ ...homePageQueryData, page: page });
  };

  return (
    <>
      <CommonLayout headerProps={{ title: 'Your Shopping Cart' }}>
        {(homePageQueryData.sort || homePageQueryData.type) && (
          <FilteredChips
            data={homePageQueryData}
            onChange={setHomePageQueryData}
          />
        )}
        <Suspense fallback={<div>Loading...</div>}>
          <BookList page={homePageQueryData?.page || 1} pageSize={PAGE_SIZE} />
        </Suspense>
        <div className='flex justify-center pt-6'>
          <Pagination
            currentPage={homePageQueryData?.page || 1}
            totalPages={Math.ceil(homePageBookSum / PAGE_SIZE)}
            onClick={handleClickPagination}
          />
        </div>
      </CommonLayout>

    </>
  );
};

export default Home;
