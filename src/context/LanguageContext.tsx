
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

type Language = 'es' | 'en';

type LanguageOption = {
  code: Language;
  name: string;
};

type Translation = {
  common: {
    loading: string;
    error: string;
    success: string;
    confirm: string;
    cancel: string;
    edit: string;
    delete: string;
    save: string;
    back: string;
  };
  index: {
    title: string;
    subtitle: string;
    welcome: string;
    products: string;
    plans: string;
    guides: string;
    contact: string;
  };
  products: {
    title: string;
    search: string;
    categoriesTitle: string;
    categories: {
      proteina: string;
      creatina: string;
      preEntreno: string;
      aminoacidos: string;
      vitaminas: string;
      otros: string;
    };
    noProducts: string;
    addToCart: string;
    details: string;
    showing: string;
    featured: string;
    sale: string;
  };
  productDetail: {
    description: string;
    ingredients: string;
    instructions: string;
    warning: string;
    price: string;
    availability: string;
    inStock: string;
    outOfStock: string;
    addToCart: string;
    relatedProducts: string;
  };
  cart: {
    title: string;
    empty: string;
    product: string;
    price: string;
    quantity: string;
    total: string;
    remove: string;
    subtotal: string;
    shipping: string;
    tax: string;
    orderTotal: string;
    checkout: string;
    continueShopping: string;
  };
  plans: {
    title: string;
    beginner: string;
    powerlifting: string;
    bodybuilding: string;
    custom: string;
    description: string;
    price: string;
    viewPlan: string;
  };
  guides: {
    title: string;
    beginnerGuides: string;
    intermediateGuides: string;
    advancedGuides: string;
    noGuides: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    success: string;
    error: string;
  };
  login: {
    title: string;
    subtitle: string;
    email: string;
    password: string;
    login: string;
    register: string;
    forgotPassword: string;
    error: string;
  };
  register: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    register: string;
    login: string;
    error: string;
  };
  footer: {
    info: string;
    quickLinks: string;
    allProducts: string;
    trainingPlans: string;
    beginnerGuides: string;
    aboutUs: string;
    contact: string;
    categories: string;
    contactInfo: string;
    adminArea: string;
    adminDashboard: string;
    productManagement: string;
    financialReports: string;
    contactManagement: string;
    rights: string;
  };
  admin: {
    dashboard: string;
    products: string;
    orders: string;
    clients: string;
    guides: string;
    stats: string;
    settings: string;
    logout: string;
    restricted: string;
    noPermission: string;
    backToHome: string;
    welcomeTitle: string;
    welcomeMessage: string;
    page: string;
  };
  aboutUs: {
    title: string;
    mission: string;
    vision: string;
    values: string;
    team: string;
    contactUs: string;
  };
  myaccount: {
    title: string;
    personalInfo: string;
    updateYourPersonalInfo: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    updateProfile: string;
    passwordChange: string;
    updateYourPassword: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    updatePassword: string;
    profileUpdated: string;
    passwordUpdated: string;
    passwordsDoNotMatch: string;
    passwordTooShort: string;
  };
  myorders: {
    title: string;
    orderHistory: string;
    noOrders: string;
    orderNumber: string;
    date: string;
    status: string;
    total: string;
    details: string;
    statusTypes: {
      completed: string;
      shipped: string;
      processing: string;
      cancelled: string;
    };
  };
  nav: {
    home: string;
    products: string;
    plans: string;
    guides: string;
    contact: string;
    login: string;
    myAccount: string;
    myOrders: string;
    adminPanel: string;
    logout: string;
    services: string;
  };
  theme: {
    toggle: string;
    dark: string;
    light: string;
  };
  featured: {
    title: string;
    subtitle: string;
    viewAll: string;
  };
  hero: {
    title: string;
    titleHighlight: string;
    description: string;
    imageAlt: string;
    stats: {
      quality: string;
      delivery: string;
      clients: string;
    };
    cta: {
      products: string;
      trainingPlans: string;
    };
  };
};

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  availableLanguages: LanguageOption[];
}>({
  language: 'es',
  setLanguage: () => {},
  t: (key: string) => key,
  availableLanguages: [],
});

