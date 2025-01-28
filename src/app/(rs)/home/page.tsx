import { redirect } from 'next/navigation'

export const metadata = {
  title: '홈',
}

const Home = () => {
  // 티켓 페이지로 리다이렉트
  redirect('/tickets')

  return null
}

export default Home
