import * as React from 'react';
import { useSnackbar } from 'notistack';
import { Books, BooksDTO } from '@/models/backend';
import _ from "lodash";
import { BookDetailProps, BookType } from '@/const';
import { currencyFormat, checkIsValidInteger } from '@/lib/utils';
import { updateBookDetails } from '@/lib/http';
import { useRecoilState } from 'recoil';
import { currentUserState } from '@/atoms';
import { Role } from '@/models/user/UserResponse';

export interface BookInfoDialogProps {
  data: BooksDTO;
  id: string;
  onSuccess: (bookDTO: BooksDTO) => void;
}

const BookInfoDialog = React.forwardRef(
  (props: BookInfoDialogProps, ref: any) => {

    const [auth] = useRecoilState(currentUserState);
    const { data, id, onSuccess } = props;
    const [bookDTO, setBookDTO] = React.useState<BooksDTO>(data);
    const [isUpdating, setIsUpdating] = React.useState<boolean>(false);
    const [validByID, setValidByID] = React.useState<String[]>([]);
    const [priceBase, setPriceBase] = React.useState("$" + data.price);
    const { enqueueSnackbar } = useSnackbar();
    const handleUpdateDTO = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      const id = e.target.id;
      isStockValid(value, id);
    };
    const setDynamicProperty = (key: string, value: any) => {
      return { [key]: value };
    };
    const isSameDate = (date1: Date, date2: Date): boolean => {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    };
    const isStockValid = (value: string, id: string) => {
      let bookDTORef = bookDTO as BooksDTO;
      let validByIDRef = validByID as String[];
      validByIDRef = validByIDRef.filter(name => name !== id);
      let newResponse = { ...bookDTORef, ...setDynamicProperty(id, value) };
      switch (id) {
        case 'id':
          break;
        case 'title':
          bookDTORef = newResponse;
          break;
        case 'type':
          bookDTORef = newResponse;
          break;
        case 'publishedAt':
          newResponse = { ...bookDTORef, ...setDynamicProperty(id, new Date(value)) };

          bookDTORef = newResponse;
          break;
        case 'stock':
          try {
            if (checkIsValidInteger(value)) {
              newResponse = { ...bookDTORef, ...setDynamicProperty(id, parseInt(value)) };
              bookDTORef = newResponse;
            } else {
              validByIDRef.push(id);
              throw new Error('Invalid value');
            }
          } catch (error) { }
          break;
        case 'price':
          setPriceBase(`$${value.replace(/[^0-9.]/g, "")}`);
          newResponse = { ...bookDTORef, ...setDynamicProperty(id, Number(value.replace(/[^0-9.]/g, ""))) };
          bookDTORef = newResponse;
          break;
      }
      setBookDTO(bookDTORef);
      setValidByID(validByIDRef);


    };
    const handleUpdate = async (event: any) => {
      event.preventDefault();
      setIsUpdating(true);
      if (!bookDTO) {
        enqueueSnackbar(`Error: Book details are not valid.`, {
          variant: 'error',
        });
        return;
      }
      const res = await updateBookDetails(bookDTO);
      if (res.error) {
        enqueueSnackbar(`Error: Update book details.`, {
          variant: 'error',
        });
        setIsUpdating(false);
        return;
      }
      enqueueSnackbar(`Book details was updated.`, {
        variant: 'success',
      });
      onSuccess(bookDTO);
      setIsUpdating(false);

      ref?.current?.close();
    };

    return (
      <dialog id={id} className='modal' ref={ref}>
        <form method='dialog' className='modal-box'>
          <h3 className='font-bold text-lg'>Edit Book Details</h3>
          <div className='form-control w-full max-w-xs'>
            <label className='label'>
              <span className='label-text'>Book Type</span>
            </label>
            <select id="type"
              className='input input-sm input-bordered w-full max-w-xs'
              onChange={handleUpdateDTO}
              disabled={auth?.role !== Role.ADMIN}>
              {Object.values(BookType).map((type) => (
                <option key={type} value={type} selected={type === data.type}>
                  {type}
                </option>
              ))}
            </select>
            {validByID?.find(name => name === "type") && (
              <label className='label'>
                <span className='label-text-alt text-xs text-error'>
                  Invalid stock value
                </span>
              </label>
            )}
          </div>
          <div className='form-control w-full max-w-xs'>
            <label className='label'>
              <span className='label-text'>Book Title</span>
            </label>
            <input
              id="title"
              type='text'
              className='input input-sm input-bordered w-full max-w-xs'
              defaultValue={data.title}
              onChange={handleUpdateDTO}
              disabled={auth?.role !== Role.ADMIN}
            />
            {validByID?.find(name => name === "title") && (
              <label className='label'>
                <span className='label-text-alt text-xs text-error'>
                  Invalid stock value
                </span>
              </label>
            )}
          </div>
          <div className='form-control w-full max-w-xs'>
            <label className='label'>
              <span className='label-text'>Publication Date</span>
            </label>
            <input
              id="publishedAt"
              type='date'
              className='input input-sm input-bordered w-full max-w-xs'
              defaultValue={new Date(data.publishedAt).toISOString().split('T')[0]}
              onChange={handleUpdateDTO}
              disabled={auth?.role !== Role.ADMIN}
            />
            {validByID?.find(name => name === "publishedAt") && (
              <label className='label'>
                <span className='label-text-alt text-xs text-error'>
                  Invalid stock value
                </span>
              </label>
            )}
          </div>
          <div className='form-control w-full max-w-xs'>
            <label className='label'>
              <span className='label-text'>Price</span>
            </label>

            <input
              id="price"
              type='text'
              className='input input-sm input-bordered w-full max-w-xs'
              value={priceBase}
              onChange={handleUpdateDTO}
              disabled={auth?.role !== Role.ADMIN}
            />
            {validByID?.find(name => name === "price") && (
              <label className='label'>
                <span className='label-text-alt text-xs text-error'>
                  Invalid stock value
                </span>
              </label>
            )}
          </div>
          <div className='form-control w-full max-w-xs'>
            <label className='label'>
              <span className='label-text'>Stock</span>
            </label>
            <input
              id="stock"
              type='text'
              className='input input-sm input-bordered w-full max-w-xs'
              defaultValue={data.stock}
              onChange={handleUpdateDTO}
              disabled={auth?.role !== Role.ADMIN} />
            {validByID?.find(name => name === "stock") && (
              <label className='label'>
                <span className='label-text-alt text-xs text-error'>
                  Invalid stock value
                </span>
              </label>
            )}
          </div>
          <div className='modal-action'>
            {/* if there is a button in form, it will close the modal */}
            <button className='btn'>Cancel</button>
            <button
              className='btn btn-info'
              disabled={validByID?.length != 0 || isUpdating || _.isEqual(bookDTO, data)}
              onClick={handleUpdate} >
              {isUpdating && <span className='loading loading-spinner' />}
              Update{_.isEqual(bookDTO, data)}
            </button>
          </div>
        </form>
      </dialog>
    );
  }
);

BookInfoDialog.displayName = 'BookInfoDialog';

export default BookInfoDialog;
