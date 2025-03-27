
import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, Eye, Package, ArrowUpDown } from 'lucide-react';
import { Button } from '../../components/ui/button-custom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

// Mock order data
const mockOrders = [
  {
    id: 'ORD-001234',
    customer: {
      id: '1',
      name: 'Carlos Rodríguez',
      email: 'carlos@example.com',
    },
    date: '2023-12-15',
    status: 'completed',
    payment: {
      method: 'card',
      status: 'paid',
    },
    total: 45000,
    items: [
      { id: '1', name: 'Proteína Whey Gold Standard', quantity: 1, price: 30000 },
      { id: '2', name: 'Creatina Monohidrato', quantity: 1, price: 15000 },
    ]
  },
  {
    id: 'ORD-001235',
    customer: {
      id: '2',
      name: 'María López',
      email: 'maria@example.com',
    },
    date: '2023-12-10',
    status: 'processing',
    payment: {
      method: 'card',
      status: 'paid',
    },
    total: 65000,
    items: [
      { id: '3', name: 'Pre-entreno C4', quantity: 1, price: 25000 },
      { id: '4', name: 'BCAA 2:1:1', quantity: 2, price: 20000 },
    ]
  },
  {
    id: 'ORD-001236',
    customer: {
      id: '3',
      name: 'Juan Pérez',
      email: 'juan@example.com',
    },
    date: '2023-12-05',
    status: 'shipped',
    payment: {
      method: 'transfer',
      status: 'paid',
    },
    total: 55000,
    items: [
      { id: '5', name: 'Mass Gainer', quantity: 1, price: 40000 },
      { id: '6', name: 'ZMA', quantity: 1, price: 15000 },
    ]
  },
  {
    id: 'ORD-001237',
    customer: {
      id: '4',
      name: 'Ana Jiménez',
      email: 'ana@example.com',
    },
    date: '2023-11-28',
    status: 'cancelled',
    payment: {
      method: 'card',
      status: 'refunded',
    },
    total: 35000,
    items: [
      { id: '7', name: 'Fat Burner', quantity: 1, price: 35000 },
    ]
  },
  {
    id: 'ORD-001238',
    customer: {
      id: '5',
      name: 'Roberto Chavarría',
      email: 'roberto@example.com',
    },
    date: '2023-11-20',
    status: 'completed',
    payment: {
      method: 'cash',
      status: 'paid',
    },
    total: 85000,
    items: [
      { id: '8', name: 'Proteína Vegana', quantity: 1, price: 45000 },
      { id: '9', name: 'Multivitamínico', quantity: 2, price: 20000 },
    ]
  },
];

type SortField = 'id' | 'date' | 'customer' | 'total';
type SortDirection = 'asc' | 'desc';
type OrderStatus = 'all' | 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';
type TimePeriod = 'day' | 'week' | 'month' | 'year' | 'all';

