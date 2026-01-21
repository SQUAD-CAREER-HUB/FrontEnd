'use client';

import { useState, ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { ImagePlusIcon } from 'lucide-react';
import { MyProfileImage } from '@/features/my-profile/components/MyProfileImage';

export function ProfileImageUploader() {
  const { register } = useFormContext();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }

    // TODO AWS S3 업로드
  };

  const { onChange, ...rest } = register('profileImage');

  return (
    <div className='flex flex-col items-center space-y-3 shrink-0'>
      <div className='relative group'>
        <div className='w-32 h-32'>
          <MyProfileImage previewUrl={previewUrl} className='w-full h-full' />
        </div>

        {/* 업로드 버튼 (Overlay) */}
        <label className='absolute bottom-0 right-0 p-2.5 bg-brand-500 text-white rounded-full shadow-md cursor-pointer hover:bg-brand-600 transition-all active:scale-90 border-2 border-white dark:border-slate-900'>
          <ImagePlusIcon className='w-4 h-4' />
          <input
            type='file'
            className='hidden'
            accept='image/*'
            {...rest}
            onChange={(e) => {
              onChange(e);
              handleImageChange(e);
            }}
          />
        </label>
      </div>

      <span className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>
        프로필 사진
      </span>
    </div>
  );
}
