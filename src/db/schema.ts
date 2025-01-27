import {
  serial,
  varchar,
  boolean,
  timestamp,
  integer,
  text,
  pgTable,
} from 'drizzle-orm/pg-core'
import { desc, relations } from 'drizzle-orm'

export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name').notNull(),
  lastName: varchar('last_name').notNull(),
  email: varchar('email').unique().notNull(),
  phone: varchar('phone').unique().notNull(),
  address1: varchar('address1').notNull(),
  address2: varchar('address2'),
  city: varchar('city').notNull(),
  state: varchar('state', { length: 2 }).notNull(),
  zip: varchar('zip', { length: 10 }).notNull(),
  notes: text('notes'),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const tickets = pgTable('tickets', {
  id: serial('id').primaryKey(),
  customerId: integer('customer_id')
    .notNull()
    .references(() => customers.id),
  title: varchar('title').notNull(),
  description: text('description'),
  completed: boolean('completed').notNull().default(false),
  tech: varchar('tech').notNull().default('unassigned'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

// 관계 설정

// 고객은 여러 티켓을 가질 수 있습니다.
// customers 테이블과 tickets 테이블 간의 관계를 설정합니다.
// customers 테이블의 각 고객은 여러 개의 tickets를 가질 수 있습니다.
export const customersRelations = relations(customers, ({ many }) => ({
  tickets: many(tickets), // customers 테이블의 각 고객이 여러 개의 tickets를 가질 수 있도록 설정합니다.
}))

// 티켓은 하나의 고객에 속합니다.
// tickets 테이블과 customers 테이블 간의 관계를 설정합니다.
// tickets 테이블의 각 티켓은 하나의 고객에 속합니다.
export const ticketsRelations = relations(tickets, ({ one }) => ({
  customer: one(customers, {
    // tickets 테이블의 각 티켓이 하나의 고객에 속하도록 설정합니다.
    fields: [tickets.customerId], // tickets 테이블의 customerId 필드를 사용하여 관계를 설정합니다.
    references: [customers.id], // customers 테이블의 id 필드를 참조합니다.
  }),
}))
