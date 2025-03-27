
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  Globe, 
  Bell, 
  UserCog, 
  Lock, 
  CreditCard, 
  Mail, 
  Database, 
  Truck,
  Check
} from 'lucide-react';
import { useToast } from "../../hooks/use-toast";
import { useLanguage } from '../../context/LanguageContext';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Switch } from "../../components/ui/switch";
import { Button } from "../../components/ui/button-custom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Separator } from "../../components/ui/separator";

const generalFormSchema = z.object({
  siteName: z.string().min(2, {
    message: "El nombre del sitio debe tener al menos 2 caracteres.",
  }),
  siteEmail: z.string().email({
    message: "Ingrese un correo electrónico válido.",
  }),
  sitePhone: z.string().min(6, {
    message: "Ingrese un número de teléfono válido.",
  }),
  logoUrl: z.string().optional(),
  enableNotifications: z.boolean().default(true),
});

const securityFormSchema = z.object({
  enableTwoFactor: z.boolean().default(false),
  requireStrongPasswords: z.boolean().default(true),
  sessionTimeout: z.string().regex(/^\d+$/, {
    message: "Ingrese un número válido en minutos.",
  }),
});

const paymentFormSchema = z.object({
  stripePK: z.string().min(5, {
    message: "La clave pública de Stripe es requerida.",
  }),
  stripeSK: z.string().min(5, {
    message: "La clave secreta de Stripe es requerida.",
  }),
  enablePayPal: z.boolean().default(true),
  payPalClientId: z.string().optional(),
  taxRate: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Ingrese una tasa válida (ej. 16.00).",
  }),
});

const shippingFormSchema = z.object({
  enableShipping: z.boolean().default(true),
  freeShippingThreshold: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Ingrese un monto válido.",
  }),
  baseShippingRate: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Ingrese un monto válido.",
  }),
});

type GeneralFormValues = z.infer<typeof generalFormSchema>;
type SecurityFormValues = z.infer<typeof securityFormSchema>;
type PaymentFormValues = z.infer<typeof paymentFormSchema>;
type ShippingFormValues = z.infer<typeof shippingFormSchema>;

