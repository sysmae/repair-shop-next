import CustomerSearch from './CustomerSearch'
import { getCustomerSearchResult } from '@/lib/queries/getCustomerSearchResult'

export const metadata = {
  title: '고객 검색',
}

const Customers = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) => {
  const { searchText } = await searchParams

  // 검색 텍스트가 없으면 고객 검색 컴포넌트를 렌더링합니다.
  if (!searchText) {
    return <CustomerSearch />
  }

  // 데이터 베이스 쿼리
  const result = await getCustomerSearchResult(searchText)

  // 검색 결과 리턴
  return (
    <>
      <CustomerSearch />
      <p>{JSON.stringify(result)}</p>
    </>
  )
}

export default Customers
