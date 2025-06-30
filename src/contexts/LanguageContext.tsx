
import React, { createContext, useContext, useState } from 'react';
import { Language } from '@/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    appTitle: "Data Enrichment Platform",
    logout: "Logout",
    
    // Dashboard
    uploadTitle: "Upload Excel File",
    uploadDescription: "Drag & drop your Excel file here or click to browse",
    fileValidation: "File is valid",
    fileError: "Invalid file format",
    dataPreview: "Data Preview",
    platformSettings: "Platform Settings",
    facebook: "Facebook",
    instagram: "Instagram",
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    truecaller: "Truecaller",
    me: "ME App",
    startProcessing: "Start Processing",
    
    // Processing
    processingTitle: "Processing Data",
    progressLabel: "Progress",
    recordsProcessed: "Records Processed",
    currentTask: "Current Task",
    logs: "Processing Logs",
    
    // Results
    resultsTitle: "Processing Complete",
    downloadResults: "Download Results",
    summaryStats: "Summary Statistics",
    totalProcessed: "Total Processed",
    totalEnriched: "Total Enriched",
    skipped: "Skipped/Missing",
    
    // Common
    cancel: "Cancel",
    back: "Back",
    next: "Next",
    loading: "Loading...",
    error: "Error occurred",
  },
  he: {
    // Header
    appTitle: "פלטפורמת העשרת נתונים",
    logout: "התנתקות",
    
    // Dashboard
    uploadTitle: "העלאת קובץ אקסל",
    uploadDescription: "גרור ושחרר את קובץ האקסל כאן או לחץ לעיון",
    fileValidation: "הקובץ תקין",
    fileError: "פורמט קובץ לא תקין",
    dataPreview: "תצוגה מקדימה של הנתונים",
    platformSettings: "הגדרות פלטפורמות",
    facebook: "פייסבוק",
    instagram: "אינסטגרם",
    whatsapp: "וואטסאפ",
    telegram: "טלגרם",
    truecaller: "טרוקולר",
    me: "אפליקציית ME",
    startProcessing: "התחל עיבוד",
    
    // Processing
    processingTitle: "מעבד נתונים",
    progressLabel: "התקדמות",
    recordsProcessed: "רשומות שעובדו",
    currentTask: "משימה נוכחית",
    logs: "יומן עיבוד",
    
    // Results
    resultsTitle: "העיבוד הושלם",
    downloadResults: "הורד תוצאות",
    summaryStats: "סטטיסטיקות סיכום",
    totalProcessed: "סה\"כ עובד",
    totalEnriched: "סה\"כ הועשר",
    skipped: "דולג/חסר",
    
    // Common
    cancel: "ביטול",
    back: "חזור",
    next: "הבא",
    loading: "טוען...",
    error: "אירעה שגיאה",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div 
        className={language === 'he' ? 'rtl font-hebrew' : 'ltr'} 
        dir={language === 'he' ? 'rtl' : 'ltr'}
        style={{ fontFamily: language === 'he' ? '"Noto Sans Hebrew", "Arial Hebrew", Arial, sans-serif' : 'inherit' }}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
