
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import { Button } from '../ui/button-custom';
import { useCart } from '../../context/CartContext';
import { cn } from '@/lib/utils';
import { useLanguage } from '../../context/LanguageContext';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

const ProductCard = ({ product, showAddToCart = true }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { t, language } = useLanguage();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  const formatPrice = (price: number) => {
    // Fixed the TypeScript error by using proper type comparison
    const locale = language === 'es' ? 'es-CR' : language === 'en' ? 'en-US' : 'es-CR';
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'CRC',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  // Get category display name
  const getCategoryName = (category: string) => {
    const key = `products.categories.${category}`;
    const translation = t(key);
    // If translation exists and isn't the same as the key, use the translation
    return translation !== key ? translation : category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  // Get safe translation with fallback
  const getTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };
  
  return (
    <Link to={`/productos/${product.id}`} className="group">
      <div className="product-card h-full flex flex-col">
        {/* Imagen y badges */}
        <div className="relative overflow-hidden">
          <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.featured && (
              <span className="bg-spartan-primary text-white text-xs font-semibold px-2 py-1 rounded-md">
                {getTranslation('product.featured', "Destacado")}
              </span>
            )}
            {product.discountPrice && (
              <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                {getTranslation('product.sale', "Oferta")}
              </span>
            )}
            {product.stock <= 5 && product.stock > 0 && (
              <span className="bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                {getTranslation('product.lowStock', "Pocas unidades")}
              </span>
            )}
            {product.stock === 0 && (
              <span className="bg-gray-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                {getTranslation('product.outOfStock', "Agotado")}
              </span>
            )}
          </div>
          
          {/* Botones de acción flotantes */}
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <button 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white dark:hover:bg-gray-700 transition-colors"
              aria-label={getTranslation('product.addToFavorites', "Añadir a favoritos")}
            >
              <Heart className="w-4 h-4 text-spartan-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
        
        {/* Información del producto */}
        <div className="flex flex-col p-4 flex-grow bg-white dark:bg-gray-900">
          <div className="mb-2">
            <h3 className="text-spartan-gray-500 dark:text-gray-400 text-sm">
              {getCategoryName(product.category)}
            </h3>
            <h2 className="font-semibold text-spartan-dark dark:text-white group-hover:text-spartan-primary transition-colors">
              {product.name}
            </h2>
          </div>
          
          <p className="text-spartan-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">
            {product.description}
          </p>
          
          <div className="mt-auto flex items-end justify-between">
            <div className="flex flex-col">
              {product.discountPrice ? (
                <>
                  <span className="text-spartan-gray-500 dark:text-gray-500 text-sm line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-spartan-primary font-bold">
                    {formatPrice(product.discountPrice)}
                  </span>
                </>
              ) : (
                <span className="text-spartan-primary font-bold">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            
            {showAddToCart && (
              <Button 
                size="sm"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={cn(
                  "opacity-0 group-hover:opacity-100 transition-opacity",
                  product.stock === 0 && "opacity-100"
                )}
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                {product.stock === 0 
                  ? getTranslation('product.outOfStock', "Agotado") 
                  : getTranslation('product.addToCart', "Añadir al carrito")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
