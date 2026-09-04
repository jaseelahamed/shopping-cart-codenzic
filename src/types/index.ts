import { z } from 'zod';


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
  reviews: z.array(z.any()).optional(),
  availabilityStatus: z.string().optional(),
  shippingInformation: z.string().optional(),
  warrantyInformation: z.string().optional(),
});

export const productListResponseSchema = z.object({
  products: z.array(productSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export type Product = z.infer<typeof productSchema>;
export type ProductListResponse = z.infer<typeof productListResponseSchema>;


export interface CartItem extends Product {
  quantity: number;
}


export const shippingFormSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  postalCode: z.string().regex(/^\d{6}$/, 'Postal code must be exactly 6 digits'),
});

export type ShippingFormValues = z.infer<typeof shippingFormSchema>;
