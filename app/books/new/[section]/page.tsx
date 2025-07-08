import { EditBook } from '@/components/EditBook';

export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>
}) {
  const section = (await params).section
  return <EditBook section={ section } />
}