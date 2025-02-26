import * as React from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { useSnackbar } from 'notistack';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useRecoilCallback, useRecoilState, useRecoilStateLoadable } from 'recoil';

import { BookProps, shoppingCartItemProps } from '@/const';
import { currencyFormat } from '@/lib/utils';
import HalfRating from '@/components/v2/Rating/HalfRating';
import { useAuthGuard } from '@/lib/auth/use-auth';
import { cartSelector } from '@/selectors';
import { updateCart } from '@/lib/http';
import { CartItemDTO } from '@/models/backend';

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
  const [shoppingCart, setShoppingCart] = useRecoilState(cartSelector);
  const [loadingStage, setLoadingStage] = React.useState(false);
  const updateCart1 = async (updatedCart: shoppingCartItemProps[]) => {
    const cartItemDTOs: CartItemDTO[] = updatedCart.map((item: shoppingCartItemProps) => {
      return {
        userId: user?.id ?? 0,
        bookId: Number(item.id),
        quantity: item.quantity,
        createdAt: new Date(),
      };
    });
    updateCart(cartItemDTOs).then(() => setLoadingStage(false))
      .catch(() => setLoadingStage(false));
  }
  React.useEffect(() => {
    const scrollY = sessionStorage.getItem("scrollPosition");
    if (loadingStage) { // set loading stage agian cause there is no await for error setShoppingCart
      setLoadingStage(false)
    }
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY));
    }
  }, [loadingStage]);


  const { enqueueSnackbar } = useSnackbar();

  const addItem = () => {
    sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    setLoadingStage(true)
    if (user) {
      if (stock === 0) {
        enqueueSnackbar(`Out of stock!`, { variant: 'error' });
        return;
      }
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
            shippingFee: null
          };
          enqueueSnackbar(`"${title}" was successfully added.`, {
            variant: 'success',
          });
          updateCart1([...oldShoppingCart.filter((i) => i.id !== id), newItem]);
          return [...oldShoppingCart.filter((i) => i.id !== id), newItem];
        }
        enqueueSnackbar(`"${title}" was successfully added.`, {
          variant: 'success',
        });
        updateCart1([...oldShoppingCart, { ...props, quantity: 1 }]);
        return [
          ...oldShoppingCart,
          {
            ...props,
            quantity: 1,
            shippingFee: null
          },
        ];
      });
    } else {
      setLoadingStage(false)
      enqueueSnackbar(`You need to login to add this item to your cart !`, { variant: 'error' });
    }
  };

  return (
    <div className='card card-compact w-96 bg-base-100 shadow-xl'>
      <figure>
        <Image
          src={`https://itbook.store/img/books/${id}.png`}
          alt={title}
          width={384}
          height={70}
          unoptimized
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
          {loadingStage ? <>
            <div className='flex items-center justify-center mt-6'>
              <span className='loading loading-bars loading-lg'></span>
            </div>
          </> : <button className='btn' onClick={addItem}>
            {stock === 0 ? 'Out of stock' : `$${currencyFormat(price)}`}
            <ShoppingCartIcon className='h-6 w-6' />
          </button>}
          <NextLink href={`/book/${id}`} className='btn btn-info'>
            View Details
          </NextLink>
        </div>
      </div>
    </div>
  );
}
