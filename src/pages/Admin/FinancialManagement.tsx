
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowDownIcon, ArrowUpIcon, Calendar, Download, TrendingUp, DollarSign, CreditCard, Package } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// Datos de ejemplo para las gráficas
const salesData = [
  { name: 'Ene', ventas: 4000 },
  { name: 'Feb', ventas: 3000 },
  { name: 'Mar', ventas: 5000 },
  { name: 'Abr', ventas: 2780 },
  { name: 'May', ventas: 1890 },
  { name: 'Jun', ventas: 2390 },
  { name: 'Jul', ventas: 3490 },
  { name: 'Ago', ventas: 4200 },
  { name: 'Sep', ventas: 5100 },
  { name: 'Oct', ventas: 4300 },
  { name: 'Nov', ventas: 3900 },
  { name: 'Dic', ventas: 6200 },
];

const topProductsData = [
  { name: "Proteína Whey Gold", value: 40 },
  { name: "Creatina Monohidrato", value: 30 },
  { name: "Pre-entreno Extreme", value: 20 },
  { name: "BCAA Complex", value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const recentTransactions = [
  { id: 1, date: '2023-10-15', description: 'Venta #12345', amount: 75.99, status: 'completed' },
  { id: 2, date: '2023-10-14', description: 'Venta #12344', amount: 129.50, status: 'completed' },
  { id: 3, date: '2023-10-14', description: 'Reembolso #12343', amount: -45.00, status: 'refunded' },
  { id: 4, date: '2023-10-13', description: 'Venta #12342', amount: 89.95, status: 'completed' },
  { id: 5, date: '2023-10-12', description: 'Venta #12341', amount: 199.99, status: 'completed' },
];

const FinancialManagement = () => {
  const { t } = useLanguage();
  const [timePeriod, setTimePeriod] = useState('year');
  
  // Calcular totales para el resumen
  const revenue = salesData.reduce((sum, item) => sum + item.ventas, 0);
  const expenses = revenue * 0.6; // Para este ejemplo, los gastos son el 60% de los ingresos
  const profit = revenue - expenses;
  
  // Formatear como moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      minimumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">{t('admin.finance.title')}</h1>
        <div className="flex items-center gap-4">
          <Select defaultValue={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('admin.finance.period')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mes</SelectItem>
              <SelectItem value="quarter">Este trimestre</SelectItem>
              <SelectItem value="year">Este año</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            {t('admin.finance.download')}
          </Button>
        </div>
      </div>
      
      {/* Tarjetas de resumen */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('admin.finance.revenue')}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(revenue)}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% respecto al periodo anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('admin.finance.expenses')}
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(expenses)}</div>
            <p className="text-xs text-muted-foreground">
              +12.2% respecto al periodo anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('admin.finance.profit')}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(profit)}</div>
            <p className="text-xs text-muted-foreground">
              +32.5% respecto al periodo anterior
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Gráfico principal y tabla */}
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>{t('admin.finance.salesByMonth')}</CardTitle>
            <CardDescription>Ingresos mensuales durante el año actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Bar dataKey="ventas" fill="#8884d8" name="Ventas" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>{t('admin.finance.topProducts')}</CardTitle>
            <CardDescription>Por volumen de ventas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topProductsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {topProductsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabla de transacciones recientes */}
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.finance.recentTransactions')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left">{t('admin.finance.date')}</th>
                  <th className="px-4 py-3 text-left">{t('admin.finance.description')}</th>
                  <th className="px-4 py-3 text-right">{t('admin.finance.amount')}</th>
                  <th className="px-4 py-3 text-right">{t('admin.finance.status')}</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="px-4 py-3">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">{transaction.description}</td>
                    <td className={`px-4 py-3 text-right ${transaction.amount < 0 ? 'text-red-500' : ''}`}>
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span 
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          transaction.status === 'completed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}
                      >
                        {transaction.status === 'completed' ? 'Completado' : 'Reembolsado'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialManagement;
