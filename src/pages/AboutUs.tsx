
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Layout } from '../components/layout/Layout';

const AboutUs = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">{t('aboutUs.title')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-spartan-primary">{t('aboutUs.mission')}</h2>
            <p className="text-lg mb-6">
              En Spartan Supplements, nuestra misión es proporcionar suplementos de la más alta calidad y planes de entrenamiento 
              personalizados que ayuden a nuestros clientes a alcanzar sus objetivos de fitness y bienestar.
            </p>
            <p className="text-lg mb-6">
              Nos comprometemos a ofrecer productos premium, respaldados por la ciencia y probados rigurosamente para garantizar 
              resultados efectivos y seguros.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img 
              src="/path/to/mission-image.jpg" 
              alt="Nuestra misión" 
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80";
              }}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1 rounded-lg overflow-hidden shadow-xl">
            <img 
              src="/path/to/vision-image.jpg" 
              alt="Nuestra visión" 
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80";
              }}
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl font-bold mb-4 text-spartan-primary">{t('aboutUs.vision')}</h2>
            <p className="text-lg mb-6">
              Aspiramos a ser líderes en la industria de suplementos deportivos en Costa Rica, reconocidos por 
              la calidad, innovación y efectividad de nuestros productos.
            </p>
            <p className="text-lg mb-6">
              Buscamos crear una comunidad de atletas y entusiastas del fitness comprometidos con la excelencia, 
              donde cada miembro reciba apoyo personalizado para alcanzar su máximo potencial.
            </p>
          </div>
        </div>
        
        <div className="bg-spartan-light rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center text-spartan-primary">{t('aboutUs.values')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-spartan-primary">Calidad</h3>
              <p>Ofrecemos solo productos y servicios de primera calidad, sin compromisos.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-spartan-primary">Integridad</h3>
              <p>Actuamos con honestidad y transparencia en todo lo que hacemos.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-spartan-primary">Innovación</h3>
              <p>Buscamos constantemente nuevas formas de mejorar nuestros productos y servicios.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-spartan-primary">Compromiso</h3>
              <p>Estamos dedicados al éxito y bienestar de cada uno de nuestros clientes.</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-6 text-spartan-primary">{t('aboutUs.team')}</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Contamos con un equipo de profesionales apasionados por el fitness y la nutrición, 
            incluyendo entrenadores certificados, nutricionistas y especialistas en suplementación.
          </p>
          <Link to="/contacto" className="btn-primary inline-block px-8 py-3 bg-spartan-primary text-white rounded-lg hover:bg-spartan-primary-dark transition duration-300">
            {t('aboutUs.contactUs')}
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
