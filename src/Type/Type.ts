import type { ReactNode } from "react";
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  stock: number;
  thumbnail: string;
}

export interface SortContextType {
  sort: string;
  setSort: (value: string) => void;
}

export interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export type LoginFormInputs = {
  email: string;
  password: string;
};

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}