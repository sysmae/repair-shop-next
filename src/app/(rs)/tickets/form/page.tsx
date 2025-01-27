import { getCustomer } from '@/lib/queries/getCustomer'
import { getTicket } from '@/lib/queries/getTicket'
import { BackButton } from '@/components/BackButton'
import * as Sentry from '@sentry/nextjs'

export default async function TicketFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  try {
    const { customerId, ticketId } = await searchParams

    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="text-2xl mb-2">티켓 ID 또는 고객 ID가 필요합니다.</h2>
          <BackButton title="돌아가기" variant="default" />
        </>
      )
    }

    // New ticket form
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId))

      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              고객 ID #{customerId}를 찾을 수 없습니다.
            </h2>
            <BackButton title="돌아가기" variant="default" />
          </>
        )
      }

      if (!customer.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              고객 ID #{customerId}는 활성 상태가 아닙니다.
            </h2>
            <BackButton title="돌아가기" variant="default" />
          </>
        )
      }

      // return ticket form
      console.log(customer)
    }

    // Edit ticket form
    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId))

      if (!ticket) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              티켓 ID #{ticketId}를 찾을 수 없습니다.
            </h2>
            <BackButton title="돌아가기" variant="default" />
          </>
        )
      }

      const customer = await getCustomer(ticket.customerId)

      // return ticket form
      console.log('ticket: ', ticket)
      console.log('customer: ', customer)
    }
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e)
      throw e
    }
  }
}
