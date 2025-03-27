
import React, { useState } from 'react';
import { Search, Filter, Edit, Trash2, Mail, Phone, Eye, ArrowUpDown } from 'lucide-react';
import { Button } from '../../components/ui/button-custom';

// Mock client data
const mockClients = [
  {
    id: '1',
    name: 'Carlos Rodríguez',
    email: 'carlos@example.com',
    phone: '8889-1234',
    totalOrders: 5,
    totalSpent: 150000,
    lastOrder: '2023-12-15',
    status: 'active',
  },
  {
    id: '2',
    name: 'María López',
    email: 'maria@example.com',
    phone: '7779-5678',
    totalOrders: 3,
    totalSpent: 98000,
    lastOrder: '2023-11-28',
    status: 'active',
  },
  {
    id: '3',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '6669-9012',
    totalOrders: 1,
    totalSpent: 45000,
    lastOrder: '2023-10-05',
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Ana Jiménez',
    email: 'ana@example.com',
    phone: '5559-3456',
    totalOrders: 8,
    totalSpent: 320000,
    lastOrder: '2023-12-20',
    status: 'active',
  },
  {
    id: '5',
    name: 'Roberto Chavarría',
    email: 'roberto@example.com',
    phone: '4449-7890',
    totalOrders: 2,
    totalSpent: 87000,
    lastOrder: '2023-09-12',
    status: 'inactive',
  },
];

type SortField = 'name' | 'totalOrders' | 'totalSpent' | 'lastOrder';
type SortDirection = 'asc' | 'desc';

const ClientManagement = () => {
  const [clients, setClients] = useState(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [sortField, setSortField] = useState<SortField>('lastOrder');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedClients = [...clients].sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'totalOrders':
        comparison = a.totalOrders - b.totalOrders;
        break;
      case 'totalSpent':
        comparison = a.totalSpent - b.totalSpent;
        break;
      case 'lastOrder':
        comparison = new Date(a.lastOrder).getTime() - new Date(b.lastOrder).getTime();
        break;
      default:
        comparison = 0;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const filteredClients = sortedClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.phone.includes(searchTerm);
    const matchesStatus = selectedStatus === 'all' || client.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleDeleteClient = (clientId: string) => {
    // In a real application, send a request to the backend
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      setClients(clients.filter(c => c.id !== clientId));
    }
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Clientes</h1>
      </div>

      {/* Filters and search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spartan-gray-400" />
            <input 
              type="text"
              placeholder="Buscar clientes..."
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
                onChange={e => setSelectedStatus(e.target.value as 'all' | 'active' | 'inactive')}
                className="w-full pl-10 pr-4 py-2 border border-spartan-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-spartan-primary appearance-none"
              >
                <option value="all">Todos los estados</option>
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Clients table */}
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
                    <span>Cliente</span>
                    <ArrowUpDown className={`w-4 h-4 ${sortField === 'name' ? 'text-spartan-primary' : 'text-spartan-gray-400'}`} />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium text-spartan-gray-700">Contacto</th>
                <th className="text-left py-3 px-4 font-medium text-spartan-gray-700">
                  <button 
                    className="flex items-center space-x-1 focus:outline-none"
                    onClick={() => handleSort('totalOrders')}
                  >
                    <span>Pedidos</span>
                    <ArrowUpDown className={`w-4 h-4 ${sortField === 'totalOrders' ? 'text-spartan-primary' : 'text-spartan-gray-400'}`} />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium text-spartan-gray-700">
                  <button 
                    className="flex items-center space-x-1 focus:outline-none"
                    onClick={() => handleSort('totalSpent')}
                  >
                    <span>Total Gastado</span>
                    <ArrowUpDown className={`w-4 h-4 ${sortField === 'totalSpent' ? 'text-spartan-primary' : 'text-spartan-gray-400'}`} />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium text-spartan-gray-700">
                  <button 
                    className="flex items-center space-x-1 focus:outline-none"
                    onClick={() => handleSort('lastOrder')}
                  >
                    <span>Último Pedido</span>
                    <ArrowUpDown className={`w-4 h-4 ${sortField === 'lastOrder' ? 'text-spartan-primary' : 'text-spartan-gray-400'}`} />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium text-spartan-gray-700">Estado</th>
                <th className="text-left py-3 px-4 font-medium text-spartan-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-spartan-gray-100">
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-spartan-gray-500">
                    No se encontraron clientes que coincidan con los criterios de búsqueda.
                  </td>
                </tr>
              ) : (
                filteredClients.map(client => (
                  <tr key={client.id} className="hover:bg-spartan-light transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-spartan-primary text-white rounded-full flex items-center justify-center font-medium">
                          {client.name.charAt(0)}
                        </div>
                        <span className="font-medium">{client.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="w-4 h-4 mr-2 text-spartan-gray-400" />
                          <span>{client.email}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="w-4 h-4 mr-2 text-spartan-gray-400" />
                          <span>{client.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">{client.totalOrders}</td>
                    <td className="py-3 px-4 font-medium">{formatPrice(client.totalSpent)}</td>
                    <td className="py-3 px-4 text-sm">{formatDate(client.lastOrder)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded ${
                        client.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-spartan-gray-100 text-spartan-gray-600'
                      }`}>
                        {client.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => alert(`Ver detalles del cliente ${client.id}`)}
                          className="text-spartan-gray-700 hover:text-spartan-primary p-1"
                          title="Ver cliente"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => alert(`Editar cliente ${client.id}`)}
                          className="text-spartan-gray-700 hover:text-spartan-primary p-1"
                          title="Editar cliente"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteClient(client.id)}
                          className="text-spartan-gray-700 hover:text-red-500 p-1"
                          title="Eliminar cliente"
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
    </div>
  );
};

export default ClientManagement;
