import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { tickets } from '@/db/schema'
import { z } from 'zod'

// createInsertSchema를 사용하여 tickets 테이블에 삽입할 데이터를 검증하는 스키마를 생성합니다.
export const insertTicketSchema = createInsertSchema(tickets, {
  id: z.union([z.number(), z.literal('(New)')]), // id는 숫자이거나 '(New)' 문자열일 수 있습니다.
  title: (schema) => schema.min(1, 'Title is required'), // title은 최소 1자 이상이어야 합니다.
  description: (schema) => schema.min(1, 'Description is required'), // description은 최소 1자 이상이어야 합니다.
  tech: (schema) => schema.email('Invalid email address'), // tech는 유효한 이메일 주소여야 합니다.
})

// createSelectSchema는 데이터베이스 쿼리에서 선택된 필드를 검증하는 스키마를 생성합니다.
export const selectTicketSchema = createSelectSchema(tickets)

// insertTicketSchemaType은 insertTicketSchema의 타입을 나타냅니다.
export type insertTicketSchemaType = typeof insertTicketSchema._type

// selectTicketSchemaType은 selectTicketSchema의 타입을 나타냅니다.
export type selectTicketSchemaType = typeof selectTicketSchema._type
