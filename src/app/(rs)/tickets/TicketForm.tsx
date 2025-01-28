'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'

import { InputWithLabel } from '@/components/inputs/InputWithLabel'
import { TextAreaWithLabel } from '@/components/inputs/TextAreaWithLabel'
import { SelectWithLabel } from '@/components/inputs/SelectWithLabel'
import { CheckboxWithLabel } from '@/components/inputs/CheckboxWithLabel'

import {
  insertTicketSchema,
  type insertTicketSchemaType,
  type selectTicketSchemaType,
} from '@/zod-schemas/ticket'
import { selectCustomerSchemaType } from '@/zod-schemas/customer'

import { useAction } from 'next-safe-action/hooks'
import { saveTicketAction } from '../../actions/saveTicketAction'
import { useToast } from '@/hooks/use-toast'
import { LoaderCircle } from 'lucide-react'
import { DisplayServerActionResponse } from '@/components/DisplayServerActionResponse'

type Props = {
  customer: selectCustomerSchemaType
  ticket?: selectTicketSchemaType
  techs?: { id: string; description: string }[]
  isEditable?: boolean
}

export default function TicketForm({
  customer,
  ticket,
  techs,
  isEditable = true,
}: Props) {
  const isManager = Array.isArray(techs) // techs가 있으면 manager

  const { toast } = useToast()

  const {
    execute: executeSave,
    result: saveResult,
    isExecuting: isSaving,
    reset: resetSaveAction,
  } = useAction(saveTicketAction, {
    onSuccess({ data }) {
      toast({
        variant: 'default',
        title: 'Success! 🎉',
        description: data?.message,
      })
    },
    onError({ error }) {
      toast({
        variant: 'destructive',
        title: 'Error! 😢',
        description: "Sorry, we couldn't save the ticket.",
      })
    },
  })

  const defaultValues: insertTicketSchemaType = {
    id: ticket?.id ?? '(New)',
    customerId: ticket?.customerId ?? customer.id,
    title: ticket?.title ?? '',
    description: ticket?.description ?? '',
    completed: ticket?.completed ?? false,
    tech: ticket?.tech ?? 'new-ticket@example.com',
  }

  const form = useForm<insertTicketSchemaType>({
    mode: 'onBlur', // 입력 필드가 포커스를 잃을 때 유효성 검사를 수행합니다.
    resolver: zodResolver(insertTicketSchema), // Zod 스키마를 사용하여 폼 데이터를 검증합니다.
    defaultValues, // 폼의 초기값을 설정합니다.
  })

  async function submitForm(data: insertTicketSchemaType) {
    executeSave(data)
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResponse result={saveResult} />
      <div>
        <h2 className="text-2xl font-bold">
          {ticket?.id && isEditable
            ? `Edit Ticket # ${ticket.id}`
            : ticket?.id
            ? `View Ticket # ${ticket.id}`
            : 'New Ticket Form'}
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col md:flex-row gap-4 md:gap-8"
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertTicketSchemaType>
              fieldTitle="Title"
              nameInSchema="title"
              disabled={!isEditable}
            />

            {isManager ? (
              <SelectWithLabel<insertTicketSchemaType>
                fieldTitle="Tech"
                nameInSchema="tech"
                data={[
                  {
                    id: 'new-ticket@example.com',
                    description: 'new-ticket@example.com',
                  },
                  ...techs,
                ]}
              />
            ) : (
              <InputWithLabel<insertTicketSchemaType>
                fieldTitle="Tech"
                nameInSchema="tech"
                disabled={true}
              />
            )}

            {ticket?.id ? (
              <CheckboxWithLabel<insertTicketSchemaType>
                fieldTitle="Completed"
                nameInSchema="completed"
                message="Yes"
                disabled={!isEditable}
              />
            ) : null}

            <div className="mt-4 space-y-2">
              <h3 className="text-lg">Customer Info</h3>
              <hr className="w-4/5" />
              <p>
                {customer.firstName} {customer.lastName}
              </p>
              <p>{customer.address1}</p>
              {customer.address2 ? <p>{customer.address2}</p> : null}
              <p>
                {customer.city}, {customer.state} {customer.zip}
              </p>
              <hr className="w-4/5" />
              <p>{customer.email}</p>
              <p>Phone: {customer.phone}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-xs">
            <TextAreaWithLabel<insertTicketSchemaType>
              fieldTitle="Description"
              nameInSchema="description"
              className="h-96"
              disabled={!isEditable}
            />

            {isEditable ? (
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="w-3/4"
                  variant="default"
                  title="Save"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <LoaderCircle className="animate-spin" />
                    </>
                  ) : (
                    'Save'
                  )}
                </Button>

                <Button
                  type="button"
                  variant="destructive"
                  title="Reset"
                  onClick={() => {
                    form.reset(defaultValues)
                    resetSaveAction()
                  }}
                >
                  Reset
                </Button>
              </div>
            ) : null}
          </div>
        </form>
      </Form>
    </div>
  )
}
