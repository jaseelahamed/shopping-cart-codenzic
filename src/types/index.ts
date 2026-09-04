import { z } from 'zod';

// Product API Schema
export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  discountPercentage: z.number().optional(),
  rating: z.number(),
  stock: z.number(),
  brand: z.string().optional(),
  category: z.string(),
  thumbnail: z.string(),
  images: z.array(z.string()).optional(),
});

export const productListResponseSchema = z.object({
  products: z.array(productSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export type Product = z.infer<typeof productSchema>;
export type ProductListResponse = z.infer<typeof productListResponseSchema>;

// Cart Item Interface
export interface CartItem extends Product {
  quantity: number;
}

// Shipping Form Schema
export const shippingFormSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Email must be valid'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
});

export type ShippingFormValues = z.infer<typeof shippingFormSchema>;
