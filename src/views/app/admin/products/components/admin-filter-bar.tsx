"use client";

import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
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
  const debouncedSearch = useDebounce(searchInput, 500);

  const pageSizeOptions = useMemo(() => {
    const baseOptions = [5, 10, 20, 50, 100];
    return baseOptions.filter(option => option <= maxPageSize);
  }, [maxPageSize]);

  useEffect(() => {
    if (debouncedSearch !== currentSearch) {
      onSearch(debouncedSearch);
    }
  }, [debouncedSearch, onSearch, currentSearch]);

  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  const handlePageSizeChange = (value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      onPageSizeChange(numValue);
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
          <Select
            value={currentPageSize.toString()}
            onValueChange={handlePageSizeChange}
            disabled={maxPageSize === 0 || pageSizeOptions.length === 0}
          >
            <SelectTrigger className="w-24" id="productsPerPage">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map(option => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
