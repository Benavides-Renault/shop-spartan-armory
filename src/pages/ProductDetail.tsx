
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  Truck, 
  ShoppingBag, 
  ShoppingCart, 
  ChevronRight, 
  AlertCircle, 
  Shield, 
  BarChart,
  CheckCircle,
  Minus,
  Plus,
  Heart,
  Share
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button-custom';
import { useCart } from '../context/CartContext';
import { mockProducts } from '../data/mockData';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'usage'>('description');
  
  const product = mockProducts.find(p => p.id === id);
  
  const relatedProducts = mockProducts
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 px-4">
          <div className="container mx-auto text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
            <p className="mb-8">El producto que estás buscando no existe o ha sido eliminado.</p>
            <Link to="/productos">
              <Button>Volver a productos</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="bg-spartan-light py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-spartan-gray-500">
              <Link to="/" className="hover:text-spartan-primary">Inicio</Link>
              <ChevronRight className="w-4 h-4 mx-1" />
              <Link to="/productos" className="hover:text-spartan-primary">Productos</Link>
              <ChevronRight className="w-4 h-4 mx-1" />
              <Link 
                to={`/productos/categoria/${product.category}`} 
                className="hover:text-spartan-primary"
              >
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="text-spartan-gray-700 truncate max-w-[200px]">{product.name}</span>
            </div>
          </div>
        </div>
        
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
              <div className="space-y-4">
                <div className="bg-white rounded-lg overflow-hidden shadow-subtle">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-auto object-cover aspect-square"
                  />
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div 
                      key={index}
                      className="bg-white rounded-lg overflow-hidden border border-spartan-gray-200 cursor-pointer hover-lift"
                    >
                      <img 
                        src={product.imageUrl} 
                        alt={`${product.name} ${index + 1}`} 
                        className="w-full h-auto object-cover aspect-square"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-spartan-dark mb-2 animate-fade-in">
                    {product.name}
                  </h1>
                  <div className="flex items-center space-x-4">
                    <span className="px-2 py-1 bg-spartan-primary/10 text-spartan-primary text-sm rounded-md">
                      {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </span>
                    <div className="flex items-center">
                      <span className="text-sm text-spartan-gray-500">
                        {product.stock > 0 ? (
                          <span className="flex items-center text-green-600">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            En stock
                          </span>
                        ) : (
                          <span className="text-red-500">Agotado</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                  {product.discountPrice ? (
                    <div className="flex items-end space-x-2">
                      <span className="text-3xl font-bold text-spartan-primary">
                        {formatPrice(product.discountPrice)}
                      </span>
                      <span className="text-spartan-gray-500 text-lg line-through">
                        {formatPrice(product.price)}
                      </span>
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                        {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xl font-bold text-spartan-primary">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
                
                <p className="text-spartan-gray-700 animate-fade-in" style={{ animationDelay: '200ms' }}>
                  {product.description}
                </p>
                
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
                  <div className="flex items-center border border-spartan-gray-300 rounded-md w-40">
                    <button 
                      className="p-2 text-spartan-gray-500 hover:text-spartan-primary"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <input 
                      type="number" 
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value || '1'))}
                      className="flex-grow text-center border-none focus:ring-0"
                      min={1}
                      max={product.stock}
                    />
                    <button 
                      className="p-2 text-spartan-gray-500 hover:text-spartan-primary"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <Button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex-1"
                    leftIcon={<ShoppingCart className="w-5 h-5" />}
                  >
                    {product.stock === 0 ? 'Agotado' : 'Añadir al carrito'}
                  </Button>
                  
                  <Button variant="outline" size="icon">
                    <Heart className="w-5 h-5" />
                  </Button>
                  
                  <Button variant="outline" size="icon">
                    <Share className="w-5 h-5" />
                  </Button>
                </div>
                
                <div className="space-y-4 border-t border-b border-spartan-gray-200 py-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-spartan-primary" />
                    <span>Calidad garantizada</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5 text-spartan-primary" />
                    <span>Envío rápido a todo Costa Rica</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-spartan-primary" />
                    <span>Satisfacción garantizada o devolución del dinero</span>
                  </div>
                </div>
                
                <div className="space-y-4 animate-fade-in" style={{ animationDelay: '500ms' }}>
                  <div className="flex border-b border-spartan-gray-200">
                    <button 
                      className={`px-4 py-2 font-medium text-sm ${activeTab === 'description' ? 'border-b-2 border-spartan-primary text-spartan-primary' : 'text-spartan-gray-500'}`}
                      onClick={() => setActiveTab('description')}
                    >
                      Descripción
                    </button>
                    <button 
                      className={`px-4 py-2 font-medium text-sm ${activeTab === 'ingredients' ? 'border-b-2 border-spartan-primary text-spartan-primary' : 'text-spartan-gray-500'}`}
                      onClick={() => setActiveTab('ingredients')}
                    >
                      Ingredientes
                    </button>
                    <button 
                      className={`px-4 py-2 font-medium text-sm ${activeTab === 'usage' ? 'border-b-2 border-spartan-primary text-spartan-primary' : 'text-spartan-gray-500'}`}
                      onClick={() => setActiveTab('usage')}
                    >
                      Modo de uso
                    </button>
                  </div>
                  
                  <div className="py-2">
                    {activeTab === 'description' && (
                      <div className="space-y-4 text-spartan-gray-700">
                        <p>
                          {product.description} Nuestro producto premium está diseñado para ayudarte a alcanzar tus objetivos fitness con mayor eficiencia.
                        </p>
                        <p>
                          Formulado con ingredientes de la más alta calidad, respaldados por investigaciones científicas que garantizan resultados óptimos y la seguridad durante su uso.
                        </p>
                        {product.benefits && (
                          <div>
                            <h4 className="font-semibold mb-2">Beneficios:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {product.benefits.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {activeTab === 'ingredients' && (
                      <div className="space-y-4 text-spartan-gray-700">
                        <p>
                          {product.ingredients || 'Lista de ingredientes detallada que garantiza la máxima calidad y pureza de cada componente utilizado en nuestra fórmula.'}
                        </p>
                        <p>
                          Todos nuestros ingredientes son seleccionados cuidadosamente y sometidos a rigurosos controles de calidad para garantizar su eficacia y seguridad.
                        </p>
                      </div>
                    )}
                    
                    {activeTab === 'usage' && (
                      <div className="space-y-4 text-spartan-gray-700">
                        <p>
                          {product.howToUse || 'Instrucciones detalladas de cómo utilizar este producto para obtener los mejores resultados posibles según sus necesidades específicas.'}
                        </p>
                        <p>
                          Para resultados óptimos, se recomienda seguir las indicaciones de uso consistentemente como parte de un programa de entrenamiento y alimentación adecuados.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-spartan-light">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Productos relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white rounded-lg shadow-subtle overflow-hidden">
                    <Link to={`/productos/${product.id}`} className="block">
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-spartan-dark mb-1 hover:text-spartan-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-spartan-gray-500 text-sm line-clamp-2 mb-2">
                          {product.description}
                        </p>
                        <div>
                          {product.discountPrice ? (
                            <div className="flex items-center space-x-2">
                              <span className="text-spartan-primary font-bold">
                                {formatPrice(product.discountPrice)}
                              </span>
                              <span className="text-spartan-gray-500 text-sm line-through">
                                {formatPrice(product.price)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-spartan-primary font-bold">
                              {formatPrice(product.price)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