const ConfigurationManagement = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("general");

  // General form
  const generalForm = useForm<GeneralFormValues>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      siteName: "Spartan Armory",
      siteEmail: "info@spartanarmory.com",
      sitePhone: "+34 611 123 456",
      logoUrl: "/logo.png",
      enableNotifications: true,
    },
  });

  // Security form
  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      enableTwoFactor: false,
      requireStrongPasswords: true,
      sessionTimeout: "30",
    },
  });

  // Payment form
  const paymentForm = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      stripePK: "pk_test_",
      stripeSK: "sk_test_",
      enablePayPal: true,
      payPalClientId: "",
      taxRate: "16.00",
    },
  });

  // Shipping form
  const shippingForm = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: {
      enableShipping: true,
      freeShippingThreshold: "100.00",
      baseShippingRate: "5.99",
    },
  });

  const onSubmitGeneral = (data: GeneralFormValues) => {
    console.log("General settings submitted:", data);
    toast({
      title: "Configuración general actualizada",
      description: "Los cambios han sido guardados correctamente.",
    });
  };

  const onSubmitSecurity = (data: SecurityFormValues) => {
    console.log("Security settings submitted:", data);
    toast({
      title: "Configuración de seguridad actualizada",
      description: "Los cambios han sido guardados correctamente.",
    });
  };

  const onSubmitPayment = (data: PaymentFormValues) => {
    console.log("Payment settings submitted:", data);
    toast({
      title: "Configuración de pagos actualizada",
      description: "Los cambios han sido guardados correctamente.",
    });
  };

  const onSubmitShipping = (data: ShippingFormValues) => {
    console.log("Shipping settings submitted:", data);
    toast({
      title: "Configuración de envíos actualizada",
      description: "Los cambios han sido guardados correctamente.",
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Configuración del Sistema</h1>
        <p className="text-muted-foreground">
          Administre todas las configuraciones de su plataforma desde este panel.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>Seguridad</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Pagos</span>
          </TabsTrigger>
          <TabsTrigger value="shipping" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            <span>Envíos</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>
                Configure los detalles básicos de su tienda.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...generalForm}>
                <form onSubmit={generalForm.handleSubmit(onSubmitGeneral)} className="space-y-6">
                  <FormField
                    control={generalForm.control}
                    name="siteName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre del Sitio</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre de su tienda" {...field} />
                        </FormControl>
                        <FormDescription>
                          Este nombre se mostrará en el título del sitio web.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={generalForm.control}
                      name="siteEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correo Electrónico</FormLabel>
                          <FormControl>
                            <Input placeholder="correo@ejemplo.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            Correo principal de contacto.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={generalForm.control}
                      name="sitePhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono</FormLabel>
                          <FormControl>
                            <Input placeholder="+34 611 123 456" {...field} />
                          </FormControl>
                          <FormDescription>
                            Teléfono principal de contacto.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={generalForm.control}
                    name="logoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL del Logo</FormLabel>
                        <FormControl>
                          <Input placeholder="/logo.png" {...field} />
                        </FormControl>
                        <FormDescription>
                          Ruta de acceso al logo de la tienda.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={generalForm.control}
                    name="enableNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Notificaciones
                          </FormLabel>
                          <FormDescription>
                            Habilitar notificaciones del sistema.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" fullWidth>Guardar Configuración General</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Seguridad</CardTitle>
              <CardDescription>
                Gestione los ajustes de seguridad de su tienda.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...securityForm}>
                <form onSubmit={securityForm.handleSubmit(onSubmitSecurity)} className="space-y-6">
                  <FormField
                    control={securityForm.control}
                    name="enableTwoFactor"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Autenticación de Dos Factores
                          </FormLabel>
                          <FormDescription>
                            Requerir 2FA para el acceso de administradores.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={securityForm.control}
                    name="requireStrongPasswords"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Contraseñas Fuertes
                          </FormLabel>
                          <FormDescription>
                            Requerir contraseñas complejas para los usuarios.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={securityForm.control}
                    name="sessionTimeout"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tiempo de Sesión (minutos)</FormLabel>
                        <FormControl>
                          <Input placeholder="30" {...field} />
                        </FormControl>
                        <FormDescription>
                          Tiempo de inactividad antes de cerrar la sesión automáticamente.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" fullWidth>Guardar Configuración de Seguridad</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Pagos</CardTitle>
              <CardDescription>
                Configure los métodos de pago y tasas de impuestos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...paymentForm}>
                <form onSubmit={paymentForm.handleSubmit(onSubmitPayment)} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Configuración de Stripe</h3>
                    <Separator />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={paymentForm.control}
                        name="stripePK"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Clave Pública de Stripe</FormLabel>
                            <FormControl>
                              <Input placeholder="pk_test_..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={paymentForm.control}
                        name="stripeSK"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Clave Secreta de Stripe</FormLabel>
                            <FormControl>
                              <Input placeholder="sk_test_..." type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4">
                    <h3 className="text-lg font-medium">Configuración de PayPal</h3>
                    <Separator />
                    
                    <FormField
                      control={paymentForm.control}
                      name="enablePayPal"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Habilitar PayPal
                            </FormLabel>
                            <FormDescription>
                              Permitir pagos a través de PayPal.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={paymentForm.control}
                      name="payPalClientId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID de Cliente de PayPal</FormLabel>
                          <FormControl>
                            <Input placeholder="Client ID de PayPal" {...field} />
                          </FormControl>
                          <FormDescription>
                            Requerido si PayPal está habilitado.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-4 pt-4">
                    <h3 className="text-lg font-medium">Impuestos</h3>
                    <Separator />
                    
                    <FormField
                      control={paymentForm.control}
                      name="taxRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tasa de Impuesto (%)</FormLabel>
                          <FormControl>
                            <Input placeholder="16.00" {...field} />
                          </FormControl>
                          <FormDescription>
                            Porcentaje de impuesto a aplicar en las compras.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit" fullWidth>Guardar Configuración de Pagos</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shipping Settings */}
        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Envíos</CardTitle>
              <CardDescription>
                Configure las opciones de envío para sus productos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...shippingForm}>
                <form onSubmit={shippingForm.handleSubmit(onSubmitShipping)} className="space-y-6">
                  <FormField
                    control={shippingForm.control}
                    name="enableShipping"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Habilitar Envíos
                          </FormLabel>
                          <FormDescription>
                            Activar opciones de envío en la tienda.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={shippingForm.control}
                      name="freeShippingThreshold"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Umbral para Envío Gratuito (€)</FormLabel>
                          <FormControl>
                            <Input placeholder="100.00" {...field} />
                          </FormControl>
                          <FormDescription>
                            Monto mínimo de compra para envío gratis.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={shippingForm.control}
                      name="baseShippingRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tarifa Base de Envío (€)</FormLabel>
                          <FormControl>
                            <Input placeholder="5.99" {...field} />
                          </FormControl>
                          <FormDescription>
                            Costo base para envíos estándar.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit" fullWidth>Guardar Configuración de Envíos</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfigurationManagement;
