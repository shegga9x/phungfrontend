import * as React from 'react';
import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from 'recoil';

import ShoopingItemCard from '@/components/v2/Cards/ShoppingItemCard';
import { homePageBookSumState, homePageQueryState } from '@/atoms';
import { homePageQuery } from '@/selectors';
import { bookSearch, bookSearchDTO } from '@/lib/http';

export interface BookListProps {
  page: number;
  pageSize: number;
}


export default function BookList(props: BookListProps) {
  const { page, pageSize } = props;

  const bookListLoadable = useRecoilValueLoadable(homePageQuery);
  const setHomePageQuery = useSetRecoilState(homePageQueryState);

  const [homePageBookSum, setHomePageBookSum] = useRecoilState(homePageBookSumState);
  const [filtered, setFiltered] = React.useState<string[]>([]);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const [debouncedTerm, setDebouncedTerm] = React.useState("");

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedTerm(searchTerm); // Update state after delay
    }, 300); // 500ms delay after user stops typing
    return () => clearTimeout(delayDebounceFn); // Cleanup timeout on new keystroke
  }, [searchTerm]);

  React.useEffect(() => {
    if (debouncedTerm) {
      setLoading(true);
      setSearchTerm(debouncedTerm);
      if (debouncedTerm.length > 0) {
        bookSearch(debouncedTerm).then((res) => {
          setFiltered(Array.from(new Set(res.content ?? [])));
          setShowDropdown(true);
          setLoading(false);
        }).catch(() => setLoading(false));
      } else {
        setFiltered([]);
        setShowDropdown(false);
      }
    }
  }, [debouncedTerm]);

  const handleSelect = (value: string) => {
    setSearchTerm(value);
    setFiltered([]);
    setShowDropdown(false);
    setHomePageQuery((prev) => ({
      ...prev,
      page: 1,
      title: value,
      type: ''
    }));
  };

  switch (bookListLoadable.state) {
    case 'hasValue':
      setHomePageBookSum(bookListLoadable.contents.total);
      return (
        <>
          {!!homePageBookSum && (
            <div className='text-sm text-gray-500 pb-4 flex justify-between items-center'>
              {`${pageSize * (page - 1) + 1} ~ ${pageSize * page > homePageBookSum ? homePageBookSum : pageSize * page} of over ${homePageBookSum} results`}
              <div className='relative w-64'>
                <input
                  type='text'
                  placeholder='Search...'
                  className='input input-bordered input-lg w-full pr-10' // Extra padding to fit icon
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSelect(searchTerm);
                    }
                  }}
                />
                {/* Loading spinner inside input */}
                {loading && (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <span className="loading loading-spinner loading-md text-gray-500"></span>
                  </span>
                )}

                {showDropdown && filtered.length > 0 && (
                  <ul className='absolute left-0 w-full bg-gray-800 text-white border-gray-300 rounded mt-1 shadow-lg z-10 max-h-60 overflow-y-auto'>
                    {filtered.map((item, index) => (
                      <li
                        key={index}
                        className="p-2 hover:bg-gray-600 cursor-pointer"
                        onClick={() => handleSelect(item)}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

            </div>
          )}

          <div className='grid grid-cols-1 gap-x-2 gap-y-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8'>
            {bookListLoadable.contents?.content?.map((book) => (
              <ShoopingItemCard key={book.id} {...book} />
            ))}
          </div>
        </>
      );
    case 'loading':
      return (
        <div className='flex items-center justify-center'>
          <span className='loading loading-bars loading-lg'></span>
        </div>
      );
    case 'hasError':
      throw bookListLoadable.contents;
  }
}
