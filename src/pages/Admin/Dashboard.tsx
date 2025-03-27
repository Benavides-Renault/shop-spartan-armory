
import React from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  BarChart, 
  LogOut,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import ThemeSwitcher from '../../components/ui/ThemeSwitcher';
import LanguageSwitcher from '../../components/ui/LanguageSwitcher';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { t } = useLanguage();
  
  const navItems = [
    { 
      name: t('admin.dashboard'), 
      path: '/admin', 
      icon: LayoutDashboard,
      exact: true
    },
    { 
      name: t('admin.products'), 
      path: '/admin/productos', 
      icon: Package,
      exact: false
    },
    { 
      name: t('admin.orders'), 
      path: '/admin/pedidos', 
      icon: ShoppingCart,
      exact: false
    },
    { 
      name: t('admin.clients'), 
      path: '/admin/clientes', 
      icon: Users,
      exact: false
    },
    { 
      name: t('admin.guides'), 
      path: '/admin/guias', 
      icon: BookOpen,
      exact: false
    },
    { 
      name: t('admin.stats'), 
      path: '/admin/estadisticas', 
      icon: BarChart,
      exact: false
    },
    { 
      name: t('admin.settings'), 
      path: '/admin/configuracion', 
      icon: Settings,
      exact: false
    },
  ];
  
  const isActive = (path: string, exact: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
  
  // Si no hay usuario o no es admin, redirigir al inicio
  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8 rounded-lg shadow-md bg-card">
          <h1 className="text-2xl font-bold mb-4">{t('admin.restricted')}</h1>
          <p className="mb-6">{t('admin.noPermission')}</p>
          <Link 
            to="/" 
            className="inline-flex items-center text-spartan-primary hover:underline"
          >
            {t('admin.backToHome')}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card shadow-md flex-shrink-0 fixed h-full z-10 border-r border-border">
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-foreground">
                Spartan<span className="text-spartan-primary">Admin</span>
              </span>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                      isActive(item.path, item.exact)
                        ? 'bg-spartan-primary text-white'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Theme and Language switchers */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
            
            {/* User info and logout */}
            <div className="flex items-center space-x-3 px-3 py-2 mb-2">
              <div className="w-8 h-8 bg-spartan-primary text-white rounded-full flex items-center justify-center">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <button 
              onClick={logout}
              className="flex items-center space-x-3 w-full px-3 py-2 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>{t('admin.logout')}</span>
            </button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 ml-64">
        {/* Breadcrumb/Header */}
        <header className="bg-card shadow-sm p-4 sticky top-0 z-0 border-b border-border">
          <div className="flex items-center text-sm">
            <Link to="/admin" className="text-muted-foreground hover:text-spartan-primary">
              {t('admin.dashboard')}
            </Link>
            {location.pathname !== '/admin' && (
              <>
                <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground" />
                <span className="text-foreground">
                  {navItems.find(item => 
                    location.pathname.startsWith(item.path) && item.path !== '/admin'
                  )?.name || t('admin.page')}
                </span>
              </>
            )}
          </div>
        </header>
        
        {/* Page content */}
        <main className="p-6 bg-background text-foreground">
          {location.pathname === '/admin' && (
            <div className="text-center py-12">
              <h1 className="text-3xl font-bold mb-4">{t('admin.welcomeTitle')}</h1>
              <p className="text-muted-foreground">
                {user.name}, {t('admin.welcomeMessage')}
              </p>
            </div>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
