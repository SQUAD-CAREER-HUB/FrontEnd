'use client';

import { ToggleSwitch } from '@/shared/components/ui/toggle-switch';

interface SettingItemProps {
  label: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export function SettingItem({ label, enabled, onChange }: SettingItemProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-slate-600 dark:text-slate-400">{label}</span>
      <ToggleSwitch enabled={enabled} onChange={onChange} />
    </div>
  );
}
