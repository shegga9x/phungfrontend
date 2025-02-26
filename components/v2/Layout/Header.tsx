import * as React from 'react';
import NextLink from 'next/link';
import {
  Bars3Icon,
  ShoppingCartIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';
import BookTypeMenu from '@/components/v2/Layout/BookTypeMenu';
import { useRecoilState, useRecoilStateLoadable, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { calcCartItemSum } from '@/lib/utils';
import AdminNav from '@/components/admin-nav';
import ModeToggle from '@/components/ModeToggle';
import { UserNav } from '@/components/user-nav';
import { Button } from "@mantine/core";
import { useAuthGuard } from '@/lib/auth/use-auth';
import { cartSelector, getCartQuery } from '@/selectors';
import { cartState } from '@/atoms';

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  hideMenu?: boolean;
}

export default function Header({ className, ...props }: HeaderProps) {
  const { hideMenu } = props;
  const { user } = useAuthGuard({ middleware: "guest" });
  const fetchedCart = useRecoilValueLoadable(cartSelector); // Fetch default if null
  return (
    <>
      <div className='navbar bg-base-100 mx-auto max-w-7xl mt-4 shadow-xl rounded-box'>
        <div className='navbar-start'>
          {!hideMenu && (
            <div className='dropdown'>
              <label
                tabIndex={0}
                className='btn btn-ghost btn-circle content-center'
              >
                <Bars3Icon className='w-6 h-6' />
              </label>
              <BookTypeMenu />
            </div>
          )}
        </div>
        <div className='navbar-center'>

          <NextLink href='/' className='btn btn-ghost normal-case text-xl'>
            <BookOpenIcon className='w-6 h-6' />
            Bookstore
          </NextLink>
        </div>
        <div className='navbar-end'>
          <ModeToggle />
          <div className="flex gap-x-2 items-center ml-6">
            {!user ? (
              <NextLink href={"/auth/login"} >
                <Button variant={"ASD"}>Login</Button>
              </NextLink>
            ) : (
              <>
                {fetchedCart.state === 'hasValue' && fetchedCart.contents.length > 0 ? (
                  <NextLink href='/cart' className='btn btn-ghost btn-circle'>
                    <div className='indicator'>
                      <ShoppingCartIcon className='w-6 h-6' />
                      <span className='badge badge-sm indicator-item'>
                        {calcCartItemSum(fetchedCart.contents)}
                      </span>
                    </div>
                  </NextLink>
                ) : fetchedCart.state === 'loading' ? (
                  <div className='flex items-center justify-center mt-6'>
                    <span className='loading loading-bars loading-lg'></span>
                  </div>
                ) : (
                  <NextLink href='/cart' className='btn btn-ghost btn-circle'>
                    <div className='indicator'>
                      <ShoppingCartIcon className='w-6 h-6' />
                      <span className='badge badge-sm indicator-item'>
                        0
                      </span>
                    </div>
                  </NextLink>
                )}
              </>
            )}
            <AdminNav />
            {user && (
              <UserNav />
            )}
            {user?.authorities.includes("ROLE_PREVIOUS_ADMINISTRATOR") && (
              <a href={process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/impersonate/exit"}>
                <Button>Exit switch</Button>
              </a>

            )}

          </div>

        </div>
      </div >
    </>
  );
}
