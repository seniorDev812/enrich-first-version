
import React, { useState } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Dashboard from '@/pages/Dashboard';
import Processing from '@/pages/Processing';
import Results from '@/pages/Results';
import { FileData, PlatformSettings, SummaryStats } from '@/types';

type AppState = 'dashboard' | 'processing' | 'results';

const Index: React.FC = () => {
  const [currentState, setCurrentState] = useState<AppState>('dashboard');
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>({
    facebook: true,
    instagram: true,
    whatsapp: true,
    telegram: true,
    truecaller: true,
    me: true,
  });

  const handleStartProcessing = (data: FileData, settings: PlatformSettings) => {
    setFileData(data);
    setPlatformSettings(settings);
    setCurrentState('processing');
  };

  const handleProcessingComplete = () => {
    setCurrentState('results');
  };

  const handleCancel = () => {
    setCurrentState('dashboard');
  };

  const handleBackToDashboard = () => {
    setCurrentState('dashboard');
    setFileData(null);
  };

  // Mock summary stats for results
  const mockSummaryStats: SummaryStats = {
    totalProcessed: fileData?.records.length || 0,
    totalEnriched: Math.floor((fileData?.records.length || 0) * 0.85),
    skipped: Math.floor((fileData?.records.length || 0) * 0.15),
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        
        {currentState === 'dashboard' && (
          <Dashboard onStartProcessing={handleStartProcessing} />
        )}
        
        {currentState === 'processing' && fileData && (
          <Processing
            fileData={fileData}
            settings={platformSettings}
            onComplete={handleProcessingComplete}
            onCancel={handleCancel}
          />
        )}
        
        {currentState === 'results' && (
          <Results
            summaryStats={mockSummaryStats}
            onBack={handleBackToDashboard}
          />
        )}
      </div>
    </LanguageProvider>
  );
};

export default Index;
