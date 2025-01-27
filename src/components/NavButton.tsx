import { LucideIcon } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'

type Props = {
  icon: LucideIcon
  label: string
  href?: string
}

const NavButton = ({ icon: Icon, label, href }: Props) => {
  return (
    <Button
      variant={'ghost'}
      size={'icon'}
      aria-label={label}
      title={label}
      className="rounded-full"
      asChild
    >
      {/* 링크 있으면 링크 포함해서 아이콘, 없으면 아이콘만 */}
      {href ? (
        <Link href={href}>
          <Icon />
        </Link>
      ) : (
        <Icon />
      )}
    </Button>
  )
}

export default NavButton
