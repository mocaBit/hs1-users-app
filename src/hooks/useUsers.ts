import { useState, useEffect } from 'react';
import { User } from '../types/User';

const ENDPOINT_URL = 'https://jsonplaceholder.typicode.com/users';

export interface UseUsersReturn {
  data: User[] | null;
  isLoading: boolean;
  isError: boolean;
}

export interface UseUsersOptions {
  /** Simulated delay in milliseconds before fetching data */
  simulateDelay?: number;
  /** Force an error to occur for testing purposes */
  simulateError?: boolean;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useUsers = (options?: UseUsersOptions): UseUsersReturn => {
  const { simulateDelay = 0, simulateError = false } = options || {};

  const [data, setData] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        // Simulate delay if specified
        if (simulateDelay > 0) {
          await delay(simulateDelay);
        }

        // Simulate error if specified
        if (simulateError) {
          throw new Error('Simulated error for testing');
        }

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
  }, [simulateDelay, simulateError]);

  return { data, isLoading, isError };
};
