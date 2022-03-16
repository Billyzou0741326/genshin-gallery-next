import type { ArtworkInfo } from './models/artwork'


interface ArtidParams {
  imageType?: string
  apiBaseUrl?: string
  characterName?: string
}


interface ArtImageInfoParams {
  artidList: number[]
  apiBaseUrl?: string
}


export const endpoints = {
  artid: ({ imageType, apiBaseUrl, characterName }: ArtidParams) => {
    const apiPath = characterName ? `/api/character/${characterName}` : '/api/characters'
    const paramType = imageType || 'SFW'
    const searchParams = new URLSearchParams()
    searchParams.set('type', paramType)
    const uri = `${apiBaseUrl}${apiPath}?${searchParams.toString()}`
    return uri
  },
  artImageInfo: ({ artidList, apiBaseUrl }: ArtImageInfoParams) => {
    const apiPath = '/api/image-info'
    const searchParams = new URLSearchParams()
    for (const id of artidList) {
      searchParams.append('ids[]', id.toString())
    }
    const uri = `${apiBaseUrl}${apiPath}?${searchParams.toString()}`
    return uri
  }
}


export const fromApiResponse = {
  artid: processArtIds,
  artImageInfo: processArtImageInfo,
}

function processArtIds(data: any): number[] {
  const { data: allIds } = data
  return allIds
}

function processArtImageInfo(data: any): ArtworkInfo[] {
  const { data: artworks } = data
  return artworks
    .filter((a: any) => (a.images.length > 0))
    .map((a: any) => {
      a.images.map((image) => {
        const newImage = { ...image }
        newImage.urls.original_path = getPath(image.urls.original)
        newImage.urls.regular_path = getPath(image.urls.regular)
        newImage.urls.small_path = getPath(image.urls.small)
        return newImage
      })
      return { ...a }
    })
}


// Deprecated
async function getArtIds({ imageType, apiBaseUrl }): Promise<number[]> {
  const url = endpoints.artid({ imageType, apiBaseUrl })
  return await getArtIdsWithUrl({ url })
}

// Deprecated
async function getArtIdsByCharacter({ imageType, apiBaseUrl, characterName }): Promise<number[]> {
  const url = endpoints.artid({ imageType, apiBaseUrl, characterName })
  return await getArtIdsWithUrl({ url })
}

// Deprecated
async function getArtIdsWithUrl({ url }): Promise<number[]> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Cannot load ${url}`)
  }
  const data = await res.json()
  return processArtIds(data)
}

// Deprecated
async function getArtImageInfo({ artidList, apiBaseUrl }): Promise<ArtworkInfo[]> {
  const url = endpoints.artImageInfo({ artidList, apiBaseUrl })
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Cannot load ${url}`)
  }
  const data = await res.json()
  return processArtImageInfo(data)
}

// Deprecated
function getPath(url: string): string {
  const u = new URL(url)
  return u.pathname
}
