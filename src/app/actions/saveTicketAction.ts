'use server'

import { eq } from 'drizzle-orm'
import { flattenValidationErrors } from 'next-safe-action'
import { redirect } from 'next/navigation'

import { db } from '@/db'
import { tickets } from '@/db/schema'
import { actionClient } from '@/lib/safe-action'
import {
  insertTicketSchema,
  type insertTicketSchemaType,
} from '@/zod-schemas/ticket'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export const saveTicketAction = actionClient
  .metadata({
    actionName: 'saveTicketAction',
  })
  .schema(insertTicketSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput: ticket,
    }: {
      parsedInput: insertTicketSchemaType
    }) => {
      const { isAuthenticated } = getKindeServerSession()
      const isAuth = await isAuthenticated()
      if (!isAuth) {
        return redirect('/login')
      }

      // 새로운 티켓 추가
      if (ticket.id === '(New)') {
        const result = await db
          .insert(tickets)
          .values({
            customerId: ticket.customerId,
            title: ticket.title,
            description: ticket.description,
            tech: ticket.tech,
          })
          .returning({ insertedId: tickets.id })
        return {
          message: `티켓 ID ${result[0].insertedId} 가 성공적으로 생성되었습니다.`,
        }
      }

      // 기존 티켓 업데이트
      const result = await db
        .update(tickets)
        .set({
          customerId: ticket.customerId,
          title: ticket.title,
          description: ticket.description,
          completed: ticket.completed,
          tech: ticket.tech,
        })
        .where(eq(tickets.id, ticket.id!))
        .returning({ updatedId: tickets.id })
      return {
        message: `티켓 ID ${result[0].updatedId} 가 성공적으로 업데이트되었습니다.`,
      }
    }
  )
