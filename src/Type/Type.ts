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
