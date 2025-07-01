
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';
import { PlatformSettings as PlatformSettingsType } from '@/types';

interface PlatformSettingsProps {
  settings: PlatformSettingsType;
  onSettingsChange: (settings: PlatformSettingsType) => void;
}

const PlatformSettings: React.FC<PlatformSettingsProps> = ({ settings, onSettingsChange }) => {
  const { t } = useLanguage();

  const handleChange = (platform: keyof PlatformSettingsType, checked: boolean) => {
    onSettingsChange({
      ...settings,
      [platform]: checked,
    });
  };

  const platforms = [
    { key: 'facebook' as const, label: t('facebook'), icon: '/icon/facebook.png' },
    { key: 'instagram' as const, label: t('instagram'), icon: '/icon/instagram.png' },
    { key: 'whatsapp' as const, label: t('whatsapp'), icon: '/icon/whatsapp.png' },
    { key: 'telegram' as const, label: t('telegram'), icon: '/icon/telegram.png' },
    { key: 'truecaller' as const, label: t('truecaller'), icon: '/icon/truecaller.png' },
    { key: 'me' as const, label: t('me'), icon: '/icon/me app.png' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t('platformSettings')}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms.map((platform) => (
          <div key={platform.key} className="flex items-center space-x-3 p-3 border rounded-lg rtl:space-x-reverse">
            <Checkbox
              id={platform.key}
              checked={settings[platform.key]}
              onCheckedChange={(checked) => handleChange(platform.key, checked as boolean)}
            />
            <label
              htmlFor={platform.key}
              className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              <img 
                src={platform.icon} 
                alt={platform.label}
                className="w-6 h-6 object-contain"
              />
              {platform.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformSettings;
