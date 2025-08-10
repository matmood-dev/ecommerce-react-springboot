import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080",
});

export async function fetchProductById(id: number) {
  const res = await API.get<Product>(`/api/products/${id}`);
  return res.data;
}


// Types that match your Spring Page<ProductResponse>
export type Product = {
  id: number;
  sku: string;
  name: string;
  description?: string;
  category?: string;
  price: number;
  stock: number;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
};

export type Page<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // current page (0-based)
  first: boolean;
  last: boolean;
  numberOfElements: number;
};

export async function fetchProducts(params: {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number; // 0-based
  size?: number;
  sort?: string; // e.g. "createdAt,desc" | "price,asc"
}) {
  const res = await API.get<Page<Product>>("/api/products", { params });
  return res.data;
}
