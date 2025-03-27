
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './select';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage, availableLanguages, t } = useLanguage();
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value as 'es' | 'en');
  };
  
  const getCurrentLanguageDisplay = () => {
    // Safely check if availableLanguages exists and has elements
    if (!availableLanguages || availableLanguages.length === 0) {
      // Return a sensible default based on the current language
      return language === 'es' ? 'Español' : 'English';
    }
    
    // Find the current language in availableLanguages
    const currentLanguage = availableLanguages.find(lang => lang.code === language);
    
    // If found, return its name; otherwise, return the language code as fallback
    return currentLanguage?.name || (language === 'es' ? 'Español' : 'English');
  };
  
  // Provide a safe fallback for availableLanguages
  const safeAvailableLanguages = availableLanguages || [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' }
  ];
  
  return (
    <div className="flex items-center">
      <Select 
        value={language} 
        onValueChange={handleLanguageChange}
      >
        <SelectTrigger className="w-auto min-w-[100px] pr-1 border-none focus:ring-0">
          <span className="flex items-center">
            <Globe className="mr-2 h-4 w-4" />
            <SelectValue placeholder={getCurrentLanguageDisplay()} />
          </span>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {safeAvailableLanguages.map((lang) => (
              <SelectItem 
                key={lang.code} 
                value={lang.code}
              >
                {lang.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
