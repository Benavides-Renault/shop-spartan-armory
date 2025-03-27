
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import TrainingPlans from "./pages/TrainingPlans";
import Guides from "./pages/Guides";
import GuideDetail from "./pages/GuideDetail";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import MyAccount from "./pages/MyAccount";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/Admin/Dashboard";
import ProductManagement from "./pages/Admin/ProductManagement";
import SalesManagement from "./pages/Admin/SalesManagement";
import InventoryManagement from "./pages/Admin/InventoryManagement";
import FinancialManagement from "./pages/Admin/FinancialManagement";
import ContactManagement from "./pages/Admin/ContactManagement";
import ConfigurationManagement from "./pages/Admin/ConfigurationManagement";
import ClientManagement from "./pages/Admin/ClientManagement";
import OrderManagement from "./pages/Admin/OrderManagement";
import GuideManagement from "./pages/Admin/GuideManagement";
import ControlPanel from "./pages/Admin/ControlPanel";
import Statistics from "./pages/Admin/Statistics";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import BeginnerPlan from "./pages/PlanDetails/BeginnerPlan";
import PowerliftingPlan from "./pages/PlanDetails/PowerliftingPlan";
import BodybuildingPlan from "./pages/PlanDetails/BodybuildingPlan";
import CustomPlan from "./pages/PlanDetails/CustomPlan";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <AuthProvider>
            <CartProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Rutas públicas */}
                  <Route path="/" element={<Index />} />
                  <Route path="/productos" element={<Products />} />
                  <Route path="/productos/categoria/:category" element={<Products />} />
                  <Route path="/productos/:id" element={<ProductDetail />} />
                  <Route path="/carrito" element={<Cart />} />
                  <Route path="/planes" element={<TrainingPlans />} />
                  <Route path="/planes/principiante" element={<BeginnerPlan />} />
                  <Route path="/planes/powerlifting" element={<PowerliftingPlan />} />
                  <Route path="/planes/culturismo" element={<BodybuildingPlan />} />
                  <Route path="/planes/personalizado" element={<CustomPlan />} />
                  <Route path="/guias" element={<Guides />} />
                  <Route path="/guias/:id" element={<GuideDetail />} />
                  <Route path="/contacto" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/servicios" element={<Products />} />
                  <Route path="/nosotros" element={<AboutUs />} />
                  
                  {/* Rutas de usuario */}
                  <Route path="/mi-cuenta" element={<MyAccount />} />
                  <Route path="/mis-pedidos" element={<MyOrders />} />
                  
                  {/* Rutas de administración */}
                  <Route path="/admin" element={<AdminDashboard />}>
                    <Route index element={<ControlPanel />} />
                    <Route path="productos" element={<ProductManagement />} />
                    <Route path="ventas" element={<SalesManagement />} />
                    <Route path="inventario" element={<InventoryManagement />} />
                    <Route path="finanzas" element={<FinancialManagement />} />
                    <Route path="contactos" element={<ContactManagement />} />
                    <Route path="configuracion" element={<ConfigurationManagement />} />
                    <Route path="pedidos" element={<OrderManagement />} />
                    <Route path="clientes" element={<ClientManagement />} />
                    <Route path="guias" element={<GuideManagement />} />
                    <Route path="estadisticas" element={<Statistics />} />
                  </Route>
                  
                  {/* Ruta 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </CartProvider>
          </AuthProvider>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
