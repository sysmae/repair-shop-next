'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { InputHTMLAttributes } from 'react'

// 스키마 검증을 위한 타입 정의
type Props<S> = {
  fieldTitle: string
  nameInSchema: keyof S & string
  className?: string
} & InputHTMLAttributes<HTMLInputElement>

export function InputWithLabel<S>({
  fieldTitle,
  nameInSchema,
  className,
  ...props
}: Props<S>) {
  const form = useFormContext()

  // useFormContext는 폼 컨텍스트에 접근할 수 있게 해주는 커스텀 훅입니다.
  // 이 훅은 깊이 중첩된 구조에서 컨텍스트를 prop으로 전달하는 것이 불편할 때 사용됩니다.
  // FormProvider와 함께 사용해야 합니다.

  // @returns - 모든 useForm 메서드를 반환합니다.

  // @example
  // function App() {
  //   const methods = useForm();
  //   const onSubmit = data => console.log(data);

  //   return (
  //     <FormProvider {...methods} >
  //       <form onSubmit={methods.handleSubmit(onSubmit)}>
  //         <NestedInput />
  //         <input type="submit" />
  //       </form>
  //     </FormProvider>
  //   );
  // }

  // function NestedInput() {
  //   const { register } = useFormContext(); // 모든 훅 메서드를 가져옵니다.
  //   return <input {...register("test")} />;
  // }

  return (
    <FormField
      // 컨트롤은 위에서 만든 useFormContext()으로 받고
      control={form.control}
      // 이름 관련된 건 전부 nameInSchema로 받음
      name={nameInSchema}
      // render 로 해당 컴포넌트 전체 렌더링
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base" htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>

          <FormControl>
            <Input
              id={nameInSchema}
              className={`w-full max-w-xs disabled:text-blue-500 dark:disabled:text-green-500 disabled:opacity-75 ${className}`}
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
