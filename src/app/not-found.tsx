import Image from 'next/image'

export const metadata = {
  title: '페이지 찾을 수 없음',
}

export default function NotFound() {
  return (
    <div className="px-2 w-full ">
      <div className="mx-auto py-4 flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl">페이지를 찾을 수 없습니다.</h2>
        <Image
          src="/images/not-found-1024x1024.png"
          alt="페이지를 찾을 수 없음"
          title="페이지를 찾을 수 없음"
          width={300}
          height={300}
          sizes="300px"
          priority={true}
          className="mt-4"
        />
      </div>
    </div>
  )
}
