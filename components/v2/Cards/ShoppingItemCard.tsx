import * as React from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { VariantType, useSnackbar } from 'notistack';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { shoppingCartState } from '@/atoms';
import { useRecoilState } from 'recoil';

import { BookProps } from '@/const';
import { currencyFormat } from '@/lib/utils';
import HalfRating from '@/components/v2/Rating/HalfRating';
import { useAuthGuard } from '@/lib/auth/use-auth';

export default function ShoopingItemCard(props: BookProps) {
  const { user } = useAuthGuard({ middleware: "guest" });

  const {
    id,
    title,
    type,
    price,
    averageRating,
    authors,
    ratings,
    stock,
  } = props;
  const [shoppingCart, setShoppingCart] = useRecoilState(shoppingCartState);
  const { enqueueSnackbar } = useSnackbar();
  const addItem = () => {

    if (user) {
      setShoppingCart((oldShoppingCart) => {
        const existingItem = oldShoppingCart.find((i) => i.id === id);
        if (existingItem) {
          if (existingItem.quantity >= stock) {
            enqueueSnackbar(`Out of stock!`, { variant: 'error' });
            return [...oldShoppingCart];
          }
          const newItem = {
            ...existingItem,
            quantity: existingItem.quantity + 1,
          };
          enqueueSnackbar(`"${title}" was successfully added.`, {
            variant: 'success',
          });
          return [...oldShoppingCart.filter((i) => i.id !== id), newItem];
        }
        enqueueSnackbar(`"${title}" was successfully added.`, {
          variant: 'success',
        });
        return [
          ...oldShoppingCart,
          {
            ...props,
            quantity: 1,
          },
        ];
      });
    } else {
      enqueueSnackbar(`You need to login to add this item to your cart !`, { variant: 'error' });
    }
  };

  return (
    <div className='card card-compact w-96 bg-base-100 shadow-xl'>
      <figure>
        <Image
          src={`https://picsum.photos/seed/${id}/384/140`}
          alt={title}
          width={384}
          height={140}
        />
      </figure>
      <div className='card-body'>
        <div className='text-sm text-slate-500'>
          {' '}
          {type.replaceAll(`_nbsp_`, ` `).replaceAll(`_amp_`, `&`)}
        </div>
        <h2 className='card-title'>{title}</h2>
        <p className='font-medium text-slate-500'>
          {authors.map((author) => author).join(`, `)}
        </p>
        <HalfRating rating={averageRating} disabled />
        <div className='card-actions justify-end'>
          <button className='btn' onClick={addItem}>
            ${currencyFormat(price)}
            <ShoppingCartIcon className='h-6 w-6' />
          </button>
          <NextLink href={`/book/${id}`} className='btn btn-info'>
            View Details
          </NextLink>
        </div>
      </div>
    </div>
  );
}
