
export interface FileData {
  name: string;
  size: number;
  records: any[];
  previewData: any[];
}

export interface ProcessingStatus {
  isProcessing: boolean;
  progress: number;
  processed: number;
  total: number;
  currentTask: string;
  logs: string[];
}

export interface PlatformSettings {
  facebook: boolean;
  instagram: boolean;
  whatsapp: boolean;
  telegram: boolean;
  truecaller: boolean;
  me: boolean;
}

export interface SummaryStats {
  totalProcessed: number;
  totalEnriched: number;
  skipped: number;
}

export type Language = 'en' | 'he';
