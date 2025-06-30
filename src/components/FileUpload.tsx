
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileSpreadsheet, CheckCircle, XCircle } from 'lucide-react';
import { FileData } from '@/types';

interface FileUploadProps {
  onFileUpload: (fileData: FileData) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const processFile = useCallback((file: File) => {
    // Simulate file processing and validation
    if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setIsValid(false);
      toast({
        title: t('error'),
        description: t('fileError'),
        variant: 'destructive',
      });
      return;
    }

    setIsValid(true);
    
    // Mock data for preview - changed email to ID
    const mockPreviewData = [
      { id: 1, name: 'John Doe', phone: '123-456-7890', ID: '123456789' },
      { id: 2, name: 'Jane Smith', phone: '098-765-4321', ID: '987654321' },
      { id: 3, name: 'Bob Johnson', phone: '555-123-4567', ID: '555123456' },
    ];

    const fileData: FileData = {
      name: file.name,
      size: file.size,
      records: mockPreviewData, // In real app, parse Excel file
      previewData: mockPreviewData.slice(0, 10),
    };

    onFileUpload(fileData);
    
    toast({
      title: t('fileValidation'),
      description: `File "${file.name}" uploaded successfully`,
    });
  }, [onFileUpload, t, toast]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      processFile(file);
    }
  }, [processFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    multiple: false,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-medium mb-2">{t('uploadTitle')}</h3>
        <p className="text-muted-foreground mb-4">{t('uploadDescription')}</p>
        <Button variant="outline">
          <FileSpreadsheet className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
          Browse Files
        </Button>
      </div>

      {uploadedFile && (
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="w-6 h-6 text-primary" />
            <div>
              <p className="font-medium">{uploadedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isValid === true && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{t('fileValidation')}</span>
              </div>
            )}
            {isValid === false && (
              <div className="flex items-center gap-2 text-red-600">
                <XCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{t('fileError')}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
