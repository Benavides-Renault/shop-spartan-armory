
import React from 'react';
import { Check, ArrowRight, Award, TrendingUp, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import { Button } from '../components/ui/button-custom';
import { useLanguage } from '../context/LanguageContext';

const Index = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Sección Hero */}
        <Hero />
        
        {/* Sección de Productos Destacados */}
        <FeaturedProducts />
        
        {/* Sección de Categorías */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-sm uppercase tracking-wider text-spartan-primary font-semibold mb-2">
                {t('nav.services')}
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-spartan-dark dark:text-white mb-4">
                {t('nav.services')}
              </h3>
              <p className="text-spartan-gray-700 dark:text-gray-300">
                {t('hero.description')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Suplementos */}
              <Link to="/productos" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-subtle p-6 hover-lift h-full flex flex-col">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
                    <img 
                      src="https://images.unsplash.com/photo-1579722821273-0f6fbd2ff873?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                      alt="Suplementos"
                      className="w-6 h-6 object-cover rounded-full" 
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-spartan-dark dark:text-white mb-2 group-hover:text-spartan-primary transition-colors">
                    Suplementos
                  </h4>
                  <p className="text-spartan-gray-500 dark:text-gray-400 text-sm mb-4">
                    Descubre nuestra selección de proteínas, creatina, pre-entrenos y más para potenciar tu rendimiento.
                  </p>
                  <div className="mt-auto">
                    <span className="text-spartan-primary inline-flex items-center group-hover:translate-x-1 transition-transform">
                      Ver productos <ArrowRight className="ml-1 w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
              
              {/* Planes Deportivos */}
              <Link to="/planes" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-subtle p-6 hover-lift h-full flex flex-col">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/40 transition-colors">
                    <img 
                      src="https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80" 
                      alt="Planes Deportivos"
                      className="w-6 h-6 object-cover rounded-full" 
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-spartan-dark dark:text-white mb-2 group-hover:text-spartan-primary transition-colors">
                    Planes Deportivos y Preparaciones
                  </h4>
                  <p className="text-spartan-gray-500 dark:text-gray-400 text-sm mb-4">
                    Planes personalizados para conseguir tus objetivos: ganancia muscular, pérdida de grasa o preparación para competiciones.
                  </p>
                  <div className="mt-auto">
                    <span className="text-spartan-primary inline-flex items-center group-hover:translate-x-1 transition-transform">
                      Ver planes <ArrowRight className="ml-1 w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
              
              {/* Guías */}
              <Link to="/guias" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-subtle p-6 hover-lift h-full flex flex-col">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-200 dark:group-hover:bg-red-800/40 transition-colors">
                    <img 
                      src="https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80" 
                      alt="Guías gratuitas"
                      className="w-6 h-6 object-cover rounded-full" 
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-spartan-dark dark:text-white mb-2 group-hover:text-spartan-primary transition-colors">
                    Guías y Recomendaciones Gratuitas
                  </h4>
                  <p className="text-spartan-gray-500 dark:text-gray-400 text-sm mb-4">
                    Recursos gratuitos con consejos prácticos para entrenamiento, nutrición y bienestar general.
                  </p>
                  <div className="mt-auto">
                    <span className="text-spartan-primary inline-flex items-center group-hover:translate-x-1 transition-transform">
                      Ver guías <ArrowRight className="ml-1 w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/productos">
                <Button>{t('nav.products')}</Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Sección de Beneficios */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1577221084712-45b0445d2b00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1596&q=80" 
                  alt="Calidad SpartanArmory" 
                  className="rounded-xl shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-spartan-light rounded-xl -z-10"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 border-4 border-spartan-primary/20 rounded-xl -z-10"></div>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-sm uppercase tracking-wider text-spartan-primary font-semibold">
                  Por qué elegirnos
                </h2>
                <h3 className="text-3xl md:text-4xl font-bold text-spartan-dark">
                  Comprometidos con tu éxito y resultados
                </h3>
                <p className="text-spartan-gray-700">
                  En SpartanArmory Supplements nos dedicamos a proporcionar los mejores suplementos
                  deportivos para atletas y entusiastas del fitness en Costa Rica. Nuestra pasión es tu éxito.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-spartan-primary/10 p-1 rounded mt-1 mr-3">
                      <Check className="w-4 h-4 text-spartan-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-spartan-dark">Calidad Premium</h4>
                      <p className="text-sm text-spartan-gray-500">
                        Todos nuestros productos son de la más alta calidad, seleccionados cuidadosamente.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-spartan-primary/10 p-1 rounded mt-1 mr-3">
                      <Check className="w-4 h-4 text-spartan-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-spartan-dark">Envío Rápido</h4>
                      <p className="text-sm text-spartan-gray-500">
                        Entrega en todo Costa Rica, con opciones express para la Gran Área Metropolitana.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-spartan-primary/10 p-1 rounded mt-1 mr-3">
                      <Check className="w-4 h-4 text-spartan-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-spartan-dark">Asesoramiento Personalizado</h4>
                      <p className="text-sm text-spartan-gray-500">
                        Nuestro equipo de expertos te guiará para encontrar los suplementos adecuados para ti.
                      </p>
                    </div>
                  </li>
                </ul>
                
                <div className="flex justify-end pt-6 mt-4">
                  <Link to="/nosotros">
                    <Button className="w-full md:w-auto">Conoce más sobre nosotros</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Sección de Planes y Guías */}
        <section className="py-16 bg-gradient-to-br from-spartan-dark to-spartan-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-sm uppercase tracking-wider text-spartan-primary font-semibold mb-2">
                Más allá de los suplementos
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Recursos para potenciar tu entrenamiento
              </h3>
              <p className="text-spartan-gray-300">
                Te ofrecemos planes de entrenamiento personalizados y guías gratuitas para principiantes
                para ayudarte a maximizar tus resultados.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Planes de Entrenamiento */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover-lift">
                <div className="flex items-center mb-6">
                  <div className="bg-spartan-primary/20 p-3 rounded-lg mr-4">
                    <TrendingUp className="w-6 h-6 text-spartan-primary" />
                  </div>
                  <h4 className="text-2xl font-semibold">Planes de Entrenamiento</h4>
                </div>
                <p className="text-spartan-gray-300 mb-8">
                  Planes personalizados diseñados por profesionales para ayudarte a alcanzar tus objetivos específicos, 
                  ya sea ganancia muscular, pérdida de grasa o mejora del rendimiento.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-spartan-primary mr-2" />
                    <span>Personalizados a tus objetivos</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-spartan-primary mr-2" />
                    <span>Ajustes según tu progreso</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-spartan-primary mr-2" />
                    <span>Incluye recomendaciones nutricionales</span>
                  </li>
                </ul>
                <Link to="/planes">
                  <Button>Ver planes disponibles</Button>
                </Link>
              </div>
              
              {/* Guías para Principiantes */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover-lift">
                <div className="flex items-center mb-6">
                  <div className="bg-spartan-primary/20 p-3 rounded-lg mr-4">
                    <Gift className="w-6 h-6 text-spartan-primary" />
                  </div>
                  <h4 className="text-2xl font-semibold">Guías para Principiantes</h4>
                </div>
                <p className="text-spartan-gray-300 mb-8">
                  Recursos gratuitos diseñados para ayudar a quienes están comenzando su viaje fitness. 
                  Aprende los fundamentos del entrenamiento y la nutrición.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-spartan-primary mr-2" />
                    <span>Totalmente gratuitas</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-spartan-primary mr-2" />
                    <span>Ejercicios básicos con técnica correcta</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-spartan-primary mr-2" />
                    <span>Consejos de alimentación saludable</span>
                  </li>
                </ul>
                <Link to="/guias">
                  <Button>Acceder a las guías</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Sección de Testimonios */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-sm uppercase tracking-wider text-spartan-primary font-semibold mb-2">
                Testimonios
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-spartan-dark mb-4">
                Lo que dicen nuestros clientes
              </h3>
              <p className="text-spartan-gray-700">
                Descubre las experiencias de quienes ya confían en SpartanArmory Supplements
                para potenciar su rendimiento deportivo.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Testimonio 1 */}
              <div className="bg-spartan-light rounded-xl p-6 hover-lift">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-spartan-primary/20 rounded-full flex items-center justify-center mr-4">
                    <Award className="w-6 h-6 text-spartan-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-spartan-dark">Carlos M.</h4>
                    <p className="text-sm text-spartan-gray-500">Atleta de CrossFit</p>
                  </div>
                </div>
                <p className="text-spartan-gray-700 italic">
                  "Desde que comencé a usar los suplementos de SpartanArmory, mi rendimiento ha mejorado significativamente. 
                  La calidad es excelente y el servicio al cliente es inigualable."
                </p>
              </div>
              
              {/* Testimonio 2 */}
              <div className="bg-spartan-light rounded-xl p-6 hover-lift">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-spartan-primary/20 rounded-full flex items-center justify-center mr-4">
                    <Award className="w-6 h-6 text-spartan-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-spartan-dark">Laura P.</h4>
                    <p className="text-sm text-spartan-gray-500">Entrenadora personal</p>
                  </div>
                </div>
                <p className="text-spartan-gray-700 italic">
                  "Recomiendo SpartanArmory a todos mis clientes. No solo por la calidad de sus productos, 
                  sino por el valioso asesoramiento que brindan. Han ayudado a muchos de mis clientes a alcanzar sus metas."
                </p>
              </div>
              
              {/* Testimonio 3 */}
              <div className="bg-spartan-light rounded-xl p-6 hover-lift">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-spartan-primary/20 rounded-full flex items-center justify-center mr-4">
                    <Award className="w-6 h-6 text-spartan-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-spartan-dark">Miguel R.</h4>
                    <p className="text-sm text-spartan-gray-500">Fisicoculturista</p>
                  </div>
                </div>
                <p className="text-spartan-gray-700 italic">
                  "La diferencia en calidad es notable. He probado muchas marcas, pero los productos de SpartanArmory 
                  me han dado los mejores resultados. Además, los envíos siempre llegan a tiempo, lo cual es crucial."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Sección CTA */}
        <section className="py-16 bg-gradient-to-r from-spartan-primary to-spartan-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-2xl mx-auto">
              {t('hero.title')}
            </h2>
            <p className="text-lg mb-8 max-w-xl mx-auto">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/productos">
                <Button 
                  size="lg"
                  className="bg-white text-spartan-primary hover:bg-spartan-light"
                >
                  {t('hero.cta.products')}
                </Button>
              </Link>
              <Link to="/contacto">
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  {t('nav.contact')}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
