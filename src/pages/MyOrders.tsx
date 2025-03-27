
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock order data for demonstration
const MOCK_ORDERS = [
  {
    id: '1001',
    date: '2024-03-19',
    status: 'completed',
    total: 189.99
  },
  {
    id: '1002',
    date: '2024-03-14',
    status: 'shipped',
    total: 129.95
  }
];

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const { t, language } = useLanguage();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'shipped':
        return 'bg-blue-500 text-white';
      case 'processing':
        return 'bg-yellow-500 text-white';
      case 'cancelled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };
  
  // Get translation with fallback
  const getStatusText = (status: string) => {
    const key = `myorders.status.${status}`;
    const translation = t(key);
    
    // If translation key doesn't exist, use these fallbacks
    if (translation === key) {
      switch (status) {
        case 'completed':
          return language === 'es' ? 'Completado' : 'Completed';
        case 'shipped':
          return language === 'es' ? 'Enviado' : 'Shipped';
        case 'processing':
          return language === 'es' ? 'Procesando' : 'Processing';
        case 'cancelled':
          return language === 'es' ? 'Cancelado' : 'Cancelled';
        default:
          return status.charAt(0).toUpperCase() + status.slice(1);
      }
    }
    
    return translation;
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
      {getStatusText(status)}
    </span>
  );
};

// Format date helper with proper localization
const formatDate = (dateString: string, language: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const MyOrders = () => {
  const { user, isLoading } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  // Get translation with fallback
  const getTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };
  
  // Redirect if not logged in
  React.useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);
  
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">
      {getTranslation('common.loading', 'Cargando...')}
    </div>;
  }
  
  // Format currency based on language
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'es' ? 'es-ES' : 'en-US', {
      style: 'currency',
      currency: language === 'es' ? 'CRC' : 'USD',
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-20 px-4 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 mt-16">
          {getTranslation('myorders.title', 'Mis Pedidos')}
        </h1>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {getTranslation('myorders.orderHistory', 'Historial de Pedidos')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {MOCK_ORDERS.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {getTranslation('myorders.noOrders', 'No tienes pedidos aún')}
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => navigate('/productos')}
                >
                  {getTranslation('cart.continueShopping', 'Continuar Comprando')}
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-4 px-2 text-left">
                        {getTranslation('myorders.orderNumber', 'Número de Pedido')}
                      </th>
                      <th className="py-4 px-2 text-left">
                        {getTranslation('myorders.date', 'Fecha')}
                      </th>
                      <th className="py-4 px-2 text-left">
                        {getTranslation('myorders.status', 'Estado')}
                      </th>
                      <th className="py-4 px-2 text-right">
                        {getTranslation('myorders.total', 'Total')}
                      </th>
                      <th className="py-4 px-2 text-right">
                        {getTranslation('myorders.details', 'Detalles')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_ORDERS.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="py-4 px-2">
                          <span className="font-medium">#{order.id}</span>
                        </td>
                        <td className="py-4 px-2">
                          {formatDate(order.date, language)}
                        </td>
                        <td className="py-4 px-2">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="py-4 px-2 text-right">
                          {formatCurrency(order.total)}
                        </td>
                        <td className="py-4 px-2 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center"
                            onClick={() => navigate(`/mis-pedidos/${order.id}`)}
                          >
                            {getTranslation('myorders.details', 'Detalles')}
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
