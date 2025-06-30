
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Download, CheckCircle } from 'lucide-react';
import { SummaryStats } from '@/types';

interface ResultsProps {
  summaryStats: SummaryStats;
  onBack: () => void;
}

const Results: React.FC<ResultsProps> = ({ summaryStats, onBack }) => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleDownload = () => {
    // Simulate file download
    toast({
      title: "Download Started",
      description: "Your enriched data file is being prepared for download.",
    });
    
    // In a real implementation, this would trigger an actual file download
    console.log('Downloading enriched data file...');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('resultsTitle')}</h1>
          <p className="text-muted-foreground">
            Your data has been successfully enriched and is ready for download.
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
              <h3 className="font-medium text-blue-900 mb-2">{t('totalProcessed')}</h3>
              <p className="text-3xl font-bold text-blue-600">
                {summaryStats.totalProcessed.toLocaleString()}
              </p>
            </div>
            
            <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
              <h3 className="font-medium text-green-900 mb-2">{t('totalEnriched')}</h3>
              <p className="text-3xl font-bold text-green-600">
                {summaryStats.totalEnriched.toLocaleString()}
              </p>
            </div>
            
            <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
              <h3 className="font-medium text-yellow-900 mb-2">{t('skipped')}</h3>
              <p className="text-3xl font-bold text-yellow-600">
                {summaryStats.skipped.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="text-center space-y-4">
            <Button size="lg" onClick={handleDownload} className="px-8">
              <Download className="w-5 h-5 mr-2" />
              {t('downloadResults')}
            </Button>
            
            <div>
              <Button variant="outline" onClick={onBack}>
                {t('back')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
