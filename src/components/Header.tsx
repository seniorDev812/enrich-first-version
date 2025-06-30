
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from "next-themes";
import { User, LogOut, Sun, Moon } from 'lucide-react';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'he' : 'en');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">{t('appTitle')}</h1>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="text-primary-foreground hover:bg-primary/80"
          >
            {language === 'en' ? '🇮🇱 עברית' : '🇺🇸 English'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="text-primary-foreground hover:bg-primary/80"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary/80"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t('logout')}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
