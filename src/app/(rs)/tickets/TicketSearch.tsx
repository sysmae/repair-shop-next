import Form from 'next/form'
import { Input } from '@/components/ui/input'
import SearchButton from '@/components/SearchButton'

export default function TicketSearch() {
  return (
    <Form className="flex gap-2 items-center" action={'/tickets'}>
      <Input
        name="searchText"
        type="text"
        placeholder="티켓 검색"
        className="w-full"
      />
      <SearchButton />
    </Form>
  )
}
