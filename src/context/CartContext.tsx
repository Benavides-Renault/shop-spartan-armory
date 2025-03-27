
import React, { createContext, useContext, useState } from 'react';
import { CartItem, Product, ShippingMethod } from '../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

// Define shipping methods
export const shippingMethods: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Estándar',
    description: 'Entrega en 3-5 días hábiles',
    price: 4.99,
    deliveryTime: '3-5 días hábiles',
    estimatedDelivery: '3-5 días'
  },
  {
    id: 'express',
    name: 'Express',
    description: 'Entrega en 1-2 días hábiles',
    price: 9.99,
    deliveryTime: '1-2 días hábiles',
    estimatedDelivery: '1-2 días'
  },
  {
    id: 'pickup',
    name: 'Recogida en tienda',
    description: 'Recoge tu pedido en nuestra tienda',
    price: 0,
    deliveryTime: 'Mismo día',
    estimatedDelivery: 'Hoy'
  }
];

type CartContextType = {
  cart: CartItem[];
  itemCount: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingMethods: ShippingMethod[];
  selectedShippingMethod: ShippingMethod | null;
  setSelectedShippingMethod: (method: ShippingMethod) => void;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<ShippingMethod | null>(null);
  
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = cart.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
  
  const tax = subtotal * 0.13; // 13% impuesto
  const shipping = selectedShippingMethod ? selectedShippingMethod.price : 0;
  const total = subtotal + tax + shipping;
  
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { product, quantity }];
      }
    });
  };
  
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      )
    );
  };
  
  const clearCart = () => {
    setCart([]);
    setSelectedShippingMethod(null);
  };
  
  const value = {
    cart,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    tax,
    shipping,
    total,
    shippingMethods,
    selectedShippingMethod,
    setSelectedShippingMethod
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
