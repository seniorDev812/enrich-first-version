
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileData } from '@/types';

interface DataPreviewProps {
  fileData: FileData;
}

const DataPreview: React.FC<DataPreviewProps> = ({ fileData }) => {
  const { t } = useLanguage();

  if (!fileData.previewData.length) return null;

  const headers = Object.keys(fileData.previewData[0]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t('dataPreview')}</h3>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                {headers.map((header) => (
                  <th key={header} className="px-4 py-3 text-left font-medium text-sm">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fileData.previewData.map((row, index) => (
                <tr key={index} className="border-t">
                  {headers.map((header) => (
                    <td key={header} className="px-4 py-3 text-sm">
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Showing first {fileData.previewData.length} of {fileData.records.length} records
      </p>
    </div>
  );
};

export default DataPreview;
