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

interface OrdersPaginationProps {
  currentPage: number;
  totalPages: number;
  pageNumbers: (number | string)[];
  onPreviousPage: (e: MouseEvent<HTMLAnchorElement>) => void;
  onNextPage: (e: MouseEvent<HTMLAnchorElement>) => void;
  onPageClick: (e: MouseEvent<HTMLAnchorElement>, page: number) => void;
}

export function OrdersPagination({
  currentPage,
  totalPages,
  pageNumbers,
  onPreviousPage,
  onNextPage,
  onPageClick,
}: OrdersPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={onPreviousPage}
            aria-disabled={currentPage === 1}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
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
                isActive={pageNum === currentPage}
                className="cursor-pointer"
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
            aria-disabled={currentPage === totalPages}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
