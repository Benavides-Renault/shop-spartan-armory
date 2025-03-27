
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingCart, Plus, Minus, ChevronRight, Truck } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button-custom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import FeaturedProducts from '../components/home/FeaturedProducts';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, selectedShippingMethod, setSelectedShippingMethod, total, shippingMethods } = useCart();
  const { user } = useAuth();
  
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
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Tu Carrito</h1>
          
          {cart.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm mt-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-spartan-light rounded-full mb-4">
                <ShoppingCart className="w-8 h-8 text-spartan-gray-500" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">Tu carrito está vacío</h2>
              <p className="text-spartan-gray-500 mb-8 max-w-md mx-auto">
                Parece que aún no has añadido ningún producto a tu carrito. 
                Explora nuestro catálogo y descubre los mejores suplementos.
              </p>
              <Link to="/productos">
                <Button>Ver productos</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Productos en el carrito */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-spartan-gray-100">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">
                        Productos ({cart.reduce((acc, item) => acc + item.quantity, 0)})
                      </h2>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearCart}
                        className="text-red-500 hover:text-red-600"
                      >
                        Vaciar carrito
                      </Button>
                    </div>
                  </div>
                  
                  {/* Lista de productos */}
                  <div className="divide-y divide-spartan-gray-100">
                    {cart.map((item) => (
                      <div key={item.product.id} className="p-4 sm:p-6 animate-fade-in">
                        <div className="flex flex-col sm:flex-row gap-4">
                          {/* Imagen del producto */}
                          <Link to={`/productos/${item.product.id}`} className="flex-shrink-0">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-spartan-light rounded-md overflow-hidden">
                              <img 
                                src={item.product.imageUrl} 
                                alt={item.product.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </Link>
                          
                          {/* Información del producto */}
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row justify-between">
                              <div>
                                <Link 
                                  to={`/productos/${item.product.id}`}
                                  className="font-semibold text-spartan-dark hover:text-spartan-primary"
                                >
                                  {item.product.name}
                                </Link>
                                <p className="text-spartan-gray-500 text-sm">
                                  {item.product.category.charAt(0).toUpperCase() + item.product.category.slice(1)}
                                </p>
                              </div>
                              <div className="mt-2 sm:mt-0 text-right">
                                <span className="font-semibold text-spartan-dark">
                                  {formatPrice(
                                    (item.product.discountPrice || item.product.price) * item.quantity
                                  )}
                                </span>
                                {item.quantity > 1 && (
                                  <p className="text-xs text-spartan-gray-500">
                                    {formatPrice(item.product.discountPrice || item.product.price)} por unidad
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            {/* Controles de cantidad */}
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center border border-spartan-gray-300 rounded-md">
                                <button 
                                  className="p-1 text-spartan-gray-500 hover:text-spartan-primary"
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-3">{item.quantity}</span>
                                <button 
                                  className="p-1 text-spartan-gray-500 hover:text-spartan-primary"
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  disabled={item.quantity >= item.product.stock}
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              
                              <button 
                                className="text-red-500 hover:text-red-600 flex items-center"
                                onClick={() => removeFromCart(item.product.id)}
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                <span className="text-sm">Eliminar</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-6 bg-spartan-light">
                    <Link 
                      to="/productos"
                      className="text-spartan-primary hover:text-spartan-secondary flex items-center"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Continuar comprando
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Resumen del pedido */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
                  <div className="p-6 border-b border-spartan-gray-100">
                    <h2 className="text-xl font-semibold">Resumen del pedido</h2>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between text-spartan-gray-700">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    
                    {/* Métodos de envío */}
                    <div>
                      <h3 className="font-medium mb-2">Método de envío</h3>
                      <div className="space-y-2">
                        {shippingMethods.map((method) => (
                          <label 
                            key={method.id}
                            className={`flex items-start p-3 border rounded-md cursor-pointer transition-colors ${
                              selectedShippingMethod?.id === method.id 
                                ? 'border-spartan-primary bg-spartan-primary/5' 
                                : 'border-spartan-gray-200 hover:bg-spartan-light'
                            }`}
                          >
                            <input 
                              type="radio"
                              name="shipping"
                              checked={selectedShippingMethod?.id === method.id}
                              onChange={() => setSelectedShippingMethod(method)}
                              className="mt-0.5 mr-3"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <span className="font-medium">{method.name}</span>
                                <span>{method.price > 0 ? formatPrice(method.price) : 'Gratis'}</span>
                              </div>
                              <p className="text-sm text-spartan-gray-500 mt-1">{method.description}</p>
                              <p className="text-xs text-spartan-gray-500 mt-1">
                                Tiempo estimado: {method.estimatedDelivery}
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t border-spartan-gray-100 pt-4">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span className="text-spartan-primary">{formatPrice(total)}</span>
                      </div>
                    </div>
                    
                    <Button 
                      fullWidth
                      size="lg"
                      className="mt-4"
                    >
                      Proceder al pago
                    </Button>
                    
                    {/* Información adicional */}
                    <div className="mt-6 text-sm text-spartan-gray-500">
                      <div className="flex items-start space-x-2 mb-2">
                        <Truck className="w-4 h-4 text-spartan-primary mt-0.5" />
                        <p>Envíos a todo Costa Rica. Tiempo de entrega según método seleccionado.</p>
                      </div>
                      <p>
                        Al realizar el pedido, aceptas nuestros{' '}
                        <Link to="/terminos" className="text-spartan-primary hover:underline">
                          Términos y Condiciones
                        </Link>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Productos que podrían interesarte */}
          {cart.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8">También te podría interesar</h2>
              <FeaturedProducts />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
