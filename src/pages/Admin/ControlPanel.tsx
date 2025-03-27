import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { Package, ShoppingCart, Users, CreditCard, TrendingUp, AlertTriangle, Search, Filter, ChevronRight } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

// Mock data for charts
const salesData = [
  { name: 'Ene', ventas: 4000 },
  { name: 'Feb', ventas: 3000 },
  { name: 'Mar', ventas: 5000 },
  { name: 'Abr', ventas: 2780 },
  { name: 'May', ventas: 1890 },
  { name: 'Jun', ventas: 2390 },
  { name: 'Jul', ventas: 3490 },
  { name: 'Ago', ventas: 4000 },
  { name: 'Sep', ventas: 2780 },
  { name: 'Oct', ventas: 1890 },
  { name: 'Nov', ventas: 3578 },
  { name: 'Dic', ventas: 5200 },
];

// Mock data for product categories
const productCategoryData = [
  { name: 'Proteína', value: 40 },
  { name: 'Creatina', value: 25 },
  { name: 'Pre-entreno', value: 15 },
  { name: 'Aminoácidos', value: 10 },
  { name: 'Otros', value: 10 },
];

// Mock investment and profit data
const investmentData = [
  { name: 'Ene', inversion: 2500, retorno: 4000, ganancia: 1500 },
  { name: 'Feb', inversion: 2000, retorno: 3000, ganancia: 1000 },
  { name: 'Mar', inversion: 3000, retorno: 5000, ganancia: 2000 },
  { name: 'Abr', inversion: 1800, retorno: 2780, ganancia: 980 },
  { name: 'May', inversion: 1200, retorno: 1890, ganancia: 690 },
  { name: 'Jun', inversion: 1500, retorno: 2390, ganancia: 890 },
];

