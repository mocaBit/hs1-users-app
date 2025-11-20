import { useState, useEffect } from 'react';
import { User } from '../types/User';

const ENDPOINT_URL = 'https://jsonplaceholder.typicode.com/users';

export interface UseUsersReturn {
  data: User[] | null;
  isLoading: boolean;
  isError: boolean;
}

export const useUsers = (): UseUsersReturn => {
  const [data, setData] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await fetch(ENDPOINT_URL);

        if (!response.ok) {
          throw new Error('Error fetching users');
        }

        const users: User[] = await response.json();
        setData(users);
      } catch (error) {
        console.error('Error:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { data, isLoading, isError };
};
