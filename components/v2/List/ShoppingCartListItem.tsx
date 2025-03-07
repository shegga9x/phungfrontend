import * as React from 'react';
import Image from 'next/image';
import { useSnackbar } from 'notistack';
import { PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { currentCartUpdateItemStage, currentUserState, gHNAvailableServicesSelectedState, refrshAble } from '@/atoms';
import { shoppingCartItemProps } from '@/const';
import { currencyFormat, calcCartItemTotalPrice } from '@/lib/utils';
import { buyBook, deleteCartItem, getShippingFee, getVNPayUrl, updateCart } from '@/lib/http';
import { cartSelector, getAvailableServicesQuery } from '@/selectors';
import { CartItemDTO, OrdersResponseDTO } from '@/models/backend';
import Loading from '@/components/loading';
import { useRouter } from "next/navigation";

export default function ShoppingCartListItem(props: shoppingCartItemProps) {
  const { id, title, authors, type, price, averageRating, quantity, stock, publishedAt, shippingFee, urlImg } = props;
  const [loading, setLoading] = React.useState(false);
  const [loadingStage, setLoadingStage] = React.useState(false);
  const [gHNAvailableServicesSelected] = useRecoilState(gHNAvailableServicesSelectedState);
  const [currentUser] = useRecoilState(currentUserState);
  const [shoppingCart, setShoppingCart] = useRecoilState(cartSelector);
  const [currentComponentID, setCurrentComponentID] = useRecoilState(currentCartUpdateItemStage);
  const gHNAvailableServicesDTOs = useRecoilValueLoadable(getAvailableServicesQuery);
  const { enqueueSnackbar } = useSnackbar();
  const setRefrshAble = useSetRecoilState(refrshAble);
  React.useEffect(() => {
    if (shoppingCart && currentComponentID === props.id) {
      setRefrshAble(true);
      updateCart1(shoppingCart);

    }
    setCurrentComponentID("")
  }, [currentComponentID]);
  const updateCart1 = async (updatedCart: shoppingCartItemProps[]) => {
    setLoadingStage(true)
    const cartItemDTOs: CartItemDTO[] = updatedCart.map((item: shoppingCartItemProps) => {
      return {
        userId: currentUser?.id ?? 0,
        bookId: Number(item.id),
        quantity: item.quantity,
        createdAt: new Date(),
      };
    });
    updateCart(cartItemDTOs).then(() => {
      setLoadingStage(false);
    })
      .catch(() => setLoadingStage(false));
  }
  function handleAddQty() {
    setCurrentComponentID(props.id);
    setShoppingCart((oldShoppingCart) => {
      return oldShoppingCart.reduce<shoppingCartItemProps[]>((prev, item) => {
        if (item.id === id) { prev.push({ ...item, quantity: quantity + 1, shippingFee: null }); }
        else { prev.push(item); }
        return prev;
      }, []);
    });
  }
  function handleRemoveQty() {
    setCurrentComponentID(props.id);
    setShoppingCart((oldShoppingCart) => {
      return oldShoppingCart.reduce<shoppingCartItemProps[]>((prev, item) => {
        if (item.id === id) { prev.push({ ...item, quantity: quantity - 1, shippingFee: null }); }
        else { prev.push(item); }
        return prev;
      }, []);
    });
  }
  async function deleteItem() {
    setLoadingStage(true)
    await deleteCartItem(props.id, currentUser?.id + "")
      .then(() => setLoadingStage(false))
      .catch(() => setLoadingStage(false));
    setShoppingCart((oldShoppingCart) => {
      return [...oldShoppingCart.filter((i) => i.id !== id)];
    });

  }
  async function getShippingFeeOnclick() {
    if (!gHNAvailableServicesDTOs.contents?.content) {
      enqueueSnackbar("Please update your location", { variant: "error" });
    } else
      if (!gHNAvailableServicesSelected) {
        enqueueSnackbar(`Error: Please select available shipping services.`, { variant: 'error' });
      } else {
        setLoadingStage(true);
        try {
          const shippingFee = await getShippingFee(currentUser?.id + "", gHNAvailableServicesSelected, id).then(
            (response) => { return (Number(response.content) / 25000) });
          setShoppingCart((oldShoppingCart) => {
            return oldShoppingCart.reduce<shoppingCartItemProps[]>((prev, item) => {
              if (item.id === id) { prev.push({ ...item, shippingFee: shippingFee, }); }
              else { prev.push(item); }
              return prev;
            }, []);
          });
        } catch (error) {
          enqueueSnackbar(`Error: Please update your location.`, { variant: 'error' });
        }
        setLoadingStage(false);


      }
  }
  async function handleBuyClick() {
    setLoading(true);
    const response = await buyBook({ bookId: Number(id), userId: Number(currentUser?.id), serviceId: Number(gHNAvailableServicesSelected) });
    const ordersResponseDTO: OrdersResponseDTO | undefined = response.content;
    if (ordersResponseDTO?.status != 200) {
      enqueueSnackbar(ordersResponseDTO?.message, { variant: 'error' });
    } else {
      setShoppingCart((oldShoppingCart) => {
        return oldShoppingCart.filter((i) => i.id !== id);
      });
      enqueueSnackbar("Buy success", { variant: 'success' });
    }
    setLoading(false);


  };
  if (loadingStage) { return <Loading /> }
  return (
    <>
      <div className='card card-side bg-base-100 shadow-xl'>
        <figure>
          <Image
            src={`${urlImg}`}
            alt={title}
            width={150}
            height={225}
            unoptimized
          />
        </figure>
        <div className='card-body'>
          <div className='flex flex-col gap-1'>
            <p>
              <span className='text-lg font-bold pr-4'>Title:</span>
              {title}
            </p>
            <p>
              <span className='text-lg font-bold pr-4'>Type:</span>
              {type.replaceAll(`_nbsp_`, ` `).replaceAll(`_amp_`, `&`)}
            </p>
            <p>
              <span className='text-lg font-bold pr-4'>Publication date:</span>
              {new Date(publishedAt).toLocaleDateString()}
            </p>
            <p>
              <span className='text-lg font-bold pr-4'>Price:</span>
              {`$ ${currencyFormat(price)}`}
              <span className='text-lg font-bold pr-4 ml-60'>Shipping fee:</span>
              {shippingFee ? `$ ${currencyFormat(shippingFee)}` : 'Plaese get shipping fee'}
            </p>
            <p>
              <span className='text-lg font-bold pr-4'>In stock:</span>
              {stock}
            </p>
            <div className='flex justify-between'>
              <div className='join'>
                <button
                  className='btn btn-sm join-item'
                  disabled={quantity >= stock}
                  onClick={handleAddQty}
                >
                  <PlusIcon className='stroke-current shrink-0 w-6 h-6' />
                </button>
                <input
                  className='input input-sm input-bordered join-item w-12'
                  value={quantity}
                  disabled
                />
                <button
                  className='btn btn-sm join-item'
                  disabled={quantity <= 1}
                  onClick={handleRemoveQty}
                >
                  <MinusIcon className='stroke-current shrink-0 w-6 h-6' />
                </button>
              </div>
              <div className='flex justify-end gap-4'>
                <div className='font-bold'>
                  <span className='pr-1'>
                    {quantity === 1
                      ? `(${quantity} item) $`
                      : `(${quantity} items) $`}
                  </span>
                  {calcCartItemTotalPrice([props])}
                </div>
              </div>
            </div>
            <div className='flex justify-end gap-4'>
              <button className='btn btn-sm btn-error' onClick={deleteItem}>
                <TrashIcon className='stroke-current shrink-0 w-6 h-6' />
                Delete
              </button>
              <button
                className='btn btn-sm btn-info'
                onClick={() => {
                  if (shippingFee) { handleBuyClick(); }
                  else { getShippingFeeOnclick() }
                }}
                disabled={loading}
              >
                {loading && <span className='loading loading-spinner' />}
                {shippingFee ? `Proceed to Purchase` : 'Get shipping fee'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
