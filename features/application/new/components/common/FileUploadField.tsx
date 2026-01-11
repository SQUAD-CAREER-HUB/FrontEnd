import FileUploadButton from '@/shared/components/FileUploadButton'

interface FileUploadFieldProps {
  label?: string
  description?: string
}

export default function FileUploadField({
  label = '첨부파일 (선택)',
  description = '이력서나 포트폴리오를 미리 업로드해두세요.',
}: FileUploadFieldProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5 ml-1">
        <label className="block text-sm font-bold text-slate-900 dark:text-white">
          {label}
        </label>
        <FileUploadButton />
      </div>
      <div className="w-full p-4 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-center">
        <p className="text-sm text-slate-400">
          {description}
        </p>
      </div>
    </div>
  )
}
