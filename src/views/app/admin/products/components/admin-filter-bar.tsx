"use client";

import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button, Input, Label } from "@/components/ui";
import { useDebounce } from "@/hooks/common";

interface AdminFilterBarProps {
  maxPageSize: number;
  onSearch: (searchTerm: string) => void;
  onPageSizeChange: (pageSize: number) => void;
  currentPageSize: number;
  currentSearch: string;
}

export const AdminFilterBar = ({
  maxPageSize,
  onSearch,
  onPageSizeChange,
  currentPageSize,
  currentSearch,
}: AdminFilterBarProps) => {
  const [searchInput, setSearchInput] = useState(currentSearch);
  const [pageSizeInput, setPageSizeInput] = useState(
    currentPageSize.toString()
  );

  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    if (debouncedSearch !== currentSearch) {
      onSearch(debouncedSearch);
    }
  }, [debouncedSearch, onSearch, currentSearch]);

  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  useEffect(() => {
    setPageSizeInput(currentPageSize.toString());
  }, [currentPageSize]);

  const handlePageSizeChange = (value: string) => {
    setPageSizeInput(value);
    const numValue = parseInt(value);

    if (!isNaN(numValue) && numValue >= 1 && numValue <= maxPageSize) {
      onPageSizeChange(numValue);
    }
  };

  const handlePageSizeBlur = () => {
    const numValue = parseInt(pageSizeInput);

    if (isNaN(numValue) || numValue < 1) {
      setPageSizeInput("1");
      onPageSizeChange(1);
    } else if (numValue > maxPageSize) {
      setPageSizeInput(maxPageSize.toString());
      onPageSizeChange(maxPageSize);
    }
  };

  return (
    <div className="flex flex-col gap-y-6 sm:flex-row sm:items-end sm:justify-between p-5 rounded-2xl mx-5 bg-white shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        <Label
          htmlFor="search"
          className="flex flex-col sm:flex-row items-center gap-2"
        >
          Buscar:
          <Input
            id="search"
            className="w-56"
            placeholder="Buscar productos..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
        </Label>

        <Label
          htmlFor="productsPerPage"
          className="flex flex-col sm:flex-row items-center gap-2"
        >
          Productos por página:
          <Input
            id="productsPerPage"
            type="number"
            min={1}
            max={maxPageSize}
            value={pageSizeInput}
            onChange={e => handlePageSizeChange(e.target.value)}
            onBlur={handlePageSizeBlur}
            disabled={maxPageSize === 0}
            className="w-20"
          />
        </Label>
      </div>

      <Link href="/admin/new-product" className="w-full sm:w-auto">
        <Button className="w-full sm:w-auto flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white cursor-pointer">
          <PlusCircle className="w-5 h-5" />
          Crear producto
        </Button>
      </Link>
    </div>
  );
};
