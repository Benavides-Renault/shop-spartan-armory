
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button-custom';
import ProductCard from '../products/ProductCard';
import { Product } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

// Datos simulados de productos destacados
const mockFeaturedProducts: Product[] = [
  {
    id: '1',
    name: 'Gold Standard Whey Protein',
    description: 'Proteína de suero de alta calidad para recuperación muscular.',
    price: 25000,
    stock: 15,
    category: 'proteina',
    imageUrl: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
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
    createdAt: new Date(),
    updatedAt: new Date()
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
    createdAt: new Date(),
    updatedAt: new Date()
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
    createdAt: new Date(),
    updatedAt: new Date()
  },
];

interface FeaturedProductsProps {
  products?: Product[];
}

const FeaturedProducts = ({ products = mockFeaturedProducts }: FeaturedProductsProps) => {
  const { t } = useLanguage();
  
  // Provide explicit fallbacks to ensure translations never show raw keys
  const getTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };
  
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <h2 className="text-sm uppercase tracking-wider text-spartan-primary font-semibold mb-2">
              {getTranslation('featured.subtitle', 'Productos Destacados')}
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-spartan-dark dark:text-white">
              {getTranslation('featured.title', 'Nuestra Selección')}
            </h3>
          </div>
          
          <Link to="/productos">
            <Button 
              variant="ghost" 
              className="group"
            >
              {getTranslation('featured.viewAll', 'Ver Todos')}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
