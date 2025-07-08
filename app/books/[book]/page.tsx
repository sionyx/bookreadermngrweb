import { EditBook } from '@/components/EditBook';

export default async function Page({
  params,
}: {
  params: Promise<{ book: string }>
}) {
  const book = (await params).book
  return <EditBook book={ book == 'new' ? undefined : book } />
}