// components/Pagination.tsx
import React, { useState } from 'react';

interface PaginationProps {
  data: any[]; // Replace 'any' with the actual type of your data
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ data, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages: number = Math.ceil(data.length / itemsPerPage);

  const handleClick = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers: JSX.Element[] = [];
    const displayPages = 5; // Adjust this based on how many pages you want to display
  
    if (totalPages <= displayPages) {
      // Display all pages if there are fewer pages than the limit
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderPageButton(i));
      }
    } else {
      // Display a subset of pages with ellipses for larger page counts
      const leftEllipsis: React.JSX.Element | null =
        currentPage > 2 ? <div>...</div> : null;
      const rightEllipsis: React.JSX.Element | null =
        currentPage < totalPages - 1 ? <div>...</div> : null;
  
      let startPage = Math.max(1, currentPage - Math.floor(displayPages / 2));
      let endPage = Math.min(totalPages, startPage + displayPages - 1);
  
      if (endPage - startPage + 1 < displayPages) {
        // Adjust the start and end pages if the display range is not met
        startPage = Math.max(1, endPage - displayPages + 1);
      }
  
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(renderPageButton(i));
      }
  
      if (leftEllipsis) {
        pageNumbers.unshift(leftEllipsis);
      }
      if (rightEllipsis) {
        pageNumbers.push(rightEllipsis);
      }
    }
  
    return pageNumbers;
  };

  const renderPageButton = (pageNumber: number) => (
    <div key={pageNumber} className={`flex items-center mx-1 ${pageNumber === currentPage ? 'text-indigo-600 font-bold text-lg' : 'font-light text-xs'}`}>
      <button onClick={() => handleClick(pageNumber)}>{pageNumber}</button>
    </div>
  );

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      onPageChange(currentPage + 1);
    }
  };

  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentItems: any[] = data.slice(indexOfFirstItem, indexOfLastItem); // Replace 'any' with the actual type of your data

  return (
    <div>
      {/* Display your current items here */}
      {currentItems.map((item, index) => (
        <div key={index} className="w-full flex flex-row items-center">
          <p className="flex-1">{item.userDetail.name}</p>
          {
            item.stages.map((child: any, i: number) => (
              <p key={i} className="flex-1">{child.stage} - {child.EventStageStatus}</p>
            ))
          }
        </div>
      ))}

      {/* Pagination */}
      <div className="flex flex-row justify-between w-full">
        <div>
          <button onClick={handlePrevClick}>Prev</button>
        </div>
        <div className="flex flex-row">
          {renderPageNumbers()}
        </div>
        <div>
          <button onClick={handleNextClick}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
