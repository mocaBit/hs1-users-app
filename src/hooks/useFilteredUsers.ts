import { useState, useMemo } from 'react';
import { useUsers, UseUsersReturn, UseUsersOptions } from './useUsers';
import { User } from '../types/User';

type FilterFunction = (user: User) => boolean;

interface UseFilteredUsersReturn extends UseUsersReturn {
  filteredData: User[];
  hasActiveFilter: boolean;
  applyFilter: (filterFn: FilterFunction) => void;
  clearFilter: () => void;
}

export const useFilteredUsers = (options?: UseUsersOptions): UseFilteredUsersReturn => {
  const { data, isLoading, isError } = useUsers(options);
  const [filterFunction, setFilterFunction] = useState<FilterFunction | null>(null);

  const filteredData = useMemo(() => {
    if (!filterFunction || !data) {
      return data ?? [];
    }
    return data.filter(filterFunction);
  }, [data, filterFunction]);

  const applyFilter = (filterFn: FilterFunction) => {
    setFilterFunction(() => filterFn);
  };

  const clearFilter = () => {
    setFilterFunction(null);
  };

  const hasActiveFilter = filterFunction !== null;

  return {
    data,
    filteredData,
    isLoading,
    isError,
    hasActiveFilter,
    applyFilter,
    clearFilter,
  };
};
