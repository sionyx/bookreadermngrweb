import { EditSection } from '@/components/EditSection';

export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>
}) {
  const section = (await params).section
  return <EditSection parent={ section } />
}
