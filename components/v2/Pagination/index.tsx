import * as React from 'react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onClick?: (page: number) => void;
}

export default function Pagination(props: PaginationProps) {
  const { currentPage, totalPages, onClick } = props;

  const getPages = () => {
    let pages = [];
    if (totalPages <= 5) {
      pages = [...Array(totalPages)].map((_, i) => i + 1);
    } else {
      if (currentPage < 3) {
        pages = [1, 2, 3, "...", totalPages];
      } else if (currentPage > totalPages - 2) {
        pages = [1, "...", totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
      }
    }
    return pages;
  };
  return (
    <div className='join'>

      <button className={`join-item btn btn-sm`} onClick={() => onClick && onClick(currentPage - 1)} disabled={currentPage === 1 || totalPages === 0}>
        Prev
      </button>

      {getPages().map((page, i) =>
        page === "..." ? (
          <span key={i}> ... </span>
        ) : (
          <button className={`join-item btn btn-sm `} key={i} onClick={() =>
            onClick && typeof page === 'number' && onClick(page)}
            disabled={currentPage === page}>
            {page}
          </button>
        ))}
      <button onClick={() => onClick && onClick(currentPage + 1)} className={`join-item btn btn-sm`}
        disabled={currentPage === totalPages || totalPages === 0}>
        Next
      </button>

    </div>

  );
}
