
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button-custom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Shield, User, Mail, LockKeyhole, InfoIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

const translations = {
  es: {
    title: {
      login: 'Iniciar Sesión',
      register: 'Crear Cuenta'
    },
    subtitle: {
      login: 'Accede a tu cuenta para ver tus pedidos y más',
      register: 'Únete a la comunidad de Spartan Armory'
    },
    form: {
      name: 'Nombre Completo',
      email: 'Correo Electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      phone: 'Teléfono (opcional)',
      address: 'Dirección (opcional)',
      forgotPassword: '¿Olvidaste tu contraseña?',
      loginBtn: 'Iniciar Sesión',
      registerBtn: 'Crear Cuenta'
    },
    errors: {
      nameRequired: 'El nombre debe tener al menos 3 caracteres',
      emailInvalid: 'Correo electrónico inválido',
      passwordMin: 'La contraseña debe tener al menos 8 caracteres',
      passwordRequirements: 'La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial',
      passwordMatch: 'Las contraseñas no coinciden'
    },
    links: {
      noAccount: '¿No tienes una cuenta?',
      register: 'Regístrate aquí',
      hasAccount: '¿Ya tienes una cuenta?',
      login: 'Inicia sesión aquí'
    },
    admin: {
      title: 'Acceso Administrativo',
      info: 'Para acceder al panel de administración, inicia sesión con las siguientes credenciales:',
      email: 'Email: admin@spartanarmory.com',
      password: 'Contraseña: 123456',
      access: 'Tras iniciar sesión, accede al panel desde el enlace en el pie de página o navegando a /admin'
    }
  },
  en: {
    title: {
      login: 'Login',
      register: 'Create Account'
    },
    subtitle: {
      login: 'Access your account to view your orders and more',
      register: 'Join the Spartan Armory community'
    },
    form: {
      name: 'Full Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      phone: 'Phone (optional)',
      address: 'Address (optional)',
      forgotPassword: 'Forgot your password?',
      loginBtn: 'Login',
      registerBtn: 'Create Account'
    },
    errors: {
      nameRequired: 'Name must be at least 3 characters',
      emailInvalid: 'Invalid email',
      passwordMin: 'Password must be at least 8 characters',
      passwordRequirements: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
      passwordMatch: 'Passwords do not match'
    },
    links: {
      noAccount: 'Don\'t have an account?',
      register: 'Register here',
      hasAccount: 'Already have an account?',
      login: 'Login here'
    },
    admin: {
      title: 'Administrative Access',
      info: 'To access the admin panel, log in with the following credentials:',
      email: 'Email: admin@spartanarmory.com',
      password: 'Password: 123456',
      access: 'After login, access the admin panel from the footer link or navigating to /admin'
    }
  },
  fr: {
    title: {
      login: 'Connexion',
      register: 'Créer un Compte'
    },
    subtitle: {
      login: 'Accédez à votre compte pour voir vos commandes et plus',
      register: 'Rejoignez la communauté Spartan Armory'
    },
    form: {
      name: 'Nom Complet',
      email: 'Email',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      phone: 'Téléphone (optionnel)',
      address: 'Adresse (optionnel)',
      forgotPassword: 'Mot de passe oublié?',
      loginBtn: 'Connexion',
      registerBtn: 'Créer un Compte'
    },
    errors: {
      nameRequired: 'Le nom doit comporter au moins 3 caractères',
      emailInvalid: 'Email invalide',
      passwordMin: 'Le mot de passe doit comporter au moins 8 caractères',
      passwordRequirements: 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial',
      passwordMatch: 'Les mots de passe ne correspondent pas'
    },
    links: {
      noAccount: 'Vous n\'avez pas de compte?',
      register: 'Inscrivez-vous ici',
      hasAccount: 'Vous avez déjà un compte?',
      login: 'Connectez-vous ici'
    },
    admin: {
      title: 'Accès Administratif',
      info: 'Pour accéder au panneau d\'administration, connectez-vous avec les identifiants suivants:',
      email: 'Email: admin@spartanarmory.com',
      password: 'Mot de passe: 123456',
      access: 'Après la connexion, accédez au panneau d\'administration depuis le lien du pied de page ou en naviguant vers /admin'
    }
  }
};

