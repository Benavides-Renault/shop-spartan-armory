
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button-custom';
import { Dumbbell, Award, TrendingUp, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlanCardProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
  url: string;
  daysPerWeek: string;
}

const PlanCard = ({ title, description, features, icon, color, url, daysPerWeek }: PlanCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className={`${color} p-6 text-white flex items-center`}>
        <div className="mr-4 bg-white/20 rounded-full p-3">
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div className="p-6">
        <div className="flex items-center text-spartan-gray-600 mb-3">
          <CalendarDays className="w-4 h-4 mr-2" />
          <span>{daysPerWeek}</span>
        </div>
        <p className="text-spartan-gray-600 mb-4">{description}</p>
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-spartan-primary mr-2">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Link to={url}>
          <Button fullWidth>Ver detalles</Button>
        </Link>
      </div>
    </div>
  );
};

const TrainingPlans = () => {
  const plans = [
    {
      title: "Plan Principiante",
      description: "Ideal para quienes comienzan su camino en el entrenamiento de fuerza.",
      daysPerWeek: "3 días recomendados (adaptables)",
      features: [
        "Rutina de 3 días por semana",
        "Ejercicios básicos compuestos",
        "Progresión gradual de peso",
        "Guía nutricional básica",
        "Técnicas correctas de movimientos"
      ],
      icon: <Dumbbell className="w-6 h-6" />,
      color: "bg-spartan-primary",
      url: "/planes/principiante"
    },
    {
      title: "Plan Powerlifting",
      description: "Enfocado en maximizar fuerza en los tres grandes levantamientos.",
      daysPerWeek: "3-4 días por semana",
      features: [
        "Rutina de 3-4 días por semana",
        "Enfoque en sentadillas, peso muerto y press banca",
        "Programación periodizada",
        "Nutrición para maximizar fuerza",
        "Técnicas avanzadas de levantamiento"
      ],
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-amber-600",
      url: "/planes/powerlifting"
    },
    {
      title: "Plan Culturismo",
      description: "Diseñado para hipertrofia y desarrollo muscular estético.",
      daysPerWeek: "5-6 días por semana",
      features: [
        "Rutina de 5-6 días por semana",
        "Trabajo por grupos musculares",
        "Técnicas de intensidad variada",
        "Estrategias de nutrición para volumen y definición",
        "Posado y presentación"
      ],
      icon: <Award className="w-6 h-6" />,
      color: "bg-indigo-600",
      url: "/planes/culturismo"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Encabezado de la página */}
        <div className="bg-gradient-to-r from-spartan-primary/10 to-spartan-secondary/10 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-spartan-dark">Planes de Entrenamiento</h1>
            <p className="text-spartan-gray-700 mt-2">
              Programas diseñados por profesionales para maximizar tus resultados
            </p>
          </div>
        </div>
        
        {/* Contenido principal */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Alcanza tus objetivos más rápido con nuestros planes especializados</h2>
            <p className="text-spartan-gray-600">
              Nuestros planes están diseñados por profesionales con años de experiencia en distintas disciplinas. 
              Cada programa incluye rutinas detalladas, recomendaciones nutricionales y seguimiento personalizado.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <PlanCard key={plan.title} {...plan} />
            ))}
          </div>
          
          <div className="mt-16 bg-spartan-light rounded-lg p-8">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-xl font-bold mb-4">¿Necesitas un plan totalmente personalizado?</h3>
              <p className="mb-6">
                Trabajemos juntos para crear un programa adaptado específicamente a tus necesidades, 
                objetivos y circunstancias particulares.
              </p>
              <Link to="/planes/personalizado">
                <Button size="lg">Solicitar asesoría personalizada</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrainingPlans;
