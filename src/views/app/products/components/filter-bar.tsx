import { useEffect, useMemo, useState } from "react";

import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useDebounce } from "@/hooks/common";

interface FilterBarProps {
  maxPageSize: number;
  onSearch: (searchTerm: string) => void;
  onPageSizeChange: (pageSize: number) => void;
  currentPageSize: number;
  currentSearch: string;
}

export const FilterBar = ({
  maxPageSize,
  onSearch,
  onPageSizeChange,
  currentPageSize,
  currentSearch,
}: FilterBarProps) => {
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
    <div className="flex flex-col items-center gap-y-7 sm:flex-row p-5 rounded-2xl mx-5 sm:justify-start sm:gap-x-12">
      <Label htmlFor="search">
        Buscar:
        <Input
          id="search"
          className="justify-start w-fit mx-2"
          placeholder="Buscar productos..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
      </Label>
      <Label htmlFor="productsPerPage">
        Productos por página:{" "}
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
  );
};
