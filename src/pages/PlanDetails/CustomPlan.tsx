
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Button } from '../../components/ui/button-custom';
import { Check, ArrowRight, Send, MessageSquare } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const CustomPlan = () => {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    experience: 'principiante',
    goal: '',
    limitations: '',
    schedule: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // En una aplicación real, aquí enviaríamos los datos a un servidor
    console.log('Formulario enviado:', formData);
    toast({
      title: "Solicitud enviada",
      description: "Hemos recibido tu solicitud de plan personalizado. Te contactaremos pronto.",
    });
    
    // Resetear formulario
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      experience: 'principiante',
      goal: '',
      limitations: '',
      schedule: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-spartan-primary/10 to-spartan-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block bg-spartan-primary text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
                Plan a tu medida
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-spartan-dark mb-4">
                Asesoría Personalizada
              </h1>
              <p className="text-lg text-spartan-gray-700 mb-6">
                Diseñamos un plan completamente adaptado a tus necesidades, objetivos y circunstancias.
                Cuéntanos sobre ti y juntos crearemos el plan perfecto para alcanzar tus metas.
              </p>
            </div>
          </div>
        </div>
        
        {/* Form Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-spartan-light p-8 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold mb-8 text-center">
                  Solicita tu plan personalizado
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-spartan-gray-700 mb-1">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-spartan-gray-300 rounded-md focus:ring-2 focus:ring-spartan-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-spartan-gray-700 mb-1">
                        Correo electrónico *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-spartan-gray-300 rounded-md focus:ring-2 focus:ring-spartan-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-spartan-gray-700 mb-1">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-spartan-gray-300 rounded-md focus:ring-2 focus:ring-spartan-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-spartan-gray-700 mb-1">
                        Edad *
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        min="16"
                        max="99"
                        className="w-full px-4 py-2 border border-spartan-gray-300 rounded-md focus:ring-2 focus:ring-spartan-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-spartan-gray-700 mb-1">
                        Nivel de experiencia *
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-spartan-gray-300 rounded-md focus:ring-2 focus:ring-spartan-primary focus:border-transparent"
                      >
                        <option value="principiante">Principiante (0-1 año)</option>
                        <option value="intermedio">Intermedio (1-3 años)</option>
                        <option value="avanzado">Avanzado (3+ años)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="goal" className="block text-sm font-medium text-spartan-gray-700 mb-1">
                        Objetivo principal *
                      </label>
                      <input
                        type="text"
                        id="goal"
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                        required
                        placeholder="Ej: Ganar masa muscular, perder grasa..."
                        className="w-full px-4 py-2 border border-spartan-gray-300 rounded-md focus:ring-2 focus:ring-spartan-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="limitations" className="block text-sm font-medium text-spartan-gray-700 mb-1">
                      Limitaciones físicas o lesiones
                    </label>
                    <input
                      type="text"
                      id="limitations"
                      name="limitations"
                      value={formData.limitations}
                      onChange={handleChange}
                      placeholder="Si tienes alguna lesión o limitación, indícala aquí"
                      className="w-full px-4 py-2 border border-spartan-gray-300 rounded-md focus:ring-2 focus:ring-spartan-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="schedule" className="block text-sm font-medium text-spartan-gray-700 mb-1">
                      Disponibilidad semanal para entrenar *
                    </label>
                    <input
                      type="text"
                      id="schedule"
                      name="schedule"
                      value={formData.schedule}
                      onChange={handleChange}
                      required
                      placeholder="Ej: 3 días a la semana, 1 hora por sesión"
                      className="w-full px-4 py-2 border border-spartan-gray-300 rounded-md focus:ring-2 focus:ring-spartan-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-spartan-gray-700 mb-1">
                      Información adicional
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Cualquier otra información que consideres relevante para tu plan personalizado"
                      className="w-full px-4 py-2 border border-spartan-gray-300 rounded-md focus:ring-2 focus:ring-spartan-primary focus:border-transparent"
                    ></textarea>
                  </div>
                  
                  <div className="text-center">
                    <Button 
                      type="submit" 
                      size="lg" 
                      leftIcon={<Send className="w-4 h-4" />}
                    >
                      Enviar solicitud
                    </Button>
                    <p className="mt-2 text-sm text-spartan-gray-500">
                      Te contactaremos en un plazo de 24-48 horas para discutir los detalles.
                    </p>
                  </div>
                </form>
              </div>
              
              <div className="mt-12 bg-gradient-to-r from-spartan-primary/10 to-spartan-secondary/10 p-8 rounded-xl">
                <div className="flex items-start">
                  <div className="bg-spartan-primary/20 p-3 rounded-full mr-4 flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-spartan-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">¿Prefieres contactarnos directamente?</h3>
                    <p className="text-spartan-gray-600 mb-4">
                      Si tienes dudas o prefieres hablar con nosotros antes de solicitar tu plan personalizado,
                      puedes contactarnos a través de los siguientes medios:
                    </p>
                    <ul className="space-y-2 text-spartan-gray-600">
                      <li>Email: info@spartanarmory.com</li>
                      <li>WhatsApp: +506 8888-8888</li>
                      <li>Instagram: @spartanarmory</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section className="py-16 bg-gradient-to-r from-spartan-primary/5 to-spartan-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-10">Precios de la asesoría personalizada</h2>
              
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-spartan-primary p-6 text-white">
                  <h3 className="text-xl font-bold">Plan Personalizado Premium</h3>
                  <p className="text-white/80">El plan más completo, totalmente adaptado a ti</p>
                </div>
                
                <div className="p-8">
                  <div className="flex justify-center mb-6">
                    <span className="text-4xl font-bold">₡95,000</span>
                    <span className="text-spartan-gray-500 self-end ml-2">/ 4 meses</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8 max-w-lg mx-auto text-left">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-spartan-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Plan de entrenamiento 100% personalizado según tus objetivos, experiencia y disponibilidad</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-spartan-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Plan nutricional detallado adaptado a tus preferencias y estilo de vida</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-spartan-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Seguimiento semanal durante 4 meses (16 revisiones en total)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-spartan-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Ajustes continuos del plan según tu progreso y feedback</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-spartan-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Soporte ilimitado vía WhatsApp para resolver dudas</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-spartan-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Recomendaciones de suplementación específicas para tus objetivos</span>
                    </li>
                  </ul>
                  
                  <Button fullWidth size="lg">
                    Solicitar plan personalizado
                  </Button>
                </div>
              </div>
              
              <p className="mt-8 text-spartan-gray-600">
                * Tras enviar tu solicitud, realizaremos una evaluación inicial gratuita para determinar 
                tus necesidades específicas antes de proceder con el pago.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CustomPlan;
