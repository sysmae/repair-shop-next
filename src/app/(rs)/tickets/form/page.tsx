import { getCustomer } from '@/lib/queries/getCustomer'
import { getTicket } from '@/lib/queries/getTicket'
import { BackButton } from '@/components/BackButton'
import * as Sentry from '@sentry/nextjs'
import TicketForm from '@/app/(rs)/tickets/TicketForm'

export default async function TicketFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  try {
    // 서치 파라미터 에서 customerId, ticketId 추출
    const { customerId, ticketId } = await searchParams

    // customerId, ticketId가 없을 때
    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="text-2xl mb-2">
            Ticket ID or Customer ID required to load ticket form
          </h2>
          <BackButton title="Go Back" variant="default" />
        </>
      )
    }

    // customer ID가 있을 때
    if (customerId) {
      // customer 정보 가져오기
      const customer = await getCustomer(parseInt(customerId))

      // customer가 없을 때 없다는 메시지 출력
      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              고객 ID : #{customerId} 가 없습니다.
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        )
      }

      // customer가 비활성화 상태일 때
      if (!customer.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              고객 ID : #{customerId} 가 비활성화 상태입니다.
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        )
      }

      // customer가 있고, 활성화 상태일 때
      console.log(customer)
      return <TicketForm customer={customer} />
    }

    // ticket ID가 있을 때
    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId))

      // ticket이 없을 때 없다는 메시지 출력
      if (!ticket) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              티켓 ID : #{ticketId} 가 없습니다.
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        )
      }

      // ticket이 있을 때 ticket의 customerId로  customer 정보 가져오기
      const customer = await getCustomer(ticket.customerId)

      // return ticket form
      console.log('ticket: ', ticket)
      console.log('customer: ', customer)
      return <TicketForm customer={customer} ticket={ticket} />
    }
    // 에러 발생 시 Sentry에 로깅
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e)
      throw e
    }
  }
}
