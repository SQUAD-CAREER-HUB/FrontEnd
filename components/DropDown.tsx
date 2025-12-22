"use client"

import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export function DropDown() {
  const [position, setPosition] = React.useState("bottom")

  return (
    <Select>
      <SelectTrigger className='w-full flex items-center justify-between px-3 py-1.5 
bg-white dark:bg-slate-900 
border border-slate-200 dark:border-slate-700 
rounded-xl text-left transition-all 
hover:border-slate-300 dark:hover:border-slate-600 
cursor-pointer 
text-slate-700 dark:text-slate-200 
text-sm font-bold
      data-[state=open]:border-brand-600
      data-[state=open]:text-brand-600
      data-[state=open]:ring-2 
      data-[state=open]:ring-brand-100
      '>지원 종료</SelectTrigger>
      <SelectContent side="bottom" sideOffset={1} position="popper">
        <SelectItem value="서류 전형" className="px-3 py-2 rounded-lg cursor-pointer flex items-center justify-between text-sm transition-colors text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700">
          서류 전형
        </SelectItem>
        <SelectItem value="면접 전형" className="px-3 py-2 rounded-lg cursor-pointer flex items-center justify-between text-sm transition-colors text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700">
          면접 전형
        </SelectItem>
        <SelectItem value="기타 전형" className="px-3 py-2 rounded-lg cursor-pointer flex items-center justify-between text-sm transition-colors text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700">
          기타 전형
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
