import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  
  getSubtotal: () => number;
  getTax: () => number;
  getDiscount: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          if (existingItem) {
            if (existingItem.quantity >= 5) return state; 
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { items: [...state.items, { ...product, quantity: 1 }] };
        });
      },
      
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity < 1 || quantity > 5) return;
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        }));
      },
      
      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
      
      getTax: () => {
        const subtotal = get().getSubtotal();
        return subtotal * 0.05;
      },
      
      getDiscount: () => {
        const subtotal = get().getSubtotal();
        if (subtotal > 100) {
          return subtotal * 0.10; 
        }
        return 0;
      },
      
      getTotal: () => {
        const subtotal = get().getSubtotal();
        const tax = get().getTax();
        const discount = get().getDiscount();
        return subtotal + tax - discount;
      }
    }),
    {
      name: 'shopping-cart-storage',
    }
  )
);
