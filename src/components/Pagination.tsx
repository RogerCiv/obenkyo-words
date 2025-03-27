import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const renderPaginationButtons = () => {
    const buttons = [];
    const visiblePages = 2; 
    const halfVisiblePages = Math.floor(visiblePages / 2);
  
    let startPage = Math.max(1, currentPage - halfVisiblePages);
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }
  
    if (startPage > 1) {
      buttons.push(
        <button
          key="first"
          className="join-item btn"
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <button
            key="first-ellipsis"
            className="join-item btn btn-disabled"
          >
            ...
          </button>
        );
      }
    }
  
    // Botones centrales
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          className={`join-item btn ${currentPage === page ? 'btn-active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      );
    }
  
    // Botones de la última página
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <button
            key="last-ellipsis"
            className="join-item btn btn-disabled"
          >
            ...
          </button>
        );
      }
      buttons.push(
        <button
          key="last"
          className="join-item btn"
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }
  
    return buttons;
  };

  return (
    <div className="join mt-4 flex justify-center">
      {renderPaginationButtons()}
    </div>
  );
}
