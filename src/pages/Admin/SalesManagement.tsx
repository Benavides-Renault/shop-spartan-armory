
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button-custom';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../../components/ui/table';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { DownloadIcon, Filter, Search } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { mockOrders } from '../../data/mockData';
import { format } from 'date-fns';
import { Order, CartItem } from '../../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { es } from 'date-fns/locale';
import { useLanguage } from '../../context/LanguageContext';

// Helpers
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
  }).format(amount);
};

const SalesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const { language } = useLanguage();
  
  const dateLocale = language === 'es' ? es : undefined;
  
  // Ordenar las ventas por fecha más reciente
  const sortedOrders = [...mockOrders].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
  
  // Filtrar las ventas
  const filteredOrders = sortedOrders.filter(order => {
    if (filter !== 'all' && order.status !== filter) {
      return false;
    }
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        order.id.toLowerCase().includes(searchLower) ||
        order.items.some(item => item.product.name.toLowerCase().includes(searchLower))
      );
    }
    return true;
  });
  
  // Datos para los gráficos
  const monthlyData = [
    { name: 'Ene', ventas: 124000 },
    { name: 'Feb', ventas: 158000 },
    { name: 'Mar', ventas: 162000 },
    { name: 'Abr', ventas: 185000 },
    { name: 'May', ventas: 192000 },
    { name: 'Jun', ventas: 210000 },
    { name: 'Jul', ventas: 225000 },
    { name: 'Ago', ventas: 236000 },
    { name: 'Sep', ventas: 245000 },
    { name: 'Oct', ventas: 267000 },
    { name: 'Nov', ventas: 289000 },
    { name: 'Dic', ventas: 315000 },
  ];
  
  const categoryData = [
    { name: 'Proteínas', value: 35 },
    { name: 'Creatina', value: 20 },
    { name: 'Pre-entreno', value: 18 },
    { name: 'Vitaminas', value: 15 },
    { name: 'Otros', value: 12 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  const calculateTotal = (items: CartItem[]) => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };
  
  // Renderizar detalles de la orden
  const OrderDetails = ({ order }: { order: Order }) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm">Ver detalles</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl overflow-y-auto max-h-[85vh]">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Orden #{order.id.substring(0, 8)}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Información del pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Estado:</span>
                    <span className={
                      order.status === 'delivered' || order.status === 'entregado' 
                        ? 'text-green-600 dark:text-green-400' 
                        : order.status === 'cancelled' || order.status === 'cancelado' 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-amber-600 dark:text-amber-400'
                    }>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Fecha de pedido:</span>
                    <span>
                      {format(
                        typeof order.date === 'string' ? new Date(order.date) : order.date, 
                        'PPP', 
                        { locale: dateLocale }
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Cliente:</span>
                    <span>Usuario {order.userId.substring(0, 8)}</span>
                  </div>
                  {order.shippingMethod && (
                    <div className="flex justify-between">
                      <span className="font-medium">Envío:</span>
                      <span>{order.shippingMethod.name}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Resumen de pago</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(calculateTotal(order.items))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Impuestos (13%):</span>
                    <span>{formatCurrency(calculateTotal(order.items) * 0.13)}</span>
                  </div>
                  {order.shippingMethod && (
                    <div className="flex justify-between">
                      <span>Costo de envío:</span>
                      <span>{formatCurrency(order.shippingMethod.price)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold pt-2 border-t border-border">
                    <span>Total:</span>
                    <span>{formatCurrency(order.total)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Productos</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead className="text-right">Precio</TableHead>
                      <TableHead className="text-center">Cantidad</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.product.name}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.product.price)}</TableCell>
                        <TableCell className="text-center">{item.quantity}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.product.price * item.quantity)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            {order.shippingAddress && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Dirección de entrega</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{order.shippingAddress}</p>
                </CardContent>
              </Card>
            )}
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline">
                <DownloadIcon className="w-4 h-4 mr-2" />
                Descargar factura
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Ventas</h1>
        <Button>Exportar Datos</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-muted-foreground">Ventas del mes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₡2,865,000</div>
            <p className="text-xs text-muted-foreground mt-1">↑ 12.5% con respecto al mes anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-muted-foreground">Pedidos del mes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground mt-1">↑ 8.2% con respecto al mes anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-muted-foreground">Valor promedio de pedido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₡22,560</div>
            <p className="text-xs text-muted-foreground mt-1">↑ 4.3% con respecto al mes anterior</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
          <TabsTrigger value="analytics">Analíticas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar pedidos..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filtrar
              </Button>
              
              <select 
                className="border rounded px-3 py-1 bg-background border-input text-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">Todos los estados</option>
                <option value="pending">Pendiente</option>
                <option value="processing">Procesando</option>
                <option value="shipped">Enviado</option>
                <option value="delivered">Entregado</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Pedido</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id.substring(0, 8)}</TableCell>
                      <TableCell>
                        {format(
                          typeof order.date === 'string' ? new Date(order.date) : order.date, 
                          'dd/MM/yyyy', 
                          { locale: dateLocale }
                        )}
                      </TableCell>
                      <TableCell>Usuario {order.userId.substring(0, 8)}</TableCell>
                      <TableCell>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          order.status === 'delivered' || order.status === 'entregado' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                            : order.status === 'cancelled' || order.status === 'cancelado' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' 
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{formatCurrency(order.total)}</TableCell>
                      <TableCell>
                        <OrderDetails order={order} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ventas Mensuales</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₡${value}`, 'Ventas']} />
                    <Legend />
                    <Bar dataKey="ventas" fill="#33C3F0" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Ventas por Categoría</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tendencia de Pedidos</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="ventas" stroke="#33C3F0" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas de Clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Clientes nuevos vs recurrentes</h4>
                    <div className="bg-muted rounded-full h-2">
                      <div className="bg-spartan-primary h-2 rounded-full w-[65%]"></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>Nuevos (65%)</span>
                      <span>Recurrentes (35%)</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Tasa de conversión</h4>
                    <div className="bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-[42%]"></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>Convertidos (42%)</span>
                      <span>No convertidos (58%)</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Tasa de abandono de carrito</h4>
                    <div className="bg-muted rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full w-[28%]"></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>Abandonados (28%)</span>
                      <span>Completados (72%)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesManagement;