// Colors for pie charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ControlPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [timePeriod, setTimePeriod] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');

  // Format price helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Statistics cards
  const statsCards = [
    {
      title: 'Ventas Mensuales',
      value: formatPrice(3450000),
      change: '+12.5%',
      changeType: 'positive',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'bg-blue-500',
    },
    {
      title: 'Pedidos Nuevos',
      value: '124',
      change: '+8.2%',
      changeType: 'positive',
      icon: <ShoppingCart className="w-6 h-6" />,
      color: 'bg-green-500',
    },
    {
      title: 'Clientes',
      value: '1,452',
      change: '+5.1%',
      changeType: 'positive',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-purple-500',
    },
    {
      title: 'Productos',
      value: '86',
      change: '+2.4%',
      changeType: 'positive',
      icon: <Package className="w-6 h-6" />,
      color: 'bg-orange-500',
    },
  ];

  // Low stock alerts
  const lowStockProducts = [
    { id: '1', name: 'Proteína Whey Gold Standard', stock: 2, minStock: 5 },
    { id: '2', name: 'Creatina Monohidrato', stock: 3, minStock: 10 },
    { id: '3', name: 'Pre-entreno C4', stock: 4, minStock: 5 },
  ];

  // Recent orders
  const recentOrders = [
    { id: 'ORD-001234', customer: 'Carlos Rodríguez', date: '2023-12-15', total: 45000, status: 'completed' },
    { id: 'ORD-001235', customer: 'María López', date: '2023-12-10', total: 65000, status: 'processing' },
    { id: 'ORD-001236', customer: 'Juan Pérez', date: '2023-12-05', total: 55000, status: 'shipped' },
    { id: 'ORD-001237', customer: 'Ana Jiménez', date: '2023-11-28', total: 35000, status: 'cancelled' },
  ];

  // Top selling products
  const topSellingProducts = [
    { id: '1', name: 'Proteína Whey Gold Standard', sales: 52, revenue: 1560000, investment: 900000, profit: 660000 },
    { id: '2', name: 'Creatina Monohidrato', sales: 43, revenue: 645000, investment: 380000, profit: 265000 },
    { id: '3', name: 'Pre-entreno C4', sales: 38, revenue: 950000, investment: 570000, profit: 380000 },
    { id: '4', name: 'BCAA 2:1:1', sales: 35, revenue: 700000, investment: 420000, profit: 280000 },
    { id: '5', name: 'Mass Gainer', sales: 29, revenue: 1160000, investment: 700000, profit: 460000 },
  ];

  // Training plan clients
  const trainingPlanClients = [
    { id: '1', name: 'Roberto Sánchez', plan: 'Principiante', startDate: '2023-10-01', progress: 75 },
    { id: '2', name: 'Lucía Hernández', plan: 'Powerlifting', startDate: '2023-09-15', progress: 60 },
    { id: '3', name: 'Diego Mora', plan: 'Culturismo', startDate: '2023-11-10', progress: 40 },
    { id: '4', name: 'Carmen Vega', plan: 'Personalizado', startDate: '2023-12-05', progress: 25 },
  ];

  // Client inquiries/messages
  const clientInquiries = [
    { id: '1', name: 'Felipe Torres', date: '2023-12-10', subject: 'Consulta sobre proteínas', status: 'pending' },
    { id: '2', name: 'Daniela Rojas', date: '2023-12-08', subject: 'Problema con mi pedido', status: 'answered' },
    { id: '3', name: 'Marcelo Araya', date: '2023-12-05', subject: 'Interés en plan de entrenamiento', status: 'pending' },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CR');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Pendiente</span>;
      case 'processing':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Procesando</span>;
      case 'shipped':
        return <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded">Enviado</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Completado</span>;
      case 'cancelled':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Cancelado</span>;
      case 'answered':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Respondido</span>;
      default:
        return <span className="px-2 py-1 bg-spartan-gray-100 text-spartan-gray-800 text-xs rounded">{status}</span>;
    }
  };

  // Detailed Analytics Component for Orders
  const OrdersAnalytics = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Análisis de Pedidos</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mes</SelectItem>
              <SelectItem value="quarter">Este trimestre</SelectItem>
              <SelectItem value="year">Este año</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-2">Total de Pedidos</h3>
          <p className="text-3xl font-bold">567</p>
          <p className="text-sm text-green-600">↑ 12.5% vs periodo anterior</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-2">Valor Promedio</h3>
          <p className="text-3xl font-bold">{formatPrice(52000)}</p>
          <p className="text-sm text-green-600">↑ 5.2% vs periodo anterior</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-2">Tasa de Conversión</h3>
          <p className="text-3xl font-bold">8.7%</p>
          <p className="text-sm text-red-600">↓ 1.3% vs periodo anterior</p>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="text-lg font-medium mb-4">Evolución de Pedidos</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}`, 'Pedidos']} />
              <Line type="monotone" dataKey="ventas" stroke="#4f46e5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-5">
          <h3 className="text-lg font-medium mb-4">Estado de Pedidos</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Completados', value: 350 },
                    { name: 'En Proceso', value: 120 },
                    { name: 'Enviados', value: 80 },
                    { name: 'Cancelados', value: 17 },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <h3 className="text-lg font-medium mb-4">Métodos de Pago</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Tarjeta de Crédito', value: 250 },
                    { name: 'Transferencia', value: 180 },
                    { name: 'SINPE Móvil', value: 120 },
                    { name: 'Otro', value: 17 },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );

  // Detailed Analytics Component for Products
  const ProductsAnalytics = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Análisis de Productos</h2>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por producto..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select defaultValue={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              <SelectItem value="protein">Proteínas</SelectItem>
              <SelectItem value="creatine">Creatina</SelectItem>
              <SelectItem value="preworkout">Pre-entreno</SelectItem>
              <SelectItem value="vitamins">Vitaminas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-2">Productos Activos</h3>
          <p className="text-3xl font-bold">86</p>
          <p className="text-sm text-green-600">↑ 6 productos nuevos</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-2">Ventas Totales</h3>
          <p className="text-3xl font-bold">{formatPrice(2950000)}</p>
          <p className="text-sm text-green-600">↑ 15.3% vs periodo anterior</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-2">Margen Promedio</h3>
          <p className="text-3xl font-bold">42.8%</p>
          <p className="text-sm text-green-600">↑ 2.1% vs periodo anterior</p>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="text-lg font-medium mb-4">Ventas por Categoría</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { name: 'Proteínas', ventas: 1200000 },
                { name: 'Creatina', ventas: 850000 },
                { name: 'Pre-entreno', ventas: 650000 },
                { name: 'Vitaminas', ventas: 350000 },
                { name: 'Otros', ventas: 250000 },
              ]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${formatPrice(value as number)}`, 'Ventas']} />
              <Bar dataKey="ventas" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="text-lg font-medium mb-4">Análisis de Inversión y Ganancia</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={investmentData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${formatPrice(value as number)}`, '']} />
              <Legend />
              <Bar dataKey="inversion" fill="#8884d8" name="Inversión" />
              <Bar dataKey="retorno" fill="#82ca9d" name="Retorno" />
              <Bar dataKey="ganancia" fill="#ffc658" name="Ganancia" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <h3 className="text-xl font-bold mt-8 mb-4">Productos Más Vendidos</h3>
      <div className="grid gap-4">
        {topSellingProducts.map((product) => (
          <Card key={product.id} className="p-4">
            <div className="flex justify-between">
              <div>
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-sm text-spartan-gray-500">{product.sales} unidades vendidas</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatPrice(product.revenue)}</p>
                <p className="text-sm text-green-600">Ganancia: {formatPrice(product.profit)}</p>
              </div>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-blue-600 rounded-full" 
                style={{ width: `${(product.profit / product.revenue) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>Margen: {((product.profit / product.revenue) * 100).toFixed(1)}%</span>
              <span>ROI: {((product.profit / product.investment) * 100).toFixed(1)}%</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  // Training Plans Analytics Component
  const TrainingPlansAnalytics = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Análisis de Planes de Entrenamiento</h2>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar cliente..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los planes</SelectItem>
              <SelectItem value="beginner">Principiante</SelectItem>
              <SelectItem value="powerlifting">Powerlifting</SelectItem>
              <SelectItem value="bodybuilding">Culturismo</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-2">Clientes Activos</h3>
          <p className="text-3xl font-bold">248</p>
          <p className="text-sm text-green-600">↑ 18 nuevos este mes</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-2">Principiante</h3>
          <p className="text-3xl font-bold">87</p>
          <p className="text-sm">35% del total</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-2">Powerlifting</h3>
          <p className="text-3xl font-bold">65</p>
          <p className="text-sm">26% del total</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-2">Culturismo</h3>
          <p className="text-3xl font-bold">96</p>
          <p className="text-sm">39% del total</p>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="text-lg font-medium mb-4">Distribución de Planes</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: 'Principiante', value: 87 },
                  { name: 'Powerlifting', value: 65 },
                  { name: 'Culturismo', value: 96 },
                  { name: 'Personalizado', value: 0 },
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <h3 className="text-xl font-bold mt-8 mb-4">Clientes en Planes</h3>
      {trainingPlanClients.map(client => (
        <Card key={client.id} className="p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">{client.name}</h4>
              <p className="text-sm text-spartan-gray-500">
                Plan: {client.plan} | Inicio: {formatDate(client.startDate)}
              </p>
            </div>
            <Button size="sm">Ver perfil</Button>
          </div>
          <div className="mt-2">
            <p className="text-sm mb-1">Progreso del plan: {client.progress}%</p>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-blue-600 rounded-full" 
                style={{ width: `${client.progress}%` }}
              ></div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  // Client Inquiries Analytics Component
  const InquiriesAnalytics = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Mensajes y Consultas de Clientes</h2>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar mensajes..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="pending">Pendientes</SelectItem>
              <SelectItem value="answered">Respondidos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-2">Total Mensajes</h3>
          <p className="text-3xl font-bold">124</p>
          <p className="text-sm text-green-600">↑ 15 nuevos esta semana</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-2">Pendientes</h3>
          <p className="text-3xl font-bold">28</p>
          <p className="text-sm text-amber-600">23% del total</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-2">Tiempo de Respuesta</h3>
          <p className="text-3xl font-bold">8h</p>
          <p className="text-sm text-green-600">↓ 25% más rápido</p>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="text-lg font-medium mb-4">Categorías de Consultas</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: 'Productos', value: 45 },
                  { name: 'Pedidos', value: 35 },
                  { name: 'Planes', value: 25 },
                  { name: 'Otros', value: 19 },
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <h3 className="text-xl font-bold mt-8 mb-4">Mensajes Recientes</h3>
      {clientInquiries.map(inquiry => (
        <Card key={inquiry.id} className="p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">{inquiry.subject}</h4>
              <p className="text-sm text-spartan-gray-500">
                De: {inquiry.name} | Fecha: {formatDate(inquiry.date)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(inquiry.status)}
              <Button size="sm">Ver mensaje</Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Panel de Control</h1>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-spartan-gray-500">{card.title}</p>
                <p className="text-2xl font-bold mt-1">{card.value}</p>
              </div>
              <div className={`${card.color} text-white p-2 rounded-lg`}>
                {card.icon}
              </div>
            </div>
            <div className={`mt-2 flex items-center text-sm ${
              card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>{card.change} vs mes anterior</span>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Sales Chart */}
      <Card className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Ventas Mensuales</h2>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={salesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`${formatPrice(value as number)}`, 'Ventas']}
              />
              <Bar dataKey="ventas" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Low Stock Alerts */}
        <Card className="p-5">
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
                      Stock: <span className="text-red-600 font-medium">{product.stock}</span> / Mínimo: {product.minStock}
                    </p>
                  </div>
                  <button 
                    onClick={() => alert(`Reponer stock de ${product.name}`)}
                    className="px-3 py-1 bg-spartan-primary text-white text-sm rounded hover:bg-spartan-primary-dark"
                  >
                    Reponer
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>
        
        {/* Recent Orders */}
        <Card className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Pedidos Recientes</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" className="text-sm text-spartan-primary hover:underline">
                  Ver todos
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Análisis de Pedidos</DialogTitle>
                </DialogHeader>
                <OrdersAnalytics />
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-3">
            {recentOrders.map(order => (
              <div key={order.id} className="p-3 border border-spartan-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">{order.id}</p>
                  {getStatusBadge(order.status)}
                </div>
                <p className="text-sm text-spartan-gray-500">
                  Cliente: {order.customer}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-spartan-gray-500">{formatDate(order.date)}</p>
                  <p className="font-medium">{formatPrice(order.total)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Top Selling Products */}
        <Card className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Productos Más Vendidos</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" className="text-sm text-spartan-primary hover:underline">
                  Ver todos
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Análisis de Productos</DialogTitle>
                </DialogHeader>
                <ProductsAnalytics />
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-2">
            {topSellingProducts.map((product, index) => (
              <div key={product.id} className="flex items-center space-x-3 py-2 border-b border-spartan-gray-100 last:border-0">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-spartan-primary/10 text-spartan-primary font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium truncate">{product.name}</p>
                  <div className="flex justify-between text-sm text-spartan-gray-500">
                    <span>{product.sales} vendidos</span>
                    <span>{formatPrice(product.revenue)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Additional analytics tabs */}
      <Card className="p-5">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="trainingPlans">Planes de Entrenamiento</TabsTrigger>
            <TabsTrigger value="inquiries">Mensajes y Consultas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Resumen de Rendimiento</h2>
              <Select defaultValue={timePeriod} onValueChange={setTimePeriod}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Periodo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Esta semana</SelectItem>
                  <SelectItem value="month">Este mes</SelectItem>
                  <SelectItem value="quarter">Este trimestre</SelectItem>
                  <SelectItem value="year">Este año</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base font-medium mb-2">Análisis de Inversión y Ganancia</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={investmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${formatPrice(value as number)}`, '']} />
                      <Legend />
                      <Bar dataKey="inversion" fill="#8884d8" name="Inversión" />
                      <Bar dataKey="ganancia" fill="#82ca9d" name="Ganancia" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h3 className="text-base font-medium mb-2">Distribución por Categoría</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={productCategoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {productCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trainingPlans" className="mt-0">
            <TrainingPlansAnalytics />
          </TabsContent>
          
          <TabsContent value="inquiries" className="mt-0">
            <InquiriesAnalytics />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ControlPanel;
