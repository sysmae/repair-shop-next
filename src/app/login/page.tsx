import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { Button } from '@/components/ui/button'
export default function LoginPage() {
  return (
    <main className="h-dvh flex flex-col items-center gap-6 text-4xl p-4">
      <h1>컴퓨터 수리점</h1>
      <Button asChild>
        <LoginLink>로그인</LoginLink>
      </Button>
    </main>
  )
}
