import { getSearchResults } from '@/lib/search';
 
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const results = await getSearchResults((await searchParams).query)
 
  return <div>...</div>
}