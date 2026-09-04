import axios from 'axios';
import { type ProductListResponse, productListResponseSchema } from '../types';

const API_URL = 'https://dummyjson.com/products';

export const fetchProducts = async (limit = 100): Promise<ProductListResponse> => {
  const response = await axios.get(`${API_URL}?limit=${limit}`);
  
  const validatedData = productListResponseSchema.parse(response.data);
  return validatedData;
};
