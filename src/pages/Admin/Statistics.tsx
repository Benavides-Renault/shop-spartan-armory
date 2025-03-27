
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Button } from '../../components/ui/button-custom';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/table";
import { DownloadIcon, TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// Mock data for charts and metrics
const monthlyVisitorsData = [
  { name: 'Ene', visitors: 3200 },
  { name: 'Feb', visitors: 3500 },
  { name: 'Mar', visitors: 4100 },
  { name: 'Abr', visitors: 4300 },
  { name: 'May', visitors: 4800 },
  { name: 'Jun', visitors: 5100 },
  { name: 'Jul', visitors: 5600 },
  { name: 'Ago', visitors: 5900 },
  { name: 'Sep', visitors: 6200 },
  { name: 'Oct', visitors: 6500 },
  { name: 'Nov', visitors: 6800 },
  { name: 'Dic', visitors: 7200 },
];

const conversionRateData = [
  { name: 'Ene', rate: 2.2 },
  { name: 'Feb', rate: 2.4 },
  { name: 'Mar', rate: 2.7 },
  { name: 'Abr', rate: 3.1 },
  { name: 'May', rate: 3.3 },
  { name: 'Jun', rate: 3.6 },
  { name: 'Jul', rate: 3.8 },
  { name: 'Ago', rate: 4.1 },
  { name: 'Sep', rate: 4.3 },
  { name: 'Oct', rate: 4.5 },
  { name: 'Nov', rate: 4.7 },
  { name: 'Dic', rate: 5.0 },
];

const deviceData = [
  { name: 'Móvil', value: 65 },
  { name: 'Desktop', value: 30 },
  { name: 'Tablet', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const trafficSourceData = [
  { name: 'Orgánico', value: 40 },
  { name: 'Redes Sociales', value: 30 },
  { name: 'Directo', value: 15 },
  { name: 'Email', value: 10 },
  { name: 'Otros', value: 5 },
];

const TRAFFIC_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const topPages = [
  { page: "/productos/proteina-whey", visits: 2450, conversion: "3.8%" },
  { page: "/productos/creatina", visits: 1980, conversion: "4.2%" },
  { page: "/planes", visits: 1650, conversion: "5.1%" },
  { page: "/guias/principiantes", visits: 1240, conversion: "2.9%" },
  { page: "/productos/pre-entreno", visits: 980, conversion: "3.5%" },
];

const Statistics = () => {
  const { t } = useLanguage();
  
  // Helper to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // KPI cards data
  const kpiCards = [
    {
      title: "Visitantes Mensuales",
      value: "7,245",
      change: "+12.5%",
      icon: <Users className="w-6 h-6" />,
      color: "bg-blue-500"
    },
    {
      title: "Tasa de Conversión",
      value: "4.8%",
      change: "+0.7%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-green-500"
    },
    {
      title: "Pedidos Mensuales",
      value: "348",
      change: "+9.2%",
      icon: <ShoppingBag className="w-6 h-6" />,
      color: "bg-purple-500"
    },
    {
      title: "Valor Promedio",
      value: formatCurrency(24500),
      change: "+5.8%",
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-orange-500"
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Estadísticas</h1>
        <Button>
          <DownloadIcon className="mr-2 h-4 w-4" />
          Exportar Reporte
        </Button>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, index) => (
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
            <div className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>{card.change} vs mes anterior</span>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Visitors Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Visitantes Mensuales</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyVisitorsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}`, 'Visitantes']} />
                <Legend />
                <Bar dataKey="visitors" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Conversion Rate Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Tasa de Conversión (%)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionRateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Tasa de Conversión']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Device Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución por Dispositivos</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Traffic Sources Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Fuentes de Tráfico</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {trafficSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={TRAFFIC_COLORS[index % TRAFFIC_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Top Pages Table */}
      <Card>
        <CardHeader>
          <CardTitle>Páginas Más Visitadas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Página</TableHead>
                <TableHead className="text-right">Visitas</TableHead>
                <TableHead className="text-right">Tasa de Conversión</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPages.map((page, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{page.page}</TableCell>
                  <TableCell className="text-right">{page.visits.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{page.conversion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* User Behavior Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Comportamiento de Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Tiempo Promedio en el Sitio</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">3:42</span>
                  <span className="text-sm text-green-600">↑ 8% vs mes anterior</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Páginas por Sesión</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">4.2</span>
                  <span className="text-sm text-green-600">↑ 5% vs mes anterior</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Tasa de Rebote</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">32%</span>
                  <span className="text-sm text-green-600">↓ 3% vs mes anterior</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tendencias de Búsqueda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Proteína Whey</span>
                  <span className="text-green-600 text-sm">+42%</span>
                </div>
              </div>
              
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Creatina</span>
                  <span className="text-green-600 text-sm">+38%</span>
                </div>
              </div>
              
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Pre-entreno</span>
                  <span className="text-green-600 text-sm">+25%</span>
                </div>
              </div>
              
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Plan de entrenamiento</span>
                  <span className="text-green-600 text-sm">+21%</span>
                </div>
              </div>
              
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">BCAA</span>
                  <span className="text-green-600 text-sm">+18%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Statistics;
