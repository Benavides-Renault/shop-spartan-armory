
import { Product, Order } from '../types';

// Mock products for development
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Gold Standard Whey Protein',
    description: 'Proteína de suero de alta calidad para recuperación muscular.',
    price: 25000,
    stock: 15,
    category: 'proteina',
    imageUrl: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Creatina Monohidrato',
    description: 'Aumenta la fuerza y potencia muscular durante entrenamientos intensos.',
    price: 18000,
    discountPrice: 15000,
    stock: 20,
    category: 'creatina',
    imageUrl: 'https://images.unsplash.com/photo-1615196534040-564a0a8784dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Pre-Workout Pump Extreme',
    description: 'Fórmula pre-entrenamiento para máxima energía y concentración.',
    price: 22000,
    stock: 8,
    category: 'pre-entreno',
    imageUrl: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'BCAA Recovery Complex',
    description: 'Aminoácidos esenciales para recuperación y desarrollo muscular.',
    price: 19500,
    stock: 12,
    category: 'aminoacidos',
    imageUrl: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Multivitamínico Deportivo',
    description: 'Complejo de vitaminas y minerales para deportistas.',
    price: 15000,
    stock: 25,
    category: 'vitaminas',
    imageUrl: 'https://images.unsplash.com/photo-1584912901298-28702bbefa98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Energy Gel Fast Action',
    description: 'Gel energético de rápida absorción para deportes de resistencia.',
    price: 2500,
    stock: 30,
    category: 'energia',
    imageUrl: 'https://images.unsplash.com/photo-1579722821273-0f6fbd2ff873?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Post-Workout Recovery',
    description: 'Fórmula para recuperación post-entrenamiento con glutamina y zinc.',
    price: 23000,
    stock: 0,
    category: 'recuperacion',
    imageUrl: 'https://images.unsplash.com/photo-1594386550608-f7f0e54fcf58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Hydration Electrolyte Mix',
    description: 'Mezcla de electrolitos para hidratación óptima durante el ejercicio.',
    price: 12000,
    stock: 3,
    category: 'otros',
    imageUrl: 'https://images.unsplash.com/photo-1578933363989-c248399d9a3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
];

// Mock orders for development
export const mockOrders: Order[] = [
  {
    id: '1001',
    userId: '2',
    items: [
      { 
        product: mockProducts[0], 
        quantity: 2 
      },
      { 
        product: mockProducts[2], 
        quantity: 1 
      }
    ],
    total: 72000,
    status: 'entregado',
    shippingAddress: 'San José, Costa Rica',
    shippingMethod: {
      id: 'standard',
      name: 'Envío Estándar',
      description: 'Entrega en todo el país',
      price: 2000,
      deliveryTime: '2-3 días',
      estimatedDelivery: '2-3 días'
    },
    createdAt: '2024-03-15T14:30:00Z',
    date: new Date('2024-03-15T14:30:00Z')
  },
  {
    id: '1002',
    userId: '2',
    items: [
      { 
        product: mockProducts[1], 
        quantity: 1 
      }
    ],
    total: 17000,
    status: 'procesando',
    shippingAddress: 'San José, Costa Rica',
    shippingMethod: {
      id: 'express',
      name: 'Envío Express',
      description: 'Entrega en 24 horas (solo GAM)',
      price: 3500,
      deliveryTime: '24 horas',
      estimatedDelivery: '1 día'
    },
    createdAt: '2024-03-20T09:45:00Z',
    date: new Date('2024-03-20T09:45:00Z')
  },
  {
    id: '1003',
    userId: '2',
    items: [
      { 
        product: mockProducts[3], 
        quantity: 1 
      },
      { 
        product: mockProducts[4], 
        quantity: 1 
      },
      { 
        product: mockProducts[5], 
        quantity: 2 
      }
    ],
    total: 42000,
    status: 'enviado',
    shippingAddress: 'Heredia, Costa Rica',
    shippingMethod: {
      id: 'standard',
      name: 'Envío Estándar',
      description: 'Entrega en todo el país',
      price: 2000,
      deliveryTime: '2-3 días',
      estimatedDelivery: '2-3 días'
    },
    createdAt: '2024-03-18T16:20:00Z',
    date: new Date('2024-03-18T16:20:00Z')
  },
  {
    id: '1004',
    userId: '2',
    items: [
      { 
        product: mockProducts[0], 
        quantity: 1 
      }
    ],
    total: 27000,
    status: 'pendiente',
    shippingAddress: 'Alajuela, Costa Rica',
    shippingMethod: {
      id: 'standard',
      name: 'Envío Estándar',
      description: 'Entrega en todo el país',
      price: 2000,
      deliveryTime: '2-3 días',
      estimatedDelivery: '2-3 días'
    },
    createdAt: '2024-03-22T11:15:00Z',
    date: new Date('2024-03-22T11:15:00Z')
  },
  {
    id: '1005',
    userId: '2',
    items: [
      { 
        product: mockProducts[2], 
        quantity: 1 
      },
      { 
        product: mockProducts[6], 
        quantity: 1 
      }
    ],
    total: 47000,
    status: 'cancelado',
    shippingAddress: 'Cartago, Costa Rica',
    shippingMethod: {
      id: 'express',
      name: 'Envío Express',
      description: 'Entrega en 24 horas (solo GAM)',
      price: 3500,
      deliveryTime: '24 horas',
      estimatedDelivery: '1 día'
    },
    createdAt: '2024-03-14T13:40:00Z',
    date: new Date('2024-03-14T13:40:00Z')
  }
];
