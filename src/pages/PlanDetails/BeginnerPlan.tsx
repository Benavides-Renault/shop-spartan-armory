
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Button } from '../../components/ui/button-custom';
import { Check, ArrowRight, Calendar, User, Clock } from 'lucide-react';

const BeginnerPlan = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-spartan-primary/10 to-spartan-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block bg-spartan-primary text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
                Ideal para principiantes
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-spartan-dark mb-4">
                Plan de Entrenamiento para Principiantes
              </h1>
              <p className="text-lg text-spartan-gray-700 mb-6">
                El punto de partida perfecto para quienes se inician en el mundo del fitness y 
                desean establecer una base sólida de fuerza y resistencia.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center text-spartan-gray-600">
                  <Clock className="mr-2 h-5 w-5 text-spartan-primary" />
                  <span>3 meses de duración</span>
                </div>
                <div className="flex items-center text-spartan-gray-600">
                  <Calendar className="mr-2 h-5 w-5 text-spartan-primary" />
                  <span>3 días por semana</span>
                </div>
                <div className="flex items-center text-spartan-gray-600">
                  <User className="mr-2 h-5 w-5 text-spartan-primary" />
                  <span>1 revisión mensual</span>
                </div>
              </div>
              <div className="flex justify-center">
                <Link to="/contacto">
                  <Button size="lg">
                    Contratar plan - ₡45,000
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
                <div className="bg-spartan-light p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Entrenamiento</h3>
                  <ul className="space-y-3">
                    <li className="flex">
                      <Check className="h-5 w-5 text-spartan-primary mr-2 flex-shrink-0" />
                      <span>Rutina de 3 días adaptada a tu nivel actual</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-spartan-primary mr-2 flex-shrink-0" />
                      <span>Enfoque en ejercicios compuestos fundamentales</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-spartan-primary mr-2 flex-shrink-0" />
                      <span>Videos explicativos para cada ejercicio</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-spartan-primary mr-2 flex-shrink-0" />
                      <span>Progresión gradual de intensidad</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-spartan-primary mr-2 flex-shrink-0" />
                      <span>Alternativas para ejercicios según disponibilidad de equipo</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-spartan-light p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Nutrición</h3>
                  <ul className="space-y-3">
                    <li className="flex">
                      <Check className="h-5 w-5 text-spartan-primary mr-2 flex-shrink-0" />
                      <span>Guía nutricional básica adaptada a tus objetivos</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-spartan-primary mr-2 flex-shrink-0" />
                      <span>Recomendaciones de macronutrientes</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-spartan-primary mr-2 flex-shrink-0" />
                      <span>Ejemplo de menú semanal</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-spartan-primary mr-2 flex-shrink-0" />
                      <span>Lista de alimentos recomendados</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-spartan-primary mr-2 flex-shrink-0" />
                      <span>Sugerencias de suplementación básica</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-10 bg-spartan-light p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Seguimiento</h3>
                <ul className="space-y-3">
                  <li className="flex">
                    <Check className="h-5 w-5 text-spartan-primary mr-2 flex-shrink-0" />
                    <span>Una revisión mensual del progreso (3 en total)</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-spartan-primary mr-2 flex-shrink-0" />
                    <span>Ajustes de la rutina según tu evolución</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-spartan-primary mr-2 flex-shrink-0" />
                    <span>Soporte por correo electrónico</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* What to Expect Section */}
        <section className="py-16 bg-gradient-to-r from-spartan-primary/5 to-spartan-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-10">
                ¿Qué puedes esperar?
              </h2>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">Mes 1: Estableciendo las bases</h3>
                  <p className="text-spartan-gray-600">
                    Aprenderás la técnica correcta de los ejercicios fundamentales mientras tu cuerpo se adapta 
                    al entrenamiento con pesas. Trabajaremos en establecer la consistencia y los hábitos adecuados.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">Mes 2: Progresión gradual</h3>
                  <p className="text-spartan-gray-600">
                    Incrementaremos progresivamente la intensidad y volumen del entrenamiento. Comenzarás a notar
                    mejoras en tu fuerza y resistencia, así como cambios sutiles en tu composición corporal.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">Mes 3: Consolidación y avance</h3>
                  <p className="text-spartan-gray-600">
                    Con una base sólida establecida, implementaremos técnicas más avanzadas para continuar tu progreso.
                    Al finalizar este mes, tendrás las herramientas y conocimientos necesarios para seguir entrenando
                    de manera efectiva.
                  </p>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <Link to="/contacto">
                  <Button size="lg">
                    Contratar ahora - ₡45,000
                  </Button>
                </Link>
                <p className="mt-4 text-sm text-spartan-gray-500">
                  Pago único por el plan completo de 3 meses. Incluye 3 revisiones (una por mes).
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

export default BeginnerPlan;
