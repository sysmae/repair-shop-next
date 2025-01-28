import { getTicketSearchResults } from './getTicketSearchResults'
import { getOpenTickets } from '@/lib/queries/getOpenTickets'
import TicketSearch from './TicketSearch'

export const metadata = {
  title: '티켓 검색',
}

const Tickets = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) => {
  const { searchText } = await searchParams

  // 검색 텍스트가 없으면 티켓 검색 컴포넌트를 렌더링합니다.
  if (!searchText) {
    const result = await getOpenTickets()
    return (
      <>
        <TicketSearch />
        <p>{JSON.stringify(result)}</p>
      </>
    )
  }

  // 데이터 베이스 쿼리
  const result = await getTicketSearchResults(searchText)

  // 검색 결과 리턴
  return (
    <>
      <TicketSearch />
      <p>{JSON.stringify(result)}</p>
    </>
  )
}

export default Tickets
