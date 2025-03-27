
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Button } from '../../components/ui/button-custom';
import { Check, ArrowRight, Calendar, User, Clock } from 'lucide-react';

const BodybuildingPlan = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-500/10 to-indigo-700/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block bg-indigo-600 text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
                Desarrollo muscular óptimo
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-spartan-dark mb-4">
                Plan de Culturismo
              </h1>
              <p className="text-lg text-spartan-gray-700 mb-6">
                Diseñado para maximizar la hipertrofia y el desarrollo muscular estético. 
                Ideal para quienes buscan mejorar su físico, competidores y entusiastas del culturismo.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center text-spartan-gray-600">
                  <Clock className="mr-2 h-5 w-5 text-indigo-600" />
                  <span>4 meses de duración</span>
                </div>
                <div className="flex items-center text-spartan-gray-600">
                  <Calendar className="mr-2 h-5 w-5 text-indigo-600" />
                  <span>5-6 días por semana</span>
                </div>
                <div className="flex items-center text-spartan-gray-600">
                  <User className="mr-2 h-5 w-5 text-indigo-600" />
                  <span>1 revisión mensual</span>
                </div>
              </div>
              <div className="flex justify-center">
                <Link to="/contacto">
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                    Contratar plan - ₡70,000
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-10">
                ¿Qué incluye este plan?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-indigo-800">Entrenamiento</h3>
                  <ul className="space-y-3">
                    <li className="flex">
                      <Check className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" />
                      <span>Rutina dividida por grupos musculares (5-6 días)</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" />
                      <span>Técnicas especializadas de hipertrofia</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" />
                      <span>Variación de estímulos para máximo desarrollo</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" />
                      <span>Periodización para volumen y definición</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" />
                      <span>Estrategias avanzadas de intensificación</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-indigo-800">Nutrición</h3>
                  <ul className="space-y-3">
                    <li className="flex">
                      <Check className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" />
                      <span>Plan detallado para volumen limpio o definición</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" />
                      <span>Ciclos de superávit y déficit calórico</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" />
                      <span>Distribución óptima de macronutrientes</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" />
                      <span>Timing nutricional para maximizar resultados</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" />
                      <span>Suplementación específica para culturismo</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-10 bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-indigo-800">Seguimiento y extras</h3>
                <ul className="space-y-3">
                  <li className="flex">
                    <Check className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" />
                    <span>Una revisión mensual del progreso (4 en total)</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" />
                    <span>Análisis de proporciones y simetría</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" />
                    <span>Guía de poses básicas de culturismo</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" />
                    <span>Estrategias para áreas difíciles de desarrollar</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" />
                    <span>Soporte por correo electrónico</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* What to Expect Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-50 to-indigo-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-10">
                ¿Qué puedes esperar?
              </h2>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">Mes 1-2: Fase de volumen</h3>
                  <p className="text-spartan-gray-600">
                    Comenzaremos con un enfoque en el aumento de masa muscular mediante entrenamientos
                    de alto volumen y alimentación en superávit calórico controlado. El objetivo es 
                    maximizar el crecimiento muscular minimizando la acumulación de grasa.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">Mes 3: Fase de transición</h3>
                  <p className="text-spartan-gray-600">
                    Ajustaremos el entrenamiento y la nutrición para comenzar a mejorar la definición
                    muscular mientras mantenemos el tamaño adquirido. Implementaremos técnicas específicas
                    para áreas que necesiten mayor desarrollo.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">Mes 4: Fase de definición</h3>
                  <p className="text-spartan-gray-600">
                    Enfoque en la definición muscular y mejora de la composición corporal. Incluye estrategias
                    específicas para preservar la masa muscular mientras se reduce el porcentaje de grasa corporal.
                    Ideal para quienes quieren un look más definido o se preparan para competir.
                  </p>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <Link to="/contacto">
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                    Contratar ahora - ₡70,000
                  </Button>
                </Link>
                <p className="mt-4 text-sm text-spartan-gray-500">
                  Pago único por el plan completo de 4 meses. Incluye 4 revisiones (una por mes).
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BodybuildingPlan;
