'use client'
import * as React from 'react';
import BookReviewsSection from '@/components/v2/BookDetails/BookReviewsSection';
import CommonLayout from '@/components/v2/Layout';
import Head from 'next/head';
import type { NextPage } from 'next';
import { bookDetailsIdState } from '@/atoms';
import dynamic from 'next/dynamic';
import { useRecoilState } from 'recoil';
import { useParams } from "next/navigation";
import { Helmet } from 'react-helmet-async';
const BookInfoSection = dynamic(() => import('@/components/v2/BookDetails/BookInfoSection'), { ssr: false });
const Book: NextPage = () => {
  const params = useParams();
  const id = params.id;
  const [, setBookDetailsId] = useRecoilState(bookDetailsIdState);
  // const bookDetailsLodable = useRecoilValueLoadable(bookDetailsQuery);
  React.useEffect(() => {
    id && setBookDetailsId(id as string);
  }, [id, setBookDetailsId]);
  return (
    <>
      <CommonLayout
        headerProps={{
          hideMenu: true,
        }}
      >
        <BookInfoSection />
        <BookReviewsSection />
      </CommonLayout>
    </>
  );
};

export default Book;
