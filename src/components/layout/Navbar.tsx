
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button-custom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { cn } from '@/lib/utils';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Cerrar menú móvil al cambiar de ruta
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  const navItems = [
    { name: t('nav.home') || "Inicio", path: '/' },
    { name: t('nav.products') || "Productos", path: '/productos' },
    { name: t('nav.plans') || "Planes", path: '/planes' },
    { name: t('nav.guides') || "Guías", path: '/guias' },
    { name: t('nav.contact') || "Contacto", path: '/contacto' },
  ];

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (dropdownOpen && !target.closest('[data-dropdown]')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);
  
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-3',
        isScrolled 
          ? 'bg-background shadow-sm dark:bg-background' 
          : 'bg-background/90 dark:bg-background/90'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl md:text-2xl font-bold text-foreground">
            Spartan<span className="text-spartan-primary">Armory</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-foreground hover:text-spartan-primary py-2 link-underline",
                location.pathname === item.path && "text-spartan-primary"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          {/* Theme and Language Switchers */}
          <div className="hidden md:flex items-center space-x-2">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
          
          <Link to="/carrito" className="relative p-2">
            <ShoppingCart 
              className="w-6 h-6 transition-colors text-foreground" 
            />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-spartan-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                {itemCount}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="relative" data-dropdown>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-1 p-2"
              >
                <User className="w-6 h-6 transition-colors text-foreground" />
                <ChevronDown className="w-4 h-4 text-foreground" />
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background rounded-md shadow-lg py-1 z-10 animate-fade-in dark:border dark:border-border">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <Link 
                    to="/mi-cuenta" 
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {t('nav.myAccount') || "Mi Cuenta"}
                  </Link>
                  <Link 
                    to="/mis-pedidos" 
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {t('nav.myOrders') || "Mis Pedidos"}
                  </Link>
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {t('nav.adminPanel') || "Panel de Administración"}
                    </Link>
                  )}
                  <button 
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted"
                  >
                    {t('nav.logout') || "Cerrar Sesión"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="sm">
                {t('nav.login') || "Iniciar Sesión"}
              </Button>
            </Link>
          )}
          
          {/* Mobile menu toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-background z-40 p-4 animate-fade-in md:hidden">
          <nav className="flex flex-col space-y-4 mt-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-foreground py-2 px-4 rounded-md text-lg",
                  location.pathname === item.path 
                    ? "bg-muted text-spartan-primary" 
                    : "hover:bg-muted"
                )}
              >
                {item.name}
              </Link>
            ))}
            {!user && (
              <Link
                to="/login"
                className="text-foreground py-2 px-4 rounded-md text-lg"
              >
                {t('nav.login') || "Iniciar Sesión"}
              </Link>
            )}
            
            {/* Mobile theme and language switchers */}
            <div className="flex items-center space-x-4 px-4 py-2">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
