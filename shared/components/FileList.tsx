'use client'

import { Paperclip, X } from 'lucide-react'
import { Button } from './ui/button'

export interface FileItem {
  name: string
  size: number
}

interface FileListItemProps {
  file: FileItem
  onRemove?: () => void
  className?: string
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
}

export function FileListItem({ file, onRemove, className = '' }: FileListItemProps) {
  return (
    <div
      className={`flex items-center justify-between p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl group transition-all hover:bg-slate-50 dark:hover:bg-slate-800 ${className}`}
    >
      <div className="flex items-center space-x-3 overflow-hidden">
        <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 flex items-center justify-center shadow-sm">
          <Paperclip className="w-4 h-4 text-slate-400" />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">
            {file.name}
          </div>
          <div className="text-[9px] text-slate-400">{formatFileSize(file.size)}</div>
        </div>
      </div>
      {onRemove && (
        <Button
          size="xs"
          variant="ghost"
          className="cursor-pointer p-1 text-slate-400 hover:text-red-500 rounded-lg"
          onClick={onRemove}
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
}

interface FileListProps {
  files: FileItem[]
  onRemove?: (index: number) => void
  className?: string
  itemClassName?: string
}

export function FileList({ files, onRemove, className = '', itemClassName = '' }: FileListProps) {
  if (files.length === 0) return null

  return (
    <div className={`space-y-2 ${className}`}>
      {files.map((file, index) => (
        <FileListItem
          key={`${file.name}-${index}`}
          file={file}
          onRemove={onRemove ? () => onRemove(index) : undefined}
          className={itemClassName}
        />
      ))}
    </div>
  )
}

export default FileList
