import Head from 'next/head'
import getConfig from 'next/config'
import { GetServerSideProps } from 'next'

import ImageCard, { Pulse as ImageCardPulse } from '../components/ImageCard'
import { endpoints } from '../lib/api'
import artidFetcher from '../lib/fetchers/artid'
import artImageInfoFetcher from '../lib/fetchers/artImageInfo'
import type { ArtworkInfo } from '../lib/models/artwork'


interface GenshinPixivProps {
  artidList: number[]
  artList: ArtworkInfo[]
}


export default function GenshinPixiv(props: GenshinPixivProps) {
  const { artList } = props
  return (
    <div className="">
      <Head>
        <title>Home | Genshin Gallery</title>
        <meta name="description" content="Genshin gallery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col bg-gray-100 dark:bg-black p-4 lg:p-10">
        <div className="">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7
                          gap-4 lg:gap-6 justify-items-center will-change-transform">
            { Array(1).fill(0).map((_, i) => (
              <ImageCardPulse key={`${-i}`} />
            )) }
            { artList.map((info: ArtworkInfo) => (
              <ImageCard key={info.art_id} artworkInfo={info} />
            )) }
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const { serverRuntimeConfig } = getConfig()
  const { apiBaseUrl } = serverRuntimeConfig
  const allIdsUrl = endpoints.artid({ imageType: 'SFW', apiBaseUrl })
  const allIds = await artidFetcher(allIdsUrl)
  const artidList = allIds.slice(0, 30)
  const artListUrl = endpoints.artImageInfo({ apiBaseUrl, artidList })
  const artList = await artImageInfoFetcher(artListUrl)
  return {
    props: {
      artidList,
      artList,
    },
  }
}