const translations: Record<Language, Translation> = {
  es: {
    common: {
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      confirm: 'Confirmar',
      cancel: 'Cancelar',
      edit: 'Editar',
      delete: 'Eliminar',
      save: 'Guardar',
      back: 'Volver',
    },
    index: {
      title: 'SpartanArmory Supplements',
      subtitle: 'Suplementos de alta calidad para atletas de alto rendimiento',
      welcome: 'Bienvenido a SpartanArmory Supplements',
      products: 'Productos',
      plans: 'Planes de Entrenamiento',
      guides: 'Guías para Principiantes',
      contact: 'Contacto',
    },
    products: {
      title: 'Productos',
      search: 'Buscar productos...',
      categoriesTitle: 'Categorías',
      categories: {
        proteina: 'Proteína',
        creatina: 'Creatina',
        preEntreno: 'Pre-Entreno',
        aminoacidos: 'Aminoácidos',
        vitaminas: 'Vitaminas',
        otros: 'Otros',
      },
      noProducts: 'No hay productos en esta categoría.',
      addToCart: 'Añadir al carrito',
      details: 'Ver detalles',
      showing: 'Mostrando',
      featured: 'Destacado',
      sale: 'Oferta',
    },
    productDetail: {
      description: 'Descripción',
      ingredients: 'Ingredientes',
      instructions: 'Instrucciones',
      warning: 'Advertencia',
      price: 'Precio',
      availability: 'Disponibilidad',
      inStock: 'En stock',
      outOfStock: 'Agotado',
      addToCart: 'Añadir al carrito',
      relatedProducts: 'Productos relacionados',
    },
    cart: {
      title: 'Carrito de Compras',
      empty: 'Tu carrito está vacío.',
      product: 'Producto',
      price: 'Precio',
      quantity: 'Cantidad',
      total: 'Total',
      remove: 'Eliminar',
      subtotal: 'Subtotal',
      shipping: 'Envío',
      tax: 'Impuestos',
      orderTotal: 'Total del pedido',
      checkout: 'Finalizar compra',
      continueShopping: 'Continuar comprando',
    },
    plans: {
      title: 'Planes de Entrenamiento',
      beginner: 'Principiante',
      powerlifting: 'Powerlifting',
      bodybuilding: 'Culturismo',
      custom: 'Personalizado',
      description: 'Descripción',
      price: 'Precio',
      viewPlan: 'Ver plan',
    },
    guides: {
      title: 'Guías para Principiantes',
      beginnerGuides: 'Guías para Principiantes',
      intermediateGuides: 'Guías Intermedias',
      advancedGuides: 'Guías Avanzadas',
      noGuides: 'No hay guías disponibles.',
    },
    contact: {
      title: 'Contacto',
      subtitle: 'Póngase en contacto con nosotros',
      name: 'Nombre',
      email: 'Correo electrónico',
      message: 'Mensaje',
      send: 'Enviar mensaje',
      success: 'Mensaje enviado correctamente',
      error: 'Error al enviar el mensaje',
    },
    login: {
      title: 'Iniciar Sesión',
      subtitle: 'Inicie sesión en su cuenta',
      email: 'Correo electrónico',
      password: 'Contraseña',
      login: 'Iniciar Sesión',
      register: 'Registrarse',
      forgotPassword: '¿Olvidó su contraseña?',
      error: 'Error al iniciar sesión',
    },
    register: {
      title: 'Registrarse',
      subtitle: 'Cree una nueva cuenta',
      name: 'Nombre',
      email: 'Correo electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      register: 'Registrarse',
      login: 'Iniciar Sesión',
      error: 'Error al registrarse',
    },
    footer: {
      info: 'Suplementos de alta calidad para atletas de alto rendimiento.',
      quickLinks: 'Enlaces rápidos',
      allProducts: 'Todos los productos',
      trainingPlans: 'Planes de entrenamiento',
      beginnerGuides: 'Guías para principiantes',
      aboutUs: 'Nosotros',
      contact: 'Contacto',
      categories: 'Categorías',
      contactInfo: 'Información de contacto',
      adminArea: 'Área de administración',
      adminDashboard: 'Panel de administración',
      productManagement: 'Gestión de productos',
      financialReports: 'Informes financieros',
      contactManagement: 'Gestión de contactos',
      rights: 'Todos los derechos reservados.',
    },
    admin: {
      dashboard: 'Panel de control',
      products: 'Productos',
      orders: 'Pedidos',
      clients: 'Clientes',
      guides: 'Guías',
      stats: 'Estadísticas',
      settings: 'Configuración',
      logout: 'Cerrar sesión',
      restricted: 'Acceso restringido',
      noPermission: 'No tiene permiso para acceder a esta página.',
      backToHome: 'Volver al inicio',
      welcomeTitle: 'Bienvenido al panel de administración',
      welcomeMessage: 'Aquí puede administrar su tienda.',
      page: 'Página',
    },
    aboutUs: {
      title: 'Sobre Nosotros',
      mission: 'Nuestra Misión',
      vision: 'Nuestra Visión',
      values: 'Nuestros Valores',
      team: 'Nuestro Equipo',
      contactUs: 'Contáctenos',
    },
    myaccount: {
      title: "Mi Cuenta",
      personalInfo: "Información Personal",
      updateYourPersonalInfo: "Actualiza tu información personal",
      name: "Nombre",
      email: "Correo electrónico",
      phone: "Teléfono",
      address: "Dirección",
      updateProfile: "Actualizar Perfil",
      passwordChange: "Cambiar Contraseña",
      updateYourPassword: "Actualiza tu contraseña",
      currentPassword: "Contraseña actual",
      newPassword: "Nueva contraseña",
      confirmPassword: "Confirmar contraseña",
      updatePassword: "Actualizar Contraseña",
      profileUpdated: "Perfil actualizado correctamente",
      passwordUpdated: "Contraseña actualizada correctamente",
      passwordsDoNotMatch: "Las contraseñas no coinciden",
      passwordTooShort: "La contraseña debe tener al menos 8 caracteres",
    },
    myorders: {
      title: "Mis Pedidos",
      orderHistory: "Historial de Pedidos",
      noOrders: "No tienes pedidos todavía",
      orderNumber: "Número de Pedido",
      date: "Fecha",
      status: "Estado",
      total: "Total",
      details: "Detalles",
      statusTypes: {
        completed: "Completado",
        shipped: "Enviado",
        processing: "Procesando",
        cancelled: "Cancelado",
      },
    },
    nav: {
      home: "Inicio",
      products: "Productos",
      plans: "Planes",
      guides: "Guías",
      contact: "Contacto",
      login: "Iniciar Sesión",
      myAccount: "Mi Cuenta",
      myOrders: "Mis Pedidos",
      adminPanel: "Panel de Administración",
      logout: "Cerrar Sesión",
      services: "Servicios"
    },
    theme: {
      toggle: "Cambiar tema",
      dark: "Modo oscuro",
      light: "Modo claro"
    },
    featured: {
      title: "Nuestros Productos Más Populares",
      subtitle: "Productos Destacados",
      viewAll: "Ver todos"
    },
    hero: {
      title: "Potencia tu Rendimiento con",
      titleHighlight: "Suplementos de Calidad",
      description: "Suplementos de alta calidad para atletas y entusiastas del fitness. Maximiza tus resultados con nuestros productos premium.",
      imageAlt: "Suplementos deportivos de alta calidad",
      stats: {
        quality: "Calidad garantizada",
        delivery: "Entrega rápida",
        clients: "Clientes satisfechos"
      },
      cta: {
        products: "Explorar Productos",
        trainingPlans: "Ver Planes de Entrenamiento"
      }
    }
  },
  en: {
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      confirm: 'Confirm',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      back: 'Back',
    },
    index: {
      title: 'SpartanArmory Supplements',
      subtitle: 'High-quality supplements for high-performance athletes',
      welcome: 'Welcome to SpartanArmory Supplements',
      products: 'Products',
      plans: 'Training Plans',
      guides: 'Beginner Guides',
      contact: 'Contact',
    },
    products: {
      title: 'Products',
      search: 'Search products...',
      categoriesTitle: 'Categories',
      categories: {
        proteina: 'Protein',
        creatina: 'Creatine',
        preEntreno: 'Pre-Workout',
        aminoacidos: 'Amino Acids',
        vitaminas: 'Vitamins',
        otros: 'Others',
      },
      noProducts: 'No products in this category.',
      addToCart: 'Add to cart',
      details: 'View details',
      showing: 'Showing',
      featured: 'Featured',
      sale: 'Sale',
    },
    productDetail: {
      description: 'Description',
      ingredients: 'Ingredients',
      instructions: 'Instructions',
      warning: 'Warning',
      price: 'Price',
      availability: 'Availability',
      inStock: 'In stock',
      outOfStock: 'Out of stock',
      addToCart: 'Add to cart',
      relatedProducts: 'Related products',
    },
    cart: {
      title: 'Shopping Cart',
      empty: 'Your cart is empty.',
      product: 'Product',
      price: 'Price',
      quantity: 'Quantity',
      total: 'Total',
      remove: 'Remove',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      tax: 'Tax',
      orderTotal: 'Order total',
      checkout: 'Checkout',
      continueShopping: 'Continue shopping',
    },
    plans: {
      title: 'Training Plans',
      beginner: 'Beginner',
      powerlifting: 'Powerlifting',
      bodybuilding: 'Bodybuilding',
      custom: 'Custom',
      description: 'Description',
      price: 'Price',
      viewPlan: 'View plan',
    },
    guides: {
      title: 'Beginner Guides',
      beginnerGuides: 'Beginner Guides',
      intermediateGuides: 'Intermediate Guides',
      advancedGuides: 'Advanced Guides',
      noGuides: 'No guides available.',
    },
    contact: {
      title: 'Contact',
      subtitle: 'Get in touch with us',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send message',
      success: 'Message sent successfully',
      error: 'Error sending message',
    },
    login: {
      title: 'Login',
      subtitle: 'Login to your account',
      email: 'Email',
      password: 'Password',
      login: 'Login',
      register: 'Register',
      forgotPassword: 'Forgot your password?',
      error: 'Error logging in',
    },
    register: {
      title: 'Register',
      subtitle: 'Create a new account',
      name: 'Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
      register: 'Register',
      login: 'Login',
      error: 'Error registering',
    },
    footer: {
      info: 'High-quality supplements for high-performance athletes.',
      quickLinks: 'Quick links',
      allProducts: 'All products',
      trainingPlans: 'Training plans',
      beginnerGuides: 'Beginner guides',
      aboutUs: 'About Us',
      contact: 'Contact',
      categories: 'Categories',
      contactInfo: 'Contact info',
      adminArea: 'Admin area',
      adminDashboard: 'Admin dashboard',
      productManagement: 'Product management',
      financialReports: 'Financial reports',
      contactManagement: 'Contact management',
      rights: 'All rights reserved.',
    },
    admin: {
      dashboard: 'Dashboard',
      products: 'Products',
      orders: 'Orders',
      clients: 'Clients',
      guides: 'Guides',
      stats: 'Statistics',
      settings: 'Settings',
      logout: 'Logout',
      restricted: 'Restricted access',
      noPermission: 'You do not have permission to access this page.',
      backToHome: 'Back to home',
      welcomeTitle: 'Welcome to the admin panel',
      welcomeMessage: 'Here you can manage your store.',
      page: 'Page',
    },
    aboutUs: {
      title: 'About Us',
      mission: 'Our Mission',
      vision: 'Our Vision',
      values: 'Our Values',
      team: 'Our Team',
      contactUs: 'Contact Us',
    },
    myaccount: {
      title: "My Account",
      personalInfo: "Personal Information",
      updateYourPersonalInfo: "Update your personal information",
      name: "Name",
      email: "Email",
      phone: "Phone",
      address: "Address",
      updateProfile: "Update Profile",
      passwordChange: "Change Password",
      updateYourPassword: "Update your password",
      currentPassword: "Current password",
      newPassword: "New password",
      confirmPassword: "Confirm password",
      updatePassword: "Update Password",
      profileUpdated: "Profile updated successfully",
      passwordUpdated: "Password updated successfully",
      passwordsDoNotMatch: "Passwords do not match",
      passwordTooShort: "Password must be at least 8 characters long",
    },
    myorders: {
      title: "My Orders",
      orderHistory: "Order History",
      noOrders: "You don't have any orders yet",
      orderNumber: "Order Number",
      date: "Date",
      status: "Status",
      total: "Total",
      details: "Details",
      statusTypes: {
        completed: "Completed",
        shipped: "Shipped",
        processing: "Processing",
        cancelled: "Cancelled",
      },
    },
    nav: {
      home: "Home",
      products: "Products",
      plans: "Plans",
      guides: "Guides",
      contact: "Contact",
      login: "Login",
      myAccount: "My Account",
      myOrders: "My Orders",
      adminPanel: "Admin Panel",
      logout: "Logout",
      services: "Services"
    },
    theme: {
      toggle: "Toggle theme",
      dark: "Dark mode",
      light: "Light mode"
    },
    featured: {
      title: "Our Most Popular Products",
      subtitle: "Featured Products",
      viewAll: "View all"
    },
    hero: {
      title: "Power Your Performance with",
      titleHighlight: "Quality Supplements",
      description: "High-quality supplements for athletes and fitness enthusiasts. Maximize your results with our premium products.",
      imageAlt: "High-quality sports supplements",
      stats: {
        quality: "Guaranteed quality",
        delivery: "Fast delivery",
        clients: "Satisfied clients"
      },
      cta: {
        products: "Explore Products",
        trainingPlans: "View Training Plans"
      }
    }
  },
};

// Available languages array
const availableLanguageOptions: LanguageOption[] = [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'English' }
];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>((localStorage.getItem('language') as Language) || 'es');

  React.useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = useCallback((key: string): string => {
    if (!key) return '';
    
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (!value || typeof value !== 'object') {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
      value = value[k];
    }
    
    if (value === undefined) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    
    return value;
  }, [language]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    t,
    availableLanguages: availableLanguageOptions
  }), [language, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
