
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Settings } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const { user, isAdmin } = useAuth();
  
  return (
    <footer className="bg-spartan-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Información de la empresa */}
          <div className="lg:col-span-1 animate-fade-in">
            <h3 className="text-xl font-bold mb-4">SpartanArmory Supplements</h3>
            <p className="text-spartan-gray-300 mb-4">
              {t('footer.info')}
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-spartan-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-spartan-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-spartan-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Enlaces rápidos */}
          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h3 className="text-xl font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/productos" className="text-spartan-gray-300 hover:text-spartan-primary transition-colors">
                  {t('footer.allProducts')}
                </Link>
              </li>
              <li>
                <Link to="/planes" className="text-spartan-gray-300 hover:text-spartan-primary transition-colors">
                  {t('footer.trainingPlans')}
                </Link>
              </li>
              <li>
                <Link to="/guias" className="text-spartan-gray-300 hover:text-spartan-primary transition-colors">
                  {t('footer.beginnerGuides')}
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-spartan-gray-300 hover:text-spartan-primary transition-colors">
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-spartan-gray-300 hover:text-spartan-primary transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contacto y Administración */}
          <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <h3 className="text-xl font-bold mb-4">{t('footer.contactInfo')}</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-spartan-primary mt-1" />
                <span className="text-spartan-gray-300">
                  San José, Costa Rica
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-spartan-primary" />
                <a href="tel:+50688888888" className="text-spartan-gray-300 hover:text-spartan-primary transition-colors">
                  +506 8888-8888
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-spartan-primary" />
                <a href="mailto:info@spartanarmory.com" className="text-spartan-gray-300 hover:text-spartan-primary transition-colors">
                  info@spartanarmory.com
                </a>
              </li>
            </ul>
            
            {/* Admin Links Section - Only visible if user is admin */}
            {isAdmin && (
              <>
                <h3 className="text-xl font-bold mb-4 border-t border-spartan-gray-700 pt-4">{t('footer.adminArea')}</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/admin" className="flex items-center text-spartan-gray-300 hover:text-spartan-primary transition-colors">
                      <Settings className="w-4 h-4 mr-2" />
                      {t('footer.adminDashboard')}
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/productos" className="text-spartan-gray-300 hover:text-spartan-primary transition-colors pl-6">
                      {t('footer.productManagement')}
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/finanzas" className="text-spartan-gray-300 hover:text-spartan-primary transition-colors pl-6">
                      {t('footer.financialReports')}
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/contactos" className="text-spartan-gray-300 hover:text-spartan-primary transition-colors pl-6">
                      {t('footer.contactManagement')}
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
        
        <div className="border-t border-spartan-gray-700 mt-12 pt-8">
          <p className="text-center text-spartan-gray-400 text-sm">
            &copy; {currentYear} SpartanArmory Supplements. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
