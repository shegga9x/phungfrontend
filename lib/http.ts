import { shoppingCartItemProps } from './../const/index';
import axios from 'axios';
import { BookProps, BookRatingsProps } from '@/const';
import { Books, BooksDTO, BooksResponseDTO, CartItemDTO, GHNAvailableServicesDTO, OrderRequest, OrdersResponseDTO, ShippingInfoDTO, VNPayRequest } from '@/models/backend';

export async function fetchBooks(data: {
  page?: number;
  size?: number;
  type?: string;
  sort?: string;
  title?: string;
}): Promise<{ content: BookProps[]; total: number; error?: any }> {
  try {
    const queryArray = Object.keys(data).reduce((prev: string[], item) => {
      const value = data[item as keyof typeof data];
      if (value) {
        prev.push(`${item}=${value}`);
      }
      return prev;
    }, []);
    const response = await axios.get(`/api/books?${queryArray.join(`&`)}`);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return { error, content: [], total: 0 };
  }
}

export async function fetchBookTypes(): Promise<{
  content: string[];
  error?: any;
}> {
  try {
    const response = await axios.get(`/api/books/types`);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data as string[] };
  } catch (error) {
    console.error(error);
    return { error, content: [] };
  }
}

export async function fetchBookDetailsById(id: string): Promise<{
  content: BooksDTO;
  error?: any;
}> {
  try {
    const response = await axios.get(`/api/books/${id}`);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }

    return { content: response.data.content as BooksDTO };
  } catch (error) {
    console.error(error);
    return { error, content: {} as BooksDTO };
  }
}

export async function fetchBookRatingsById(id: string): Promise<{
  content: { content: BookRatingsProps[]; total: number };
  error?: any;
}> {
  try {
    const response = await axios.get(`/api/books/${id}/ratings`);

    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error, content: { content: [], total: 0 } };
  }
}

export async function updateBookDetails(
  book: BooksDTO
): Promise<{
  content?: { data: Books; message: string };
  error?: any;
}> {
  try {
    const response = await axios.put(`/api/books/` + book.id, book);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function addRatingByBookID(
  bookID: string,
  params: {
    score: number;
    userId: number;
  }
): Promise<{
  content?: { data: Omit<BookRatingsProps, 'user'>; message: string };
  error?: any;
}> {
  try {

    const response = await axios.post(`/api/books/${bookID}/ratings`, params);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data.error}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function deleteRating(
  bookID: string,
  userID: string
): Promise<{
  content?: { message: string };
  error?: any;
}> {
  try {
    const response = await axios.delete(
      `/api/books/${bookID}/ratings?userId=${userID}`
    );
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error };
  }
}
export async function buyBook(orderRequest: OrderRequest)
  : Promise<{ content?: OrdersResponseDTO; error?: any; }> {
  try {
    const response = await axios.post(`/api/order`, orderRequest);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return {
      error
    };
  }
}

export async function fetchAddressList
  (type: string, addressId: number): Promise<{
    content?: [];
    error?: any;
  }> {
  try {
    let query = "province";
    switch (type) {
      case "district":
        query = "district?addressId=" + addressId;
        break;
      case "ward":
        query = "ward?addressId=" + addressId;
        break;
      default:
        break;
    }
    const response = await axios.get(`/api/ghn/address/` + query);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data.data };
  } catch (error) {
    console.error(error);
    return { error };
  }


}


export async function addShippingInfo(
  shippingInfoDTO: ShippingInfoDTO,
): Promise<{
  content?: { message: string };
  error?: any;
}> {
  const response = await axios.post(`/api/shippingInfo`, shippingInfoDTO).then((res) => {
    return res;
  })
    .catch((e) => {
      return e.response;
    });

  if (response.status == 200) {
    return { content: { message: response.data.message } };
  } else {
    return { error: { message: response.data.message } };
  }
}

export async function fetchShippingInfo
  (userId: number | undefined): Promise<{
    content?: ShippingInfoDTO[];
    error?: any;
  }> {
  try {
    const response = (await axios.get(`/api/shippingInfo?userId=` + userId));
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data.content };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function getAvailableServices
  (userId: number | undefined): Promise<{
    content?: GHNAvailableServicesDTO[];
    error?: any;
  }> {
  try {
    const response = (await axios.get(`/api/ghn/available-services?user_id=` + userId));
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data.data };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function getCart
  (userId: number | undefined): Promise<{
    content?: shoppingCartItemProps[];
    error?: any;
  }> {
  try {
    const response = (await axios.get(`/api/cart?user_id=` + userId));

    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data.content };
  } catch (error) {
    return { error };
  }
}

export async function updateCart
  (cartItemDTOs: CartItemDTO[]): Promise<{
    content?: CartItemDTO[];
    error?: any;
  }> {
  try {
    const response = await axios.post(`/api/cart`, cartItemDTOs);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data.data };
  } catch (error) {
    return { error };
  }
}
export async function deleteCartItem
  (bookId: String, userId: String): Promise<{
    content?: String;
    error?: any;
  }> {
  try {
    const response = await axios.delete(`/api/cart?bookId=` + bookId + `&userId=` + userId);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data.data };
  } catch (error) {
    return { error };
  }
}

export async function getShippingFee
  (userId: String,
    gHNAvailableServicesSelected: number,
    bookId: String | null)
  : Promise<{ content?: String; error?: any; }> {
  try {
    const response = await axios.get(`/api/ghn/fee?userId=` + userId + `&service_id=` + gHNAvailableServicesSelected + `&bookId=` + bookId);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data.data.total };
  } catch (error) {
    return { error };
  }
}

export async function getVNPayUrl(
  userID: number | undefined,
  amount: number | null,
): Promise<{
  content?: { message: string };
  error?: any;
}> {
  try {
    const response = await axios.post(`/api/vnp?`, { userId: userID, amount: amount });
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data.content };
  } catch (error) {
    console.error(error);
    return { error, content: { message: 'Failed to get pay url' } };
  }
}

export async function bookSearch(
  title: String
): Promise<{
  content?: string[];
  error?: any;
}> {
  try {
    const response = await axios.get(`/api/books/search?title=` + title);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data.content };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function bookSearchDTO(
  title: String
): Promise<{
  content?: BooksResponseDTO;
  error?: any;
}> {
  try {
    const response = await axios.post(`/api/books/search?title=` + title);
    console.log(response);

    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data.content };
  } catch (error) {
    console.error(error);
    return { error };
  }
}