import { fromApiResponse } from '../api'

export default async function fetcher(url: string) {
  const res = await fetch(url)
  const data = await res.json()
  return fromApiResponse.artImageInfo(data)
}
