
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Toggle } from './toggle';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  
  return (
    <Toggle 
      pressed={theme === 'dark'} 
      onPressedChange={toggleTheme}
      aria-label={t('theme.toggle')}
      className="hover:bg-muted hover:text-foreground transition-colors duration-200"
      title={theme === 'dark' ? t('theme.dark') : t('theme.light')}
    >
      {theme === 'dark' ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-400" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Toggle>
  );
};

export default ThemeSwitcher;
