import * as React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { calcCartItemSum, calcCartItemTotalPrice } from '@/lib/utils';
import ShoppingCartListItem from '@/components/v2/List/ShoppingCartListItem';
import { cartSelector, getAvailableServicesQuery } from '@/selectors';
import { shoppingCartItemProps } from '@/const';
import { buyBook, getShippingFee } from '@/lib/http';
import { cartState, currentUserState, gHNAvailableServicesSelectedState } from '@/atoms';
import { enqueueSnackbar } from 'notistack';
import { OrdersResponseDTO } from '@/models/backend';

export default function ShoppingCartList() {
  const shoppingCart = useRecoilValueLoadable(cartSelector); // Fetch default if null
  const [currentUser] = useRecoilState(currentUserState);

  if (shoppingCart.state === "loading") return <p>Loading...</p>;
  if (shoppingCart.state === "hasError") return <p>Error loading data</p>;

  return (
    <div className='flex flex-col gap-4 py-4'>
      {shoppingCart.contents.map((cartItem: shoppingCartItemProps) => (
        <ShoppingCartListItem key={cartItem.id} {...cartItem} />
      ))}
      {!!shoppingCart.contents.length && (
        <SubTotal
          shoppingCart={shoppingCart.contents}
          currentUserId={currentUser?.id + ""}
        />
      )}
      {!shoppingCart.contents.length && <EmptyCartAlert />}
    </div>
  );
}
const EmptyCartAlert = () => {
  return (
    <>
      <div className='alert alert-info'>
        <InformationCircleIcon className='stroke-current shrink-0 w-6 h-6' />
        <span>Your shopping cart is empty.</span>
      </div>
    </>
  );
};
const SubTotal = (props: { shoppingCart: shoppingCartItemProps[], currentUserId: String }) => {
  const sum = calcCartItemSum(props.shoppingCart)
  const price = calcCartItemTotalPrice(props.shoppingCart)
  const [shippingFeeTotal, setShippingFeeTotal] = React.useState<number | null>(null);
  const [gHNAvailableServicesSelected] = useRecoilState(gHNAvailableServicesSelectedState);
  const gHNAvailableServicesDTOs = useRecoilValueLoadable(getAvailableServicesQuery);
  const setCartState = useSetRecoilState(cartState);

  async function handleTotalButton() {
    if (shippingFeeTotal != null) {
      const response = await buyBook({ bookId: null, userId: Number(props.currentUserId), serviceId: Number(gHNAvailableServicesSelected) });
      const ordersResponseDTO: OrdersResponseDTO | undefined = response.content;
      console.log(ordersResponseDTO);
      if (ordersResponseDTO?.status != 200) {
        enqueueSnackbar(ordersResponseDTO?.message, { variant: 'error' });
      } else {
        enqueueSnackbar("Buy success", { variant: 'success' });
        setCartState([])
      }
    }
    if (!gHNAvailableServicesDTOs.contents?.content) {
      enqueueSnackbar("Please update your location", { variant: "error" });
    } else
      if (!gHNAvailableServicesSelected)
        enqueueSnackbar("Please select available shipping services", { variant: "error" });
      else {
        try {
          getShippingFee(props.currentUserId, gHNAvailableServicesSelected ?? 0, null).then((res) => {
            setShippingFeeTotal(res.content ? Number((Number(res.content) / 25000).toFixed(2)) : 0);
          });
        } catch (error) {
          enqueueSnackbar("Please update your location", { variant: "error" });
        }
      }

  }
  return (
    <div>
      <div className='flex flex-row-reverse items-end gap-4'>
        <p className='font-bold'>
          <span className='pr-1'>
            {sum === 1
              ? `Subtotal: (${sum} item) $`
              : `Subtotal: (${sum} items) $`}
          </span>
          {price}
        </p>
        <p className='font-bold'>
          <span className='pr-1'>
            {shippingFeeTotal ? 'Shipping fee total $' : 'Plaese get shipping fee'}
          </span>
          {shippingFeeTotal}
        </p>
      </div>
      <div className='h-4'></div>
      <div className='flex flex-row-reverse items-end gap-4'>
        <button className='btn btn-sm btn-info' onClick={() => {
          handleTotalButton()
        }}>
          {shippingFeeTotal ? 'Purchase All' : ' Get shipping fee'}
        </button>
        <p className='font-bold'>
          <span className='pr-1'>
            Total $
          </span>
          {(shippingFeeTotal ?? 0) + price}
        </p>
      </div>
    </div>
  );
};
