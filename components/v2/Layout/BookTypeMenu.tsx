import * as React from 'react';
import { useSnackbar } from 'notistack';

import { useRecoilState } from 'recoil';
import { bookTypeListState, homePageQueryState } from '@/atoms';
import clsx from 'clsx';

import { SORT_VALUE } from '@/const';
import { upperCaseEachWord } from '@/lib/utils';
import { fetchBookTypes } from '@/lib/http';

export default function BookTypeMenu() {
  const [loadingBookType, setLoadingBookType] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState(''); // Add search state

  const [bookTypeList, setBookTypeList] = useRecoilState(bookTypeListState);
  const [homePageQueryData, setHomePageQueryData] =
    useRecoilState(homePageQueryState);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    const func = async () => {
      setLoadingBookType(true);
      const res = await fetchBookTypes();
      const { error, content } = res;
      if (error) {
        setLoadingBookType(false);
        enqueueSnackbar(`Error: Fetch Book Types`, {
          variant: 'error',
        });
        return;
      }
      setBookTypeList(content);
      setLoadingBookType(false);
    };
    !bookTypeList.length && func();
  }, [bookTypeList.length, enqueueSnackbar, setBookTypeList]);

  const filteredBookTypes = searchQuery ?
    bookTypeList.filter((bookType) =>
      bookType.toLowerCase().includes(searchQuery.toLowerCase()))
    : bookTypeList;
  return (
    <>
      <ul
        tabIndex={0}
        className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
      >
        <li>
          <div className='menu-title'>Book Type</div>
          <input
            type="text"
            placeholder="Search book types..."
            className="input input-bordered w-full max-w-xs mr-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <ul>
              {filteredBookTypes.map((bookType) => (
                <li
                  key={bookType}
                  onClick={() => {
                    setHomePageQueryData({
                      ...homePageQueryData,
                      page: 0,
                      type: encodeURIComponent(bookType),
                    });
                  }}
                >
                  <span
                    className={clsx({
                      active: homePageQueryData.type === bookType,
                    })}
                  >
                    {bookType.replaceAll('_nbsp_', ' ').replaceAll('_amp_', '&')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </li>

        <li>
          <div className='menu-title'>Order by</div>
          <ul>
            {SORT_VALUE.map((sortType) => (
              <li
                key={sortType}
                onClick={() => {
                  setHomePageQueryData({
                    ...homePageQueryData,
                    page: 1,
                    sort: sortType,
                  });
                }}
              >
                <span
                  className={clsx({
                    active: homePageQueryData?.sort === sortType,
                  })}
                >
                  {upperCaseEachWord(sortType.replaceAll(`_`, ` `))}
                </span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  );
}