const passwordValidation = z.string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .regex(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
  .regex(/[a-z]/, 'Debe contener al menos una letra minúscula')
  .regex(/[0-9]/, 'Debe contener al menos un número')
  .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un carácter especial');

const loginSchema = z.object({
  emailOrUsername: z.string().min(1, 'Este campo es requerido'),
  password: passwordValidation,
});

const registerSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Correo electrónico inválido'),
  password: passwordValidation,
  confirmPassword: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  phone: z.string().optional(),
  address: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

// Admin information component for better code organization
const AdminInfoAlert = ({ t, fillAdminCredentials }: { 
  t: any, 
  fillAdminCredentials: () => void 
}) => (
  <Alert className="mb-6">
    <InfoIcon className="h-4 w-4" />
    <AlertTitle>{t.admin.title}</AlertTitle>
    <AlertDescription>
      <p className="mb-2">{t.admin.info}</p>
      <ul className="list-disc list-inside space-y-1 mb-2">
        <li>Usuario: Admin</li>
        <li>Contraseña: Admin@123</li>
      </ul>
      <p>{t.admin.access}</p>
      <Button
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={fillAdminCredentials}
      >
        Autocompletar credenciales
      </Button>
    </AlertDescription>
  </Alert>
);

// Login form component
const LoginForm = ({ 
  registerLogin, 
  handleSubmitLogin, 
  errorsLogin, 
  onLoginSubmit,
  t 
}: { 
  registerLogin: any,
  handleSubmitLogin: any,
  errorsLogin: any,
  onLoginSubmit: (data: LoginFormValues) => Promise<void>,
  t: any
}) => (
  <form onSubmit={handleSubmitLogin(onLoginSubmit)} className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="emailOrUsername">Email o nombre de usuario</Label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
          <Mail className="w-5 h-5" />
        </div>
        <Input
          id="emailOrUsername"
          type="text"
          placeholder="Email o nombre de usuario"
          className="pl-10"
          {...registerLogin('emailOrUsername')}
        />
      </div>
      {errorsLogin.emailOrUsername && (
        <p className="text-red-500 text-sm">{errorsLogin.emailOrUsername.message}</p>
      )}
    </div>

    <div className="space-y-2">
      <div className="flex justify-between">
        <Label htmlFor="password">{t.form.password}</Label>
        <Link to="/reset-password" className="text-sm text-spartan-primary hover:underline">
          {t.form.forgotPassword}
        </Link>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
          <LockKeyhole className="w-5 h-5" />
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          className="pl-10"
          {...registerLogin('password')}
        />
      </div>
      {errorsLogin.password && (
        <p className="text-red-500 text-sm">
          {errorsLogin.password.message || t.errors.passwordMin}
        </p>
      )}
    </div>

    <Button type="submit" fullWidth>
      {t.form.loginBtn}
    </Button>
  </form>
);

// Register form component
const RegisterForm = ({
  registerSignup,
  handleSubmitSignup,
  errorsSignup,
  onRegisterSubmit,
  t
}: {
  registerSignup: any,
  handleSubmitSignup: any,
  errorsSignup: any,
  onRegisterSubmit: (data: RegisterFormValues) => Promise<void>,
  t: any
}) => (
  <form onSubmit={handleSubmitSignup(onRegisterSubmit)} className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="name">{t.form.name}</Label>
      <Input
        id="name"
        placeholder="Tu nombre completo"
        {...registerSignup('name')}
      />
      {errorsSignup.name && (
        <p className="text-red-500 text-sm">{t.errors.nameRequired}</p>
      )}
    </div>

    <div className="space-y-2">
      <Label htmlFor="register-email">{t.form.email}</Label>
      <Input
        id="register-email"
        type="email"
        placeholder="tu@correo.com"
        {...registerSignup('email')}
      />
      {errorsSignup.email && (
        <p className="text-red-500 text-sm">{t.errors.emailInvalid}</p>
      )}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="register-password">{t.form.password}</Label>
        <Input
          id="register-password"
          type="password"
          placeholder="••••••••"
          {...registerSignup('password')}
        />
        {errorsSignup.password && (
          <p className="text-red-500 text-sm">
            {errorsSignup.password.message || t.errors.passwordRequirements}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password">{t.form.confirmPassword}</Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="••••••••"
          {...registerSignup('confirmPassword')}
        />
        {errorsSignup.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errorsSignup.confirmPassword.message}
          </p>
        )}
      </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="phone">{t.form.phone}</Label>
      <Input
        id="phone"
        placeholder="8888-8888"
        {...registerSignup('phone')}
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="address">{t.form.address}</Label>
      <Input
        id="address"
        placeholder="Tu dirección"
        {...registerSignup('address')}
      />
    </div>

    <Button type="submit" fullWidth>
      {t.form.registerBtn}
    </Button>
  </form>
);

// Main Login component with proper lazy loading
const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { login, register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  // Use safe language access with fallback
  const t = translations[language as keyof typeof translations] || translations.es;

  React.useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  
  const { 
    register: registerLogin, 
    handleSubmit: handleSubmitLogin, 
    formState: { errors: errorsLogin },
    setValue: setLoginValue
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrUsername: '',
      password: ''
    }
  });

  const { 
    register: registerSignup, 
    handleSubmit: handleSubmitSignup, 
    formState: { errors: errorsSignup } 
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: ''
    }
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    const success = await login(data.emailOrUsername, data.password);
    if (success) {
      navigate('/');
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    const userData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      isAdmin: false
    };
    
    const success = await registerUser(userData);
    if (success) {
      navigate('/');
    }
  };

  const fillAdminCredentials = () => {
    setLoginValue('emailOrUsername', 'Admin');
    setLoginValue('password', 'Admin@123');
  };

  // Loading skeleton while content is loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-md mx-auto">
              <Skeleton className="w-full h-20 mb-6" />
              <div className="bg-card rounded-lg shadow-md overflow-hidden">
                <Skeleton className="w-full h-40" />
                <div className="p-6 space-y-4">
                  <Skeleton className="w-full h-10" />
                  <Skeleton className="w-full h-10" />
                  <Skeleton className="w-full h-10" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <AdminInfoAlert t={t} fillAdminCredentials={fillAdminCredentials} />
            
            <div className="bg-card rounded-lg shadow-md overflow-hidden dark:border dark:border-border">
              <div className="bg-gradient-to-r from-spartan-primary to-spartan-secondary p-6 text-white text-center">
                <div className="mx-auto bg-white/20 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  {isRegistering ? <User className="w-8 h-8" /> : <Shield className="w-8 h-8" />}
                </div>
                <h2 className="text-2xl font-bold">
                  {isRegistering ? t.title.register : t.title.login}
                </h2>
                <p className="mt-1 text-white/80">
                  {isRegistering ? t.subtitle.register : t.subtitle.login}
                </p>
              </div>
              
              <div className="p-6">
                {!isRegistering ? (
                  <>
                    <LoginForm 
                      registerLogin={registerLogin}
                      handleSubmitLogin={handleSubmitLogin}
                      errorsLogin={errorsLogin}
                      onLoginSubmit={onLoginSubmit}
                      t={t}
                    />
                    
                    <div className="text-center mt-4">
                      <p className="text-sm text-muted-foreground">
                        {t.links.noAccount}{" "}
                        <button
                          type="button"
                          onClick={() => setIsRegistering(true)}
                          className="text-spartan-primary hover:underline"
                        >
                          {t.links.register}
                        </button>
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <RegisterForm
                      registerSignup={registerSignup}
                      handleSubmitSignup={handleSubmitSignup}
                      errorsSignup={errorsSignup}
                      onRegisterSubmit={onRegisterSubmit}
                      t={t}
                    />
                    
                    <div className="text-center mt-4">
                      <p className="text-sm text-muted-foreground">
                        {t.links.hasAccount}{" "}
                        <button
                          type="button"
                          onClick={() => setIsRegistering(false)}
                          className="text-spartan-primary hover:underline"
                        >
                          {t.links.login}
                        </button>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
