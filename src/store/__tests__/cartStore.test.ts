import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '../cartStore';

describe('cartStore calculations', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 50,
    category: 'test',
    thumbnail: 'test.jpg'
  };

  const mockProduct2 = {
    id: 2,
    title: 'Test Product 2',
    price: 100,
    category: 'test',
    thumbnail: 'test2.jpg'
  };

  it('calculates subtotal correctly', () => {
    useCartStore.getState().addItem(mockProduct as any);
    useCartStore.getState().addItem(mockProduct2 as any);
    
    expect(useCartStore.getState().getSubtotal()).toBe(150);
  });

  it('calculates tax correctly (5%)', () => {
    useCartStore.getState().addItem(mockProduct as any); // $50
    expect(useCartStore.getState().getTax()).toBe(2.5);
  });

  it('calculates discount correctly', () => {
    // Under $100 -> 0 discount
    useCartStore.getState().addItem(mockProduct as any);
    expect(useCartStore.getState().getDiscount()).toBe(0);

    // Over $100 -> 10% discount
    useCartStore.getState().addItem(mockProduct2 as any); // Total: $150
    expect(useCartStore.getState().getDiscount()).toBe(15);
  });

  it('calculates total correctly', () => {
    useCartStore.getState().addItem(mockProduct as any); // $50
    useCartStore.getState().addItem(mockProduct as any); // $100
    useCartStore.getState().addItem(mockProduct2 as any); // $200
    
    // Subtotal: $200
    // Tax (5%): $10
    // Discount (10%): $20
    // Total: 200 + 10 - 20 = 190
    expect(useCartStore.getState().getTotal()).toBe(190);
  });
});
