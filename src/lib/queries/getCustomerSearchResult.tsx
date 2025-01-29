import { db } from '@/db'
import { customers } from '@/db/schema'
import { ilike, or, sql } from 'drizzle-orm'

export async function getCustomerSearchResult(searchText: string) {
  const result = await db
    .select()
    .from(customers)
    .where(
      // 검색 텍스트를 사용하여 여러 필드를 검색합니다. ilike는 대소문자를 구분하지 않습니다.
      or(
        ilike(customers.firstName, `%${searchText}%`),
        ilike(customers.lastName, `%${searchText}%`),
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        ilike(customers.city, `%${searchText}%`),
        ilike(customers.zip, `%${searchText}%`),
        sql`lower(concat(${customers.firstName}, ' ', ${
          customers.lastName
        })) LIKE ${`%${searchText.toLowerCase().replace(' ', '%')}%`}` // 이름과 성을 결합하여 검색합니다.
      )
    )
  return result
}
