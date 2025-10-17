import { MouseEvent } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui";

interface AdminProductsPaginationProps {
  currentPage: number;
  totalPages: number;
  pageNumbers: (number | string)[];
  onPreviousPage: (e: MouseEvent<HTMLAnchorElement>) => void;
  onNextPage: (e: MouseEvent<HTMLAnchorElement>) => void;
  onPageClick: (e: MouseEvent<HTMLAnchorElement>, pageNum: number) => void;
}

export const AdminProductsPagination = ({
  currentPage,
  totalPages,
  pageNumbers,
  onPreviousPage,
  onNextPage,
  onPageClick,
}: AdminProductsPaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination className="p-3 mb-3">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={onPreviousPage}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {pageNumbers.map((pageNum, index) => (
          <PaginationItem key={index}>
            {pageNum === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                onClick={e => onPageClick(e, pageNum as number)}
                isActive={currentPage === pageNum}
              >
                {pageNum}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={onNextPage}
            className={
              currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
