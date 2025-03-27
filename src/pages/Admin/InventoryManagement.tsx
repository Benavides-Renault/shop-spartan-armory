
import React, { useState, useEffect } from 'react';
import { Search, Filter, AlertTriangle, BarChart, Package, ArrowDown, ArrowUp, Download } from 'lucide-react';
import { Button } from '../../components/ui/button-custom';
import { Input } from '../../components/ui/input';
import { Product, ProductCategory } from '../../types';
import { mockProducts } from '../../data/mockData';
import { toast } from 'sonner';
import StockUpdateDialog from '../../components/admin/StockUpdateDialog';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/table";
import { Card } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

// Categories with display names
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

const InventoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'out'>('all');
  const [timePeriod, setTimePeriod] = useState<'day' | 'week' | 'month' | 'year'>('month');
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [stockDialogOpen, setStockDialogOpen] = useState(false);
  const [metricData, setMetricData] = useState({
    totalProducts: 0,
    totalStock: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
    totalValue: 0
  });
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  // Get category display name by value
  const getCategoryName = (value: string): string => {
    const category = categoryOptions.find(cat => cat.value === value);
    return category ? category.label : value;
  };
  
  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  // Filter products based on search, category, and stock filters
  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      
      const matchesStock = 
        stockFilter === 'all' || 
        (stockFilter === 'low' && product.stock <= 5 && product.stock > 0) ||
        (stockFilter === 'out' && product.stock === 0);
        
      return matchesSearch && matchesCategory && matchesStock;
    });
    
    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, stockFilter]);
  
  // Calculate inventory metrics based on time period
  const calculateMetrics = () => {
    // For a real application, these would be based on actual historical data
    // Here we're simulating different values based on time period
    let modifier = 1;
    let stockModifier = 1;
    let salesModifier = 1;
    
    switch(timePeriod) {
      case 'day':
        modifier = 0.15;
        stockModifier = 0.98;
        salesModifier = 0.05;
        break;
      case 'week':
        modifier = 0.4;
        stockModifier = 0.95;
        salesModifier = 0.2;
        break;
      case 'month':
        modifier = 1;
        stockModifier = 0.9;
        salesModifier = 0.5;
        break;
      case 'year':
        modifier = 12;
        stockModifier = 0.5;
        salesModifier = 1;
        break;
    }
    
    // Simulate different metrics for different time periods
    const totalProducts = products.length;
    const baseStock = products.reduce((sum, product) => sum + product.stock, 0);
    const totalStock = Math.round(baseStock * stockModifier);
    
    // Apply sales volume based on time period - more sales in longer periods
    const lowStockItems = products.filter(p => {
      const simulatedStock = Math.round(p.stock * stockModifier);
      return simulatedStock <= 5 && simulatedStock > 0;
    });
    
    const outOfStockItems = products.filter(p => {
      const simulatedStock = Math.round(p.stock * stockModifier);
      return simulatedStock === 0;
    });
    
    const lowStockCount = lowStockItems.length;
    const outOfStockCount = outOfStockItems.length;
    
    // Calculate inventory value based on current prices and simulated stock levels
    const totalValue = Math.round(products.reduce((sum, product) => {
      const simulatedStock = Math.round(product.stock * stockModifier);
      return sum + (simulatedStock * (product.discountPrice || product.price));
    }, 0) * modifier);
    
    return {
      totalProducts,
      totalStock,
      lowStockCount,
      outOfStockCount,
      totalValue,
      lowStockItems
    };
  };
  
  // Update metrics whenever products or time period changes
  useEffect(() => {
    const metrics = calculateMetrics();
    setMetricData({
      totalProducts: metrics.totalProducts,
      totalStock: metrics.totalStock,
      lowStockCount: metrics.lowStockCount,
      outOfStockCount: metrics.outOfStockCount,
      totalValue: metrics.totalValue
    });
    
    // Update low stock products
    setLowStockProducts(metrics.lowStockItems);
  }, [products, timePeriod]);
  
  const handleUpdateStock = (productId: string, newStock: number) => {
    const updatedProducts = products.map(p => 
      p.id === productId ? { ...p, stock: newStock, updatedAt: new Date().toISOString() } : p
    );
    setProducts(updatedProducts);
    toast.success("Stock actualizado exitosamente");
  };
  
  const handleStockUpdateClick = (product: Product) => {
    setSelectedProduct(product);
    setStockDialogOpen(true);
  };
  
  const handleRestock = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setStockDialogOpen(true);
    }
  };
  
  const exportInventory = () => {
    toast.success("Exportando inventario...");
    // In a real application, this would generate a CSV or Excel file
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Inventario</h1>
        <div className="flex items-center gap-2">
          <Select defaultValue={timePeriod} onValueChange={(value) => setTimePeriod(value as any)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Hoy</SelectItem>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mes</SelectItem>
              <SelectItem value="year">Este año</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" leftIcon={<Download className="w-4 h-4" />} onClick={exportInventory}>
            Exportar Inventario
          </Button>
        </div>
      </div>
      
      {/* Metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Products */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-spartan-gray-500 mb-1">Total de Productos</p>
              <h3 className="text-2xl font-bold">{metricData.totalProducts}</h3>
            </div>
            <div className="bg-spartan-primary/10 p-3 rounded-full">
              <Package className="w-6 h-6 text-spartan-primary" />
            </div>
          </div>
        </div>
        
        {/* Total Stock */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-spartan-gray-500 mb-1">Unidades en Stock</p>
              <h3 className="text-2xl font-bold">{metricData.totalStock}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <BarChart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        {/* Low Stock */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-spartan-gray-500 mb-1">Stock Bajo</p>
              <h3 className="text-2xl font-bold">{metricData.lowStockCount}</h3>
              <p className="text-amber-500 text-sm mt-1">Productos con 5 o menos unidades</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
        
        {/* Inventory Value */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-spartan-gray-500 mb-1">Valor del Inventario</p>
              <h3 className="text-2xl font-bold">{formatPrice(metricData.totalValue)}</h3>
              <p className="text-green-500 text-sm mt-1">Periodo: {
                timePeriod === 'day' ? 'Hoy' :
                timePeriod === 'week' ? 'Esta semana' :
                timePeriod === 'month' ? 'Este mes' :
                'Este año'
              }</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <ArrowUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Stock alerts card */}
      <Card className="p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Alertas de Stock Bajo</h2>
          <AlertTriangle className="w-5 h-5 text-amber-500" />
        </div>
        
        {lowStockProducts.length === 0 ? (
          <p className="text-center text-spartan-gray-500 my-8">No hay productos con stock bajo.</p>
        ) : (
          <div className="space-y-3">
            {lowStockProducts.map(product => (
              <div key={product.id} className="flex justify-between items-center p-3 bg-spartan-light rounded-lg">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-spartan-gray-500">
                    Stock: <span className={`font-medium ${product.stock === 0 ? 'text-red-600' : 'text-amber-600'}`}>{product.stock}</span> 
                    / Mínimo: 5
                  </p>
                </div>
                <Button
                  onClick={() => handleRestock(product.id)}
                  className="px-3 py-1 bg-spartan-primary text-white text-sm rounded hover:bg-spartan-primary-dark"
                >
                  Reponer
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>
      
      {/* Filtros y búsqueda */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spartan-gray-400" />
            <Input 
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="md:w-64 flex">
            <div className="relative flex-1">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spartan-gray-400" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas las categorías</SelectItem>
                  {categoryOptions.filter(opt => opt.value !== '').map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="md:w-64 flex space-x-1">
            <Button 
              variant={stockFilter === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setStockFilter('all')}
              className="flex-1"
            >
              Todos
            </Button>
            <Button 
              variant={stockFilter === 'low' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setStockFilter('low')}
              className="flex-1"
            >
              Stock Bajo
            </Button>
            <Button 
              variant={stockFilter === 'out' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setStockFilter('out')}
              className="flex-1"
            >
              Agotados
            </Button>
          </div>
        </div>
      </div>
      
      {/* Tabla de inventario */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Valor Total</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-spartan-gray-500">
                  No se encontraron productos que coincidan con los criterios de búsqueda.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-spartan-light transition-colors">
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    <span className="text-spartan-gray-500">SKU-{product.id}</span>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-spartan-primary/10 text-spartan-primary text-xs rounded">
                      {getCategoryName(product.category)}
                    </span>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className={`font-medium ${
                        product.stock === 0 ? 'text-red-500' :
                        product.stock <= 5 ? 'text-amber-500' :
                        'text-spartan-gray-700'
                      }`}>
                        {product.stock}
                      </span>
                      {product.stock <= 5 && product.stock > 0 && (
                        <span className="ml-2 bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded">
                          Stock Bajo
                        </span>
                      )}
                      {product.stock === 0 && (
                        <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded">
                          Agotado
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">
                      {formatPrice(product.stock * (product.discountPrice || product.price))}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleStockUpdateClick(product)}
                    >
                      Actualizar Stock
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Stock Update Dialog */}
      {selectedProduct && (
        <StockUpdateDialog
          productName={selectedProduct.name}
          currentStock={selectedProduct.stock}
          onStockUpdate={(newStock) => handleUpdateStock(selectedProduct.id, newStock)}
          open={stockDialogOpen}
          onOpenChange={setStockDialogOpen}
        />
      )}
    </div>
  );
};

export default InventoryManagement;
