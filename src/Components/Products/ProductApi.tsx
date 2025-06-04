import axios from "axios";
import type { Product } from "../../Type/Type";

export const fetchAllProducts = async (
  limit: number,
  skip: number
): Promise<Product[]> => {
  try {
    const res = await axios.get("https://dummyjson.com/products", {
      params: { limit, skip },
    });
    return res.data.products;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};

export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const res = await axios.get(`https://dummyjson.com/products/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Product not found");
  }
};
