import { type ProductListResponse, productListResponseSchema } from '../types';

const API_URL = 'https://dummyjson.com/products';

export const fetchProducts = async (limit = 100): Promise<ProductListResponse> => {
  const response = await fetch(`${API_URL}?limit=${limit}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  

  const validatedData = productListResponseSchema.parse(data);
  return validatedData;
};
