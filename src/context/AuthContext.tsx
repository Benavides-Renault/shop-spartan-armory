
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { toast } from 'sonner';
import { useLanguage } from './LanguageContext';

// En una aplicación real, esto se conectaría a un backend
// Por ahora, simularemos usuarios
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@spartanarmory.com',
    name: 'Admin',
    isAdmin: true,
  },
  {
    id: '2',
    email: 'usuario@ejemplo.com',
    name: 'Usuario Demo',
    isAdmin: false,
    address: 'San José, Costa Rica',
    phone: '8888-8888'
  }
];

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (emailOrUsername: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id'>) => Promise<boolean>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();
  
  useEffect(() => {
    // Simular carga de usuario desde almacenamiento local
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
    setIsLoading(false);
  }, []);
  
  const login = async (emailOrUsername: string, password: string): Promise<boolean> => {
    // Simular validación (en realidad esto sería una petición a un backend)
    setIsLoading(true);
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Credenciales de administrador especiales
    if (emailOrUsername === 'Admin' && password === 'Admin@123') {
      const adminUser = MOCK_USERS.find(u => u.isAdmin);
      if (adminUser) {
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        toast.success(t('auth.welcomeMessage') + ', ' + adminUser.name);
        setIsLoading(false);
        return true;
      }
    }
    
    // Buscar usuario por email o nombre de usuario
    const foundUser = MOCK_USERS.find(
      u => u.email.toLowerCase() === emailOrUsername.toLowerCase() || 
           u.name.toLowerCase() === emailOrUsername.toLowerCase()
    );
    
    // En un entorno real, verificaríamos el hash de la contraseña
    // Aquí solo simulamos la verificación para propósitos de demostración
    // Para usuarios demo, permitimos '123456' como contraseña
    if (foundUser && password === '123456') { 
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      toast.success(t('auth.welcomeMessage') + ', ' + foundUser.name);
      setIsLoading(false);
      return true;
    }
    
    toast.error(t('auth.invalidCredentials'));
    setIsLoading(false);
    return false;
  };
  
  const register = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const existingUser = MOCK_USERS.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    
    if (existingUser) {
      toast.error(t('auth.emailAlreadyRegistered'));
      setIsLoading(false);
      return false;
    }
    
    // En una aplicación real, aquí se enviaría la información al backend
    // Como es una simulación, solo agregamos el usuario a nuestro array local
    const newUser: User = {
      ...userData,
      id: String(MOCK_USERS.length + 1),
      isAdmin: false,
    };
    
    MOCK_USERS.push(newUser);
    
    // Automáticamente iniciar sesión con el nuevo usuario
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    toast.success(t('auth.welcomeMessage') + ', ' + newUser.name);
    setIsLoading(false);
    return true;
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info(t('auth.logoutMessage'));
  };
  
  const isAdmin = !!user?.isAdmin;
  
  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
