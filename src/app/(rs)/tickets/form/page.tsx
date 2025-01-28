import { getCustomer } from '@/lib/queries/getCustomer'
import { getTicket } from '@/lib/queries/getTicket'
import { BackButton } from '@/components/BackButton'
import * as Sentry from '@sentry/nextjs'
import TicketForm from '@/app/(rs)/tickets/TicketForm'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Users, init as kindeInit } from '@kinde/management-api-js'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const { customerId, ticketId } = await searchParams

  return {
    title: customerId
      ? `New Ticket for Customer #${customerId}`
      : ticketId
      ? `Edit Ticket #${ticketId}`
      : 'Missing Customer or Ticket ID',
  }
}

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

    const { getPermission, getUser } = getKindeServerSession()
    const [managerPermission, user] = await Promise.all([
      getPermission('manager'),
      getUser(),
    ])

    const isManager = managerPermission?.isGranted

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
      if (isManager) {
        kindeInit() // kinde management api 초기화
        const { users } = await Users.getUsers()
        const techs = users
          ? users.map((user) => ({ id: user.email!, description: user.email! }))
          : []
        return <TicketForm customer={customer} techs={techs} />
      } else {
        return <TicketForm customer={customer} />
      }
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
      if (isManager) {
        kindeInit() // kinde management api 초기화
        const { users } = await Users.getUsers()
        const techs = users
          ? users.map((user) => ({
              id: user.email!,
              description: user.email!,
            }))
          : []
        return <TicketForm customer={customer} ticket={ticket} techs={techs} />
      } else {
        const isEditable = user?.email?.toLowerCase() === ticket.tech // ticket의 tech와 현재 로그인한 유저의 이메일이 같을 때 수정 가능
        console.log('user email:', user?.email)
        console.log('ticket tech:', ticket.tech)
        return (
          <TicketForm
            customer={customer}
            ticket={ticket}
            isEditable={isEditable}
          />
        )
      }
    }
    // 에러 발생 시 Sentry에 로깅
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e)
      throw e
    }
  }
}
