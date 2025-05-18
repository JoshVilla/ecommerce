"use client";
import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface PageState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

interface PaginationComponentProps {
  pageState: PageState;
  onChangePage: (page: number) => void;
  onChangeLimit: (limit: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  pageState,
  onChangePage,
  onChangeLimit,
}) => {
  const { currentPage, totalPages, itemsPerPage } = pageState;

  // Function to update the current page
  const handlePageChange = (newPage: number) => onChangePage(newPage);

  // Function to handle limit change
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeLimit(Number(e.target.value));
  };

  // Generate page numbers dynamically
  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {totalPages > 1 && (
          <Pagination className="flex">
            <ul className="flex flex-row items-center gap-1">
              {/* Previous Button */}
              <li className="list-none">
                <PaginationPrevious
                  size="sm"
                  href="#"
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  className={cn(
                    "gap-1 pl-2.5",
                    currentPage === 1 && "pointer-events-none opacity-50"
                  )}
                />
              </li>

              {/* Page Numbers */}
              {pageNumbers.map((num) => (
                <li key={num} className="list-none">
                  <PaginationLink
                    size="sm"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(num);
                    }}
                    isActive={currentPage === num}
                    className={cn(
                      "hover:bg-accent hover:text-accent-foreground",
                      currentPage === num && "bg-accent text-accent-foreground"
                    )}
                  >
                    {num}
                  </PaginationLink>
                </li>
              ))}

              {/* Next Button */}
              <li className="list-none">
                <PaginationNext
                  size="sm"
                  href="#"
                  onClick={() =>
                    handlePageChange(Math.min(currentPage + 1, totalPages))
                  }
                  className={cn(
                    "gap-1 pr-2.5",
                    currentPage === totalPages &&
                      "pointer-events-none opacity-50"
                  )}
                />
              </li>
            </ul>
          </Pagination>
        )}

        <select
          value={itemsPerPage}
          onChange={handleLimitChange}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>
      </div>
    </div>
  );
};

export default PaginationComponent;
