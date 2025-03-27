
import React from 'react';
import { User, ShoppingBag, Calendar, ArrowRight, Package, Dumbbell } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Card } from "../../components/ui/card";

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: { name: string; quantity: number; price: number }[];
}

interface TrainingPlan {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  progress: number;
  trainer: string;
}

interface ClientDetailsProps {
  client: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    registeredDate: string;
    orders: Order[];
    trainingPlans: TrainingPlan[];
  };
}

const ClientDetails = ({ client }: ClientDetailsProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CR');
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      maximumFractionDigits: 0,
    }).format(price);
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
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{client.name}</h2>
          <p className="text-spartan-gray-500">Cliente desde {formatDate(client.registeredDate)}</p>
        </div>
        <Button variant="outline">Editar información</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-spartan-primary/10 p-2 rounded-full">
              <User className="h-5 w-5 text-spartan-primary" />
            </div>
            <div>
              <p className="text-spartan-gray-500 text-sm">Contacto</p>
              <p className="font-medium">{client.email}</p>
              <p className="text-sm">{client.phone}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <ShoppingBag className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-spartan-gray-500 text-sm">Pedidos totales</p>
              <p className="font-medium">{client.orders.length}</p>
              <p className="text-sm">Último: {client.orders.length > 0 ? formatDate(client.orders[0].date) : 'N/A'}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-full">
              <Dumbbell className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-spartan-gray-500 text-sm">Planes activos</p>
              <p className="font-medium">{client.trainingPlans.filter(p => new Date(p.endDate) > new Date()).length}</p>
              <p className="text-sm">Total: {client.trainingPlans.length}</p>
            </div>
          </div>
        </Card>
      </div>
      
      <Tabs defaultValue="orders" className="mt-6">
        <TabsList>
          <TabsTrigger value="orders">Historial de compras</TabsTrigger>
          <TabsTrigger value="plans">Planes de entrenamiento</TabsTrigger>
          <TabsTrigger value="info">Información personal</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders" className="mt-4">
          <Card>
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium">Historial de pedidos</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Pedido</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {client.orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center text-spartan-gray-500">
                      El cliente no tiene pedidos registrados.
                    </TableCell>
                  </TableRow>
                ) : (
                  client.orders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{formatDate(order.date)}</TableCell>
                      <TableCell>{formatPrice(order.total)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">Ver detalles</Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
        
        <TabsContent value="plans" className="mt-4">
          <Card>
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium">Planes de entrenamiento</h3>
            </div>
            {client.trainingPlans.length === 0 ? (
              <div className="p-8 text-center text-spartan-gray-500">
                El cliente no tiene planes de entrenamiento registrados.
              </div>
            ) : (
              <div className="divide-y">
                {client.trainingPlans.map(plan => (
                  <div key={plan.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{plan.name}</h4>
                        <p className="text-sm text-spartan-gray-500">
                          {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
                        </p>
                        <p className="text-sm">Entrenador: {plan.trainer}</p>
                      </div>
                      <Button size="sm">Registrar progreso</Button>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm mb-1">Progreso: {plan.progress}%</p>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-blue-600 rounded-full" 
                          style={{ width: `${plan.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="info" className="mt-4">
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Información personal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-spartan-gray-500">Nombre completo</p>
                  <p className="font-medium">{client.name}</p>
                </div>
                <div>
                  <p className="text-sm text-spartan-gray-500">Correo electrónico</p>
                  <p className="font-medium">{client.email}</p>
                </div>
                <div>
                  <p className="text-sm text-spartan-gray-500">Teléfono</p>
                  <p className="font-medium">{client.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-spartan-gray-500">Fecha de registro</p>
                  <p className="font-medium">{formatDate(client.registeredDate)}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Dirección</h3>
              <p className="text-spartan-gray-700">{client.address}</p>
            </div>
            
            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full">Editar información personal</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDetails;
