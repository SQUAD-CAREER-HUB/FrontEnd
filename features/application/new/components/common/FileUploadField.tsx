'use client'

import { ChangeEvent, useCallback, useState } from 'react'
import FileUploadButton from '@/shared/components/FileUploadButton'
import { FileList, FileItem } from '@/shared/components/FileList'

interface FileUploadFieldProps {
  label?: string
  description?: string
  onFilesChange?: (files: File[]) => void
}

export default function FileUploadField({
  label = '첨부파일 (선택)',
  description = '이력서나 포트폴리오를 미리 업로드해두세요.',
  onFilesChange,
}: FileUploadFieldProps) {
  const [files, setFiles] = useState<File[]>([])

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (!selectedFiles || selectedFiles.length === 0) return

    const newFiles = Array.from(selectedFiles)
    setFiles((prev) => {
      const updated = [...prev, ...newFiles]
      onFilesChange?.(updated)
      return updated
    })

    // input 초기화 (같은 파일 다시 선택 가능하도록)
    e.target.value = ''
  }, [onFilesChange])

  const handleRemove = useCallback((index: number) => {
    setFiles((prev) => {
      const updated = prev.filter((_, i) => i !== index)
      onFilesChange?.(updated)
      return updated
    })
  }, [onFilesChange])

  const fileItems: FileItem[] = files.map((file) => ({
    name: file.name,
    size: file.size,
  }))

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5 ml-1">
        <label className="block text-sm font-bold text-slate-900 dark:text-white">
          {label}
        </label>
        <FileUploadButton onChange={handleFileChange} multiple />
      </div>
      {files.length === 0 ? (
        <div className="w-full p-4 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-center">
          <p className="text-sm text-slate-400">
            {description}
          </p>
        </div>
      ) : (
        <FileList files={fileItems} onRemove={handleRemove} />
      )}
    </div>
  )
}
