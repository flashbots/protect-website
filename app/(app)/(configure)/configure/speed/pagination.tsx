import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToPage: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  goToPage,
}) => {
  return (
    <div className="flex justify-center space-x-1 -mt-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          aria-label={`Go to page ${pageNumber}`}
          onClick={() => goToPage(pageNumber)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              goToPage(pageNumber);
            }
          }}
          className="w-3 h-5 inline-flex items-center cursor-pointer"
        >
          <div
            className={`w-3 h-1 rounded-lg ${
              currentPage === pageNumber ? 'bg-black' : 'bg-black bg-opacity-30'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default Pagination;
