import { getCustomer } from '@/lib/queries/getCustomer'
import { BackButton } from '@/components/BackButton'
import * as Sentry from '@sentry/nextjs'

export default async function CustomerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  try {
    const { customerId } = await searchParams

    // Edit customer form
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
      console.log(customer)
      // put customer form component
    } else {
      // new customer form component
    }
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e)
      throw e
    }
  }
}
