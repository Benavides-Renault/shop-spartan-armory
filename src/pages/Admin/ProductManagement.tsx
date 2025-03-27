
import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, ArrowUpDown, Package } from 'lucide-react';
import { Button } from '../../components/ui/button-custom';
import ProductForm from '../../components/admin/ProductForm';
import { Product, ProductCategory } from '../../types';
import { mockProducts } from '../../data/mockData';
import StockUpdateDialog from '../../components/admin/StockUpdateDialog';
import { toast } from 'sonner';

type SortField = 'name' | 'price' | 'stock' | 'category' | 'updatedAt';
type SortDirection = 'asc' | 'desc';

const ProductManagement = () => {
  // En una aplicación real, estos productos vendrían de una API
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | ''>('');
  const [showForm, setShowForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);
  const [sortField, setSortField] = useState<SortField>('updatedAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [stockDialogOpen, setStockDialogOpen] = useState(false);
  const [selectedStockProduct, setSelectedStockProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  // Handle sort logic
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Apply sorting and filtering
  useEffect(() => {
    let result = [...products];
    
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = (a.discountPrice || a.price) - (b.discountPrice || b.price);
          break;
        case 'stock':
          comparison = a.stock - b.stock;
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'updatedAt':
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    // Apply filtering
    result = result.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, sortField, sortDirection]);
  
  const handleAddProduct = () => {
    setCurrentProduct(undefined);
    setShowForm(true);
  };
  
  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setShowForm(true);
  };
  
  const handleSubmitProduct = (productData: Partial<Product>) => {
    if (currentProduct) {
      // Actualizar producto existente
      const updatedProducts = products.map(p => 
        p.id === currentProduct.id ? { ...p, ...productData, updatedAt: new Date().toISOString() } : p
      );
      setProducts(updatedProducts);
      toast.success("Producto actualizado con éxito");
    } else {
      // Crear nuevo producto
      const newProduct: Product = {
        id: `${products.length + 1}`, // En una aplicación real, esto vendría del backend
        ...productData as Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setProducts([...products, newProduct]);
      toast.success("Producto creado con éxito");
    }
    
    setShowForm(false);
  };
  
  const handleDeleteProduct = (productId: string) => {
    // En una aplicación real, se enviaría una petición al backend
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== productId));
      toast.success("Producto eliminado con éxito");
    }
  };
  
  const handleUpdateStock = (product: Product) => {
    setSelectedStockProduct(product);
    setStockDialogOpen(true);
  };
  
  const handleStockUpdate = (newStock: number) => {
    if (selectedStockProduct) {
      const updatedProducts = products.map(p => 
        p.id === selectedStockProduct.id ? { ...p, stock: newStock, updatedAt: new Date().toISOString() } : p
      );
      setProducts(updatedProducts);
    }
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  const categoryOptions = [
    { value: '', label: 'Todas las categorías' },
    { value: 'proteina', label: 'Proteínas' },
    { value: 'creatina', label: 'Creatina' },
    { value: 'pre-entreno', label: 'Pre-entreno' },
    { value: 'aminoacidos', label: 'Aminoácidos' },
    { value: 'vitaminas', label: 'Vitaminas' },
    { value: 'energia', label: 'Energía' },
    { value: 'recuperacion', label: 'Recuperación' },
    { value: 'otros', label: 'Otros' },
  ];
  
  if (showForm) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">
          {currentProduct ? 'Editar producto' : 'Agregar nuevo producto'}
        </h1>
        <ProductForm 
          product={currentProduct}
          onSubmit={handleSubmitProduct}
          onCancel={() => setShowForm(false)}
        />
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Productos</h1>
        <Button onClick={handleAddProduct} leftIcon={<Plus className="w-4 h-4" />}>
          Agregar Producto
        </Button>
      </div>
      
      {/* Filtros y búsqueda */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spartan-gray-400" />
            <input 
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-spartan-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-spartan-primary"
            />
          </div>
          
          <div className="md:w-64 flex">
            <div className="relative flex-1">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spartan-gray-400" />
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value as ProductCategory | '')}
                className="w-full pl-10 pr-4 py-2 border border-spartan-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-spartan-primary appearance-none"
              >
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabla de productos */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-spartan-light">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-spartan-gray-700">
                  <button 
                    className="flex items-center space-x-1 focus:outline-none"
                    onClick={() => handleSort('name')}
                  >
                    <span>Nombre</span>
                    <ArrowUpDown className={`w-4 h-4 ${sortField === 'name' ? 'text-spartan-primary' : 'text-spartan-gray-400'}`} />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium text-spartan-gray-700">
                  <button 
                    className="flex items-center space-x-1 focus:outline-none"
                    onClick={() => handleSort('category')}
                  >
                    <span>Categoría</span>
                    <ArrowUpDown className={`w-4 h-4 ${sortField === 'category' ? 'text-spartan-primary' : 'text-spartan-gray-400'}`} />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium text-spartan-gray-700">
                  <button 
                    className="flex items-center space-x-1 focus:outline-none"
                    onClick={() => handleSort('price')}
                  >
                    <span>Precio</span>
                    <ArrowUpDown className={`w-4 h-4 ${sortField === 'price' ? 'text-spartan-primary' : 'text-spartan-gray-400'}`} />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium text-spartan-gray-700">
                  <button 
                    className="flex items-center space-x-1 focus:outline-none"
                    onClick={() => handleSort('stock')}
                  >
                    <span>Stock</span>
                    <ArrowUpDown className={`w-4 h-4 ${sortField === 'stock' ? 'text-spartan-primary' : 'text-spartan-gray-400'}`} />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium text-spartan-gray-700">Destacado</th>
                <th className="text-left py-3 px-4 font-medium text-spartan-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-spartan-gray-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-spartan-gray-500">
                    No se encontraron productos que coincidan con los criterios de búsqueda.
                  </td>
                </tr>
              ) : (
                filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-spartan-light transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-spartan-light rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-spartan-primary/10 text-spartan-primary text-xs rounded">
                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {product.discountPrice ? (
                        <div>
                          <span className="font-medium">{formatPrice(product.discountPrice)}</span>
                          <span className="text-spartan-gray-500 line-through text-sm ml-2">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                      ) : (
                        <span className="font-medium">{formatPrice(product.price)}</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${product.stock < 5 ? 'text-red-500' : 'text-spartan-gray-700'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {product.featured ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          Sí
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-spartan-gray-100 text-spartan-gray-500 text-xs rounded">
                          No
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => window.open(`/productos/${product.id}`, '_blank')}
                          className="text-spartan-gray-700 hover:text-spartan-primary p-1"
                          title="Ver producto"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleEditProduct(product)}
                          className="text-spartan-gray-700 hover:text-spartan-primary p-1"
                          title="Editar producto"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleUpdateStock(product)}
                          className="text-spartan-gray-700 hover:text-spartan-primary p-1"
                          title="Actualizar stock"
                        >
                          <Package className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-spartan-gray-700 hover:text-red-500 p-1"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Stock Update Dialog */}
      {selectedStockProduct && (
        <StockUpdateDialog
          productName={selectedStockProduct.name}
          currentStock={selectedStockProduct.stock}
          onStockUpdate={handleStockUpdate}
          open={stockDialogOpen}
          onOpenChange={setStockDialogOpen}
        />
      )}
    </div>
  );
};

export default ProductManagement;
