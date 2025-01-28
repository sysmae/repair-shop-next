import type { LucideIcon } from 'lucide-react'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Props = {
  icon: LucideIcon
  label: string
  choices: {
    title: string
    href: string
  }[]
}

export function NavButtonMenu({ icon: Icon, label, choices }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} size={'icon'} className="rounded-full">
          <Icon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {choices.map((choices) => (
          <DropdownMenuItem key={choices.title} asChild>
            <Link href={choices.href}>{choices.title}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
