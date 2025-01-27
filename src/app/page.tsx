import Link from 'next/link'
export default function Home() {
  return (
    <div className="bg-black bg-home-img bg-cover bg-center">
      <main className="flex flex-col justify-center text-center max-w-5xl mx-auto h-dvh">
        <div className="flex flex-col gap-6 p-12 rounded-xl bg-black/90 w-4/5 sm:max-w-96 mx-auto text-white sm:text-2xl">
          <h1 className="text-4xl font-bold">
            시스매의
            <br />
            컴퓨터 수리점
          </h1>
          <address>
            서울특별시 종로구
            <br /> 창경궁로 185
          </address>
          <p>영업 시간: 09:00 ~ 18:00</p>
          <Link href={'tel:010-1234-5678'} className="hover:underline">
            010-1234-5678
          </Link>
        </div>
      </main>
    </div>
  )
}
