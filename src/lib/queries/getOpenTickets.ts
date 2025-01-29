import { db } from '@/db'
import { tickets, customers } from '@/db/schema'
import { eq, asc } from 'drizzle-orm'

// 열려있는 티켓을 가져오는 쿼리
export async function getOpenTickets() {
  const result = await db
    .select({
      id: tickets.id,
      ticketDate: tickets.createdAt,
      title: tickets.title,
      firstName: customers.firstName,
      lastName: customers.lastName,
      email: customers.email,
      tech: tickets.tech,
      completed: tickets.completed,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(eq(tickets.completed, false))
    .orderBy(asc(tickets.createdAt))

  return result
}
