
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useLanguage } from '../context/LanguageContext';
import { ProductCategory } from '../types';
import { mockProducts } from '../data/mockData';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Input } from '../components/ui/input';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/button-custom';

const Products = () => {
  const { category } = useParams();
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>(
    category as ProductCategory || 'all'
  );
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  // Update active category when URL param changes
  useEffect(() => {
    if (category) {
      setActiveCategory(category as ProductCategory);
    } else {
      setActiveCategory('all');
    }
  }, [category]);

  // Get translation with fallback
  const getTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };

  // Map of categories to display names for supplements
  const getCategoryName = (category: ProductCategory | 'all'): string => {
    if (category === 'all') {
      return getTranslation('products.categories.all', 'Todos');
    }
    
    const key = `products.categories.${category}`;
    const translation = t(key);
    
    // Provide fallbacks for common categories
    if (translation === key) {
      const fallbacks: Record<string, string> = {
        'proteina': language === 'es' ? 'Proteína' : 'Protein',
        'creatina': language === 'es' ? 'Creatina' : 'Creatine',
        'pre-entreno': language === 'es' ? 'Pre-entreno' : 'Pre-workout',
        'aminoacidos': language === 'es' ? 'Aminoácidos' : 'Amino acids',
        'vitaminas': language === 'es' ? 'Vitaminas' : 'Vitamins',
        'otros': language === 'es' ? 'Otros' : 'Others'
      };
      
      return fallbacks[category] || category.charAt(0).toUpperCase() + category.slice(1);
    }
    
    return translation;
  };

  // Only show supplement categories - remove 'energia' and 'recuperacion'
  const supplementCategories: (ProductCategory | 'all')[] = ['all', 'proteina', 'creatina', 'pre-entreno', 'aminoacidos', 'vitaminas', 'otros'];

  // Filter products based on the active category and search term
  const filteredProducts = mockProducts
    .filter(product => 
      (activeCategory === 'all'
        ? ['proteina', 'creatina', 'pre-entreno', 'aminoacidos', 'vitaminas', 'otros', 'supplement'].includes(product.category)
        : product.category === activeCategory)
      && (searchTerm === '' || 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header section similar to Guides page */}
        <div className="bg-gradient-to-r from-spartan-primary/10 to-spartan-secondary/10 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-spartan-dark dark:text-white">
              {getTranslation('products.title', 'Productos')}
            </h1>
            <p className="text-spartan-gray-700 dark:text-spartan-gray-300 mt-2">
              {getTranslation('products.subtitle', 'Descubre nuestra selección de suplementos')}
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters for mobile */}
            <div className="md:hidden mb-4">
              <Button 
                variant="outline" 
                onClick={() => setFilterOpen(!filterOpen)}
                className="w-full justify-between"
              >
                <Filter className="w-4 h-4 mr-2" />
                {getTranslation('products.categories.title', 'Categorías')}
                <ChevronDown className={`w-4 h-4 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              {filterOpen && (
                <div className="mt-4 p-4 border border-spartan-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 animate-fade-in">
                  <div className="mb-4">
                    <Input
                      placeholder={getTranslation('products.search_placeholder', 'Buscar productos...')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2 text-spartan-dark dark:text-white">
                      {getTranslation('products.categories.title', 'Categorías')}
                    </h3>
                    <div className="space-y-2">
                      {supplementCategories.map((cat) => (
                        <label key={cat} className="flex items-center text-spartan-dark dark:text-white">
                          <input 
                            type="radio" 
                            name="category-mobile"
                            checked={activeCategory === cat}
                            onChange={() => setActiveCategory(cat)}
                            className="mr-2 rounded accent-spartan-primary"
                          />
                          {getCategoryName(cat)}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar with search and filters for desktop */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-lg border border-spartan-gray-200 dark:border-gray-700 shadow-sm p-5">
                <h2 className="text-lg font-semibold mb-4 flex items-center text-spartan-dark dark:text-white">
                  <Search className="w-5 h-5 mr-2" />
                  {getTranslation('products.search', 'Buscar')}
                </h2>
                
                <Input
                  placeholder={getTranslation('products.search_placeholder', 'Buscar productos...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full mb-6"
                />
                
                <h3 className="font-semibold mb-2 text-spartan-dark dark:text-white">
                  {getTranslation('products.categories.title', 'Categorías')}
                </h3>
                <div className="space-y-2">
                  {supplementCategories.map((cat) => (
                    <label key={cat} className="flex items-center text-spartan-dark dark:text-white">
                      <input 
                        type="radio" 
                        name="category"
                        checked={activeCategory === cat}
                        onChange={() => setActiveCategory(cat)}
                        className="mr-2 rounded accent-spartan-primary"
                      />
                      {getCategoryName(cat)}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Product grid */}
            <div className="flex-1">
              {/* Information */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-spartan-gray-700 dark:text-spartan-gray-300">
                  {getTranslation('products.showing', 'Mostrando')} <span className="font-semibold">{filteredProducts.length}</span> {getTranslation('products.products', 'productos')}
                </p>
              </div>
              
              {/* Grid of products */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-2 text-spartan-dark dark:text-white">
                    {getTranslation('products.no_products_found', 'No se encontraron productos')}
                  </h3>
                  <p className="text-spartan-gray-500 dark:text-spartan-gray-400 mb-6">
                    {getTranslation('products.try_different_search', 'Intenta con una búsqueda diferente')}
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setActiveCategory('all');
                    }}
                  >
                    {getTranslation('products.clear_filters', 'Limpiar filtros')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
