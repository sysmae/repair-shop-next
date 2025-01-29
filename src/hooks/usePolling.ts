import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// 10 minutes
export function usePolling(
  ms: number = 100 * 10 * 60,
  searchParam: string | null
) {
  const router = useRouter()

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('interval running')
      if (!searchParam) {
        console.log('refreshing data')
        router.refresh()
      }
    }, ms)
    return () => clearInterval(intervalId)
  }, [ms, searchParam]) // eslint-disable-line react-hooks/exhaustive-deps
}
