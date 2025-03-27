
import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button-custom';
import { Input } from '../components/ui/input';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulación de envío de formulario
    setTimeout(() => {
      toast.success('Mensaje enviado correctamente');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  const openWhatsApp = () => {
    const phoneNumber = "50683476182";
    const message = "Hola, me interesa conocer más sobre SpartanArmory Supplements.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Encabezado de la página */}
        <div className="bg-gradient-to-r from-spartan-primary/10 to-spartan-secondary/10 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-spartan-dark">Contáctanos</h1>
            <p className="text-spartan-gray-700 mt-2">
              Estamos aquí para ayudarte con cualquier consulta
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Información de contacto */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Información de Contacto</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <MapPin className="w-5 h-5 text-spartan-primary" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">Ubicación</h3>
                      <p className="text-spartan-gray-600">
                        San José, Costa Rica <br />
                        Local #123, Centro Comercial
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Phone className="w-5 h-5 text-spartan-primary" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">Teléfono</h3>
                      <p className="text-spartan-gray-600">
                        +506 8347 6182
                      </p>
                      <button 
                        onClick={openWhatsApp}
                        className="flex items-center text-spartan-primary hover:underline mt-2"
                      >
                        <MessageSquare className="w-4 h-4 mr-1" />
                        <span className="text-sm">Contáctanos por WhatsApp</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Mail className="w-5 h-5 text-spartan-primary" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">Correo Electrónico</h3>
                      <p className="text-spartan-gray-600">
                        info@spartanarmory.com <br />
                        ventas@spartanarmory.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Clock className="w-5 h-5 text-spartan-primary" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">Horario de Atención</h3>
                      <p className="text-spartan-gray-600">
                        Lunes a Viernes: 9:00 AM - 7:00 PM <br />
                        Sábados: 10:00 AM - 5:00 PM <br />
                        Domingos: Cerrado
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium mb-4">Síguenos en Redes Sociales</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-spartan-light hover:bg-spartan-primary hover:text-white p-3 rounded-full transition-colors">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="bg-spartan-light hover:bg-spartan-primary hover:text-white p-3 rounded-full transition-colors">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="bg-spartan-light hover:bg-spartan-primary hover:text-white p-3 rounded-full transition-colors">
                      <MessageSquare className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Formulario de contacto */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Envíanos un Mensaje</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-spartan-gray-700 mb-1">
                        Nombre completo <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-spartan-gray-700 mb-1">
                        Correo electrónico <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-spartan-gray-700 mb-1">
                        Teléfono
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-spartan-gray-700 mb-1">
                        Asunto <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-spartan-gray-700 mb-1">
                      Mensaje <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    ></textarea>
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg"
                    isLoading={isSubmitting}
                    leftIcon={!isSubmitting ? <Send className="w-4 h-4" /> : undefined}
                  >
                    Enviar mensaje
                  </Button>
                </form>
              </div>
            </div>
          </div>
          
          {/* Mapa (simulado) */}
          <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">Nuestra Ubicación</h2>
            <div className="h-96 bg-spartan-gray-100 rounded-lg overflow-hidden">
              {/* En una implementación real, aquí iría un embed de Google Maps */}
              <div className="w-full h-full flex items-center justify-center bg-spartan-light">
                <div className="text-center">
                  <MapPin className="w-12 h-12 mx-auto text-spartan-primary mb-4" />
                  <p className="text-spartan-gray-600">
                    Aquí iría el mapa interactivo con nuestra ubicación
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
