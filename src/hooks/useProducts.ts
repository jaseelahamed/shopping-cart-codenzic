import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';
import { useMemo, useState } from 'react';
import type { Product } from '../types';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(100),
    staleTime: 1000 * 60 * 5, 
  });
};

export const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      if (!res.ok) throw new Error('Failed to fetch product');
      return res.json() as Promise<Product>;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc';

export const useProductFilters = (products: Product[] = []) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      const matchesPrice = maxPrice ? product.price <= maxPrice : true;
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, searchQuery, selectedCategory, maxPrice, sortBy]);

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return Array.from(cats);
  }, [products]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setMaxPrice('');
    setSortBy('default');
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    maxPrice,
    setMaxPrice,
    sortBy,
    setSortBy,
    filteredProducts,
    categories,
    clearFilters
  };
};
