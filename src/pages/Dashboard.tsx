
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import FileUpload from '@/components/FileUpload';
import DataPreview from '@/components/DataPreview';
import PlatformSettings from '@/components/PlatformSettings';
import { FileData, PlatformSettings as PlatformSettingsType } from '@/types';

interface DashboardProps {
  onStartProcessing: (fileData: FileData, settings: PlatformSettingsType) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartProcessing }) => {
  const { t } = useLanguage();
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [platformSettings, setPlatformSettings] = useState<PlatformSettingsType>({
    facebook: true,
    instagram: true,
    whatsapp: true,
    telegram: true,
    truecaller: true,
    me: true,
  });

  const handleStartProcessing = () => {
    if (fileData) {
      onStartProcessing(fileData, platformSettings);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <FileUpload onFileUpload={setFileData} />
            
            {fileData && (
              <PlatformSettings
                settings={platformSettings}
                onSettingsChange={setPlatformSettings}
              />
            )}
          </div>
          
          <div className="space-y-6">
            {fileData && <DataPreview fileData={fileData} />}
          </div>
        </div>
        
        {fileData && (
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              onClick={handleStartProcessing}
              className="px-8"
              disabled={!Object.values(platformSettings).some(Boolean)}
            >
              {t('startProcessing')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
