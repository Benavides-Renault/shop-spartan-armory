
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Button } from '../../components/ui/button-custom';
import { Check, ArrowRight, Calendar, User, Clock } from 'lucide-react';

const PowerliftingPlan = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-amber-500/10 to-amber-700/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block bg-amber-600 text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
                Para amantes de la fuerza
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-spartan-dark mb-4">
                Plan de Powerlifting
              </h1>
              <p className="text-lg text-spartan-gray-700 mb-6">
                Maximiza tu fuerza en los tres grandes levantamientos: sentadilla, peso muerto y press de banca.
                Plan diseñado para quienes buscan romper sus límites de fuerza.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center text-spartan-gray-600">
                  <Clock className="mr-2 h-5 w-5 text-amber-600" />
                  <span>4 meses de duración</span>
                </div>
                <div className="flex items-center text-spartan-gray-600">
                  <Calendar className="mr-2 h-5 w-5 text-amber-600" />
                  <span>3-4 días por semana</span>
                </div>
                <div className="flex items-center text-spartan-gray-600">
                  <User className="mr-2 h-5 w-5 text-amber-600" />
                  <span>1 revisión mensual</span>
                </div>
              </div>
              <div className="flex justify-center">
                <Link to="/contacto">
                  <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                    Contratar plan - ₡60,000
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
                <div className="bg-amber-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-amber-800">Entrenamiento</h3>
                  <ul className="space-y-3">
                    <li className="flex">
                      <Check className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                      <span>Programa periodizado de 4 meses</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                      <span>Enfoque en sentadilla, peso muerto y press de banca</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                      <span>Ciclos de volumen, fuerza y pico de rendimiento</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                      <span>Ejercicios accesorios específicos para puntos débiles</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                      <span>Técnicas avanzadas de entrenamiento de fuerza</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-amber-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-amber-800">Nutrición</h3>
                  <ul className="space-y-3">
                    <li className="flex">
                      <Check className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                      <span>Plan nutricional enfocado en rendimiento y fuerza</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                      <span>Estrategias para mantener/ajustar categoría de peso</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                      <span>Nutrición pre y post entrenamiento</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                      <span>Recomendaciones de suplementación específica</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                      <span>Estrategias de alimentación según fase de entrenamiento</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-10 bg-amber-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-amber-800">Seguimiento</h3>
                <ul className="space-y-3">
                  <li className="flex">
                    <Check className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                    <span>Una revisión mensual del progreso (4 en total)</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                    <span>Análisis de técnica mediante videos</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                    <span>Ajustes de programación según respuesta individual</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                    <span>Soporte por correo electrónico</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* What to Expect Section */}
        <section className="py-16 bg-gradient-to-r from-amber-50 to-amber-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-10">
                ¿Qué puedes esperar?
              </h2>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">Mes 1: Fase de volumen</h3>
                  <p className="text-spartan-gray-600">
                    Comenzaremos con un ciclo de alto volumen y moderada intensidad para construir una base
                    sólida de fuerza y mejorar la técnica de los levantamientos principales.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">Mes 2-3: Fase de fuerza</h3>
                  <p className="text-spartan-gray-600">
                    Incrementaremos gradualmente la intensidad y reduciremos el volumen. El enfoque será
                    desarrollar la máxima fuerza en los tres levantamientos principales mediante progresiones
                    estructuradas de carga.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">Mes 4: Fase de pico y prueba</h3>
                  <p className="text-spartan-gray-600">
                    Prepararemos tu cuerpo para alcanzar máximos personales en los tres levantamientos.
                    Incluye estrategias de reducción de volumen, intensificación selectiva y
                    culmina con una semana de prueba para evaluar tu nueva fuerza máxima.
                  </p>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <Link to="/contacto">
                  <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                    Contratar ahora - ₡60,000
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

export default PowerliftingPlan;
