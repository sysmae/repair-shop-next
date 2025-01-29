import CustomerSearch from './CustomerSearch'
import { getCustomerSearchResult } from '@/lib/queries/getCustomerSearchResult'
import * as Sentry from '@sentry/nextjs'
import CustomerTable from './CustomerTable'

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

  const span = Sentry.startInactiveSpan({
    name: 'getCustomerSearchResult-2',
  })
  // 데이터 베이스 쿼리

  const results = await getCustomerSearchResult(searchText)
  span.end()

  // 검색 결과 리턴
  return (
    <>
      <CustomerSearch />
      {results.length ? (
        <CustomerTable data={results} />
      ) : (
        <p className="mt-4">검색 결과가 없습니다.</p>
      )}
    </>
  )
}

export default Customers
