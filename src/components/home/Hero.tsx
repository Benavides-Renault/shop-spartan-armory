
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button-custom';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20">
      {/* Fondo con gradiente y patrón */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#3333_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>
      
      {/* Círculo decorativo */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-spartan-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 z-10 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          {/* Texto y CTA */}
          <div className="md:w-1/2 mb-12 md:mb-0 space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-spartan-dark dark:text-white">
              {t('hero.title')} <span className="text-spartan-primary">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="text-lg md:text-xl text-spartan-gray-700 dark:text-gray-300 max-w-lg">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <Link to="/productos">
                <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  {t('hero.cta.products')}
                </Button>
              </Link>
              <Link to="/planes">
                <Button variant="outline" size="lg">
                  {t('hero.cta.trainingPlans')}
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-8 pt-6">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-spartan-dark dark:text-white">100%</span>
                <span className="text-sm text-spartan-gray-500 dark:text-gray-400">{t('hero.stats.quality')}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-spartan-dark dark:text-white">24h</span>
                <span className="text-sm text-spartan-gray-500 dark:text-gray-400">{t('hero.stats.delivery')}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-spartan-dark dark:text-white">+500</span>
                <span className="text-sm text-spartan-gray-500 dark:text-gray-400">{t('hero.stats.clients')}</span>
              </div>
            </div>
          </div>
          
          {/* Imagen */}
          <div className="md:w-1/2 relative animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1579758629938-03607ccdbaba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1550&q=80" 
                alt={t('hero.imageAlt')} 
                className="rounded-xl shadow-xl max-w-full object-cover h-[500px] hover-lift"
              />
            </div>
            {/* Elementos decorativos posicionados alrededor de la imagen */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-spartan-primary rounded-lg -z-10 transform -rotate-6"></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 border-4 border-spartan-primary/30 rounded-lg -z-10 transform rotate-6"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
