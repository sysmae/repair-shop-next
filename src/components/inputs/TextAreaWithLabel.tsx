'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Textarea } from '../ui/textarea'
import { TextareaHTMLAttributes } from 'react'

// 스키마 검증을 위한 타입 정의
type Props<S> = {
  fieldTitle: string
  nameInSchema: keyof S & string
  className?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export function TextAreaWithLabel<S>({
  fieldTitle,
  nameInSchema,
  className,
  ...props
}: Props<S>) {
  const form = useFormContext()

  return (
    <FormField
      // 컨트롤은 위에서 만든 useFormContext()으로 받고
      control={form.control}
      name={nameInSchema}
      // render 로 해당 컴포넌트 전체 렌더링
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base mb-2" htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>

          <FormControl>
            <Textarea
              id={nameInSchema}
              className={`disabled:text-blue-500 dark:disabled:text-yellow-300 disabled:opacity-75 ${className}`}
              {...props}
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