const OrderManagement = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>('all');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('all');
  const [filteredOrders, setFilteredOrders] = useState(orders);

  // Filter orders based on time period
  useEffect(() => {
    // Filter orders by time period
    let periodFiltered = [...mockOrders];
    
    if (timePeriod !== 'all') {
      const now = new Date();
      let startDate = new Date();
      
      switch (timePeriod) {
        case 'day':
          startDate.setDate(now.getDate() - 1);
          break;
        case 'week':
          startDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          startDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      periodFiltered = mockOrders.filter(order => {
        const orderDate = new Date(order.date);
        return orderDate >= startDate && orderDate <= now;
      });
    }
    
    setOrders(periodFiltered);
  }, [timePeriod]);

  // Apply sorting and filtering to orders
  useEffect(() => {
    // Apply sorting
    let sorted = [...orders].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'id':
          comparison = a.id.localeCompare(b.id);
          break;
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'customer':
          comparison = a.customer.name.localeCompare(b.customer.name);
          break;
        case 'total':
          comparison = a.total - b.total;
          break;
        default:
          comparison = 0;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    // Apply search and status filters
    const filtered = sorted.filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });

    setFilteredOrders(filtered);
  }, [orders, searchTerm, selectedStatus, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      maximumFractionDigits: 0,
    }).format(price);
  };

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
      default:
        return <span className="px-2 py-1 bg-spartan-gray-100 text-spartan-gray-800 text-xs rounded">{status}</span>;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'card':
        return <span className="text-blue-600">💳</span>;
      case 'transfer':
        return <span className="text-green-600">🏦</span>;
      case 'cash':
        return <span className="text-yellow-600">💵</span>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Pedidos</h1>
        <Select value={timePeriod} onValueChange={(value: TimePeriod) => setTimePeriod(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccione periodo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los pedidos</SelectItem>
            <SelectItem value="day">Últimas 24 horas</SelectItem>
            <SelectItem value="week">Última semana</SelectItem>
            <SelectItem value="month">Último mes</SelectItem>
            <SelectItem value="year">Último año</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Filters and search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spartan-gray-400" />
            <input 
              type="text"
              placeholder="Buscar pedidos..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-spartan-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-spartan-primary"
            />
          </div>

          <div className="md:w-64 flex">
            <div className="relative flex-1">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spartan-gray-400" />
              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value as OrderStatus)}
                className="w-full pl-10 pr-4 py-2 border border-spartan-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-spartan-primary appearance-none"
              >
                <option value="all">Todos los estados</option>
                <option value="pending">Pendiente</option>
                <option value="processing">Procesando</option>
                <option value="shipped">Enviado</option>
                <option value="completed">Completado</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Orders table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-spartan-light">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-spartan-gray-700 w-12"></th>
                <th className="text-left py-3 px-4 font-medium text-spartan-gray-700">
                  <button 
                    className="flex items-center space-x-1 focus:outline-none"
                    onClick={() => handleSort('id')}
                  >
                    <span>Pedido</span>
                    <ArrowUpDown className={`w-4 h-4 ${sortField === 'id' ? 'text-spartan-primary' : 'text-spartan-gray-400'}`} />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium text-spartan-gray-700">
                  <button 
                    className="flex items-center space-x-1 focus:outline-none"
                    onClick={() => handleSort('date')}
                  >
                    <span>Fecha</span>
                    <ArrowUpDown className={`w-4 h-4 ${sortField === 'date' ? 'text-spartan-primary' : 'text-spartan-gray-400'}`} />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium text-spartan-gray-700">
                  <button 
                    className="flex items-center space-x-1 focus:outline-none"
                    onClick={() => handleSort('customer')}
                  >
                    <span>Cliente</span>
                    <ArrowUpDown className={`w-4 h-4 ${sortField === 'customer' ? 'text-spartan-primary' : 'text-spartan-gray-400'}`} />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium text-spartan-gray-700">Estado</th>
                <th className="text-left py-3 px-4 font-medium text-spartan-gray-700">Pago</th>
                <th className="text-left py-3 px-4 font-medium text-spartan-gray-700">
                  <button 
                    className="flex items-center space-x-1 focus:outline-none"
                    onClick={() => handleSort('total')}
                  >
                    <span>Total</span>
                    <ArrowUpDown className={`w-4 h-4 ${sortField === 'total' ? 'text-spartan-primary' : 'text-spartan-gray-400'}`} />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium text-spartan-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-spartan-gray-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-spartan-gray-500">
                    No se encontraron pedidos que coincidan con los criterios de búsqueda.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <React.Fragment key={order.id}>
                    <tr className={`hover:bg-spartan-light transition-colors ${expandedOrderId === order.id ? 'bg-spartan-light' : ''}`}>
                      <td className="py-3 px-4 text-center">
                        <button 
                          onClick={() => toggleOrderDetails(order.id)}
                          className="text-spartan-gray-700 hover:text-spartan-primary focus:outline-none"
                        >
                          {expandedOrderId === order.id ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                      </td>
                      <td className="py-3 px-4 font-medium">{order.id}</td>
                      <td className="py-3 px-4">{formatDate(order.date)}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="font-medium">{order.customer.name}</span>
                          <span className="text-spartan-gray-500 text-sm">{order.customer.email}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {getPaymentMethodIcon(order.payment.method)}
                          <span className="ml-2 capitalize">{order.payment.method}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">{formatPrice(order.total)}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => alert(`Ver detalles del pedido ${order.id}`)}
                            className="text-spartan-gray-700 hover:text-spartan-primary p-1"
                            title="Ver pedido"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => alert(`Gestionar envío del pedido ${order.id}`)}
                            className="text-spartan-gray-700 hover:text-spartan-primary p-1"
                            title="Gestionar envío"
                          >
                            <Package className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedOrderId === order.id && (
                      <tr>
                        <td colSpan={8} className="bg-white border-t border-spartan-gray-100">
                          <div className="p-4">
                            <h4 className="font-medium mb-2">Detalles del pedido</h4>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead className="bg-spartan-light/50">
                                  <tr>
                                    <th className="text-left py-2 px-3 font-medium text-spartan-gray-700">Producto</th>
                                    <th className="text-left py-2 px-3 font-medium text-spartan-gray-700">Cantidad</th>
                                    <th className="text-left py-2 px-3 font-medium text-spartan-gray-700">Precio</th>
                                    <th className="text-left py-2 px-3 font-medium text-spartan-gray-700">Subtotal</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-spartan-gray-100">
                                  {order.items.map(item => (
                                    <tr key={item.id}>
                                      <td className="py-2 px-3">{item.name}</td>
                                      <td className="py-2 px-3">{item.quantity}</td>
                                      <td className="py-2 px-3">{formatPrice(item.price)}</td>
                                      <td className="py-2 px-3">{formatPrice(item.price * item.quantity)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot className="bg-spartan-light/30">
                                  <tr>
                                    <td colSpan={3} className="py-2 px-3 text-right font-medium">Total:</td>
                                    <td className="py-2 px-3 font-medium">{formatPrice(order.total)}</td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
