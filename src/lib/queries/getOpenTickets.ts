import { db } from '@/db'
import { tickets, customers } from '@/db/schema'
import { eq } from 'drizzle-orm'

// 열려있는 티켓을 가져오는 쿼리
export async function getOpenTickets() {
  const result = await db
    .select({
      ticketDate: tickets.createdAt,
      title: tickets.title,
      firstName: customers.firstName,
      lastName: customers.lastName,
      email: customers.email,
      tech: tickets.tech,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(eq(tickets.completed, false))

  return result
}
