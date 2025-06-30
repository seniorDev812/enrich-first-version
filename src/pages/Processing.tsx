
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProcessingStatus, FileData, PlatformSettings } from '@/types';

interface ProcessingProps {
  fileData: FileData;
  settings: PlatformSettings;
  onComplete: () => void;
  onCancel: () => void;
}

const Processing: React.FC<ProcessingProps> = ({ fileData, settings, onComplete, onCancel }) => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<ProcessingStatus>({
    isProcessing: true,
    progress: 0,
    processed: 0,
    total: fileData.records.length,
    currentTask: 'Initializing...',
    logs: ['Starting data enrichment process...'],
  });

  useEffect(() => {
    // Simulate processing
    const interval = setInterval(() => {
      setStatus(prev => {
        if (prev.progress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return prev;
        }

        const newProgress = Math.min(prev.progress + Math.random() * 5, 100);
        const newProcessed = Math.floor((newProgress / 100) * prev.total);
        
        const tasks = [
          'Connecting to Facebook API...',
          'Fetching Instagram data...',
          'Querying WhatsApp database...',
          'Searching Telegram channels...',
          'Validating with Truecaller...',
          'Processing phone numbers...',
          'Enriching contact data...',
          'Finalizing results...',
        ];
        
        const newLog = tasks[Math.floor(Math.random() * tasks.length)];
        
        return {
          ...prev,
          progress: newProgress,
          processed: newProcessed,
          currentTask: newLog,
          logs: [...prev.logs.slice(-5), newLog],
        };
      });
    }, 800);

    return () => clearInterval(interval);
  }, [fileData.records.length, onComplete]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">{t('processingTitle')}</h1>
          <p className="text-muted-foreground">
            Processing {fileData.name} with {Object.values(settings).filter(Boolean).length} platforms
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{t('progressLabel')}</span>
              <span>{Math.round(status.progress)}%</span>
            </div>
            <Progress value={status.progress} className="h-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">{t('recordsProcessed')}</h3>
              <p className="text-2xl font-bold">
                {status.processed.toLocaleString()} / {status.total.toLocaleString()}
              </p>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">{t('currentTask')}</h3>
              <p className="text-sm">{status.currentTask}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">{t('logs')}</h3>
            <div className="bg-muted rounded-lg p-4 h-40 overflow-y-auto">
              {status.logs.map((log, index) => (
                <p key={index} className="text-sm mb-1 text-muted-foreground">
                  {new Date().toLocaleTimeString()}: {log}
                </p>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" onClick={onCancel}>
              {t('cancel')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Processing;
