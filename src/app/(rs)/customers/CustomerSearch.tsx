import Form from 'next/form'
import { Input } from '@/components/ui/input'
import SearchButton from '@/components/SearchButton'

export default function CustomerSearch() {
  return (
    <Form className="flex gap-2 items-center" action={'/customers'}>
      <Input
        name="searchText"
        type="text"
        placeholder="고객 검색"
        className="w-full"
      />
      <SearchButton />
    </Form>
  )
}
