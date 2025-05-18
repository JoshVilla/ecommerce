import { IPagination } from "@/utils/types";
import { useCallback, useState } from "react";

interface PaginationProps {
  initialItemsPerPage: number;
}

export const usePagination = ({ initialItemsPerPage }: PaginationProps) => {
  const [pageState, setPageState] = useState<IPagination>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: initialItemsPerPage,
  });

  const handleResetPage = useCallback(() => {
    setPageState({
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: initialItemsPerPage,
    });
  }, [initialItemsPerPage]);

  const handlePageStateChange = useCallback((page: number) => {
    setPageState((prev) => ({
      ...prev,
      currentPage: page,
    }));
  }, []);

  const handleSetInitialPage = useCallback((pagination: IPagination) => {
    setPageState((prev) => ({
      ...prev,
      ...pagination,
    }));
  }, []);

  return {
    handleResetPage,
    handlePageStateChange,
    handleSetInitialPage,
    pageState,
  };
};
