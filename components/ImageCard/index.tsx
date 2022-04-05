import Image from 'next/image';

import type { ArtworkInfo, ArtworkImageInfo } from '../../lib/models/artwork'
import CopyTextToClipboardButton from '../clipboard/CopyTextToClipboard'
import Bar from './bar'
import Pulse from './pulse'


interface NSFWBarProps {
  images?: ArtworkImageInfo[]
}

const NSFWBar = (props: NSFWBarProps): JSX.Element => {
  const { images = [] } = props
  const nsfwInfo = images[0]?.nsfw || null
  const nsfwValue = nsfwInfo && (nsfwInfo.hentai + nsfwInfo.sexy + nsfwInfo.porn)
  const percentage = nsfwValue !== null ? (nsfwValue*100) : 0.0
  const percentageStr = nsfwValue !== null ? `${(nsfwValue*100).toFixed(2)}%` : '-'
  return (
    <>
      {images.length > 0 && (
        <Bar label="NSFW" value={percentageStr} fillPercentage={percentage} />
      )}
    </>
  )
}


interface SLValueProps {
  sl?: number
}

const SLBar = (props: SLValueProps): JSX.Element => {
  const { sl = 2 } = props
  const [ minSl, maxSl ] = [2, 6]
  const percentage = (sl - minSl) * 100 / (maxSl - minSl)

  return (
    <Bar label="SL" value={sl} fillPercentage={percentage} />
  )
}


interface ImageCardProps {
  artworkInfo: ArtworkInfo
}

const ImageCard = (props: ImageCardProps): JSX.Element => {
  const { artworkInfo } = props;
  return (
    <div key={artworkInfo.art_id}
         className="w-full h-full rounded-2xl shadow-md hover:shadow-2xl
                    transition duration-300 ease-in-out relative">
      <a href={toImageUrlOriginal(artworkInfo.images[0])}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
      >
        <div className="relative aspect-h-16 aspect-w-12">
        {/* Image */}
          <Image className="w-full h-full rounded-t-2xl shadow-md object-cover"
                 layout="fill"
                 alt={artworkInfo.title}
                 src={toImageUrlSmall(artworkInfo.images[0])}
          />
        </div>
      </a>
      {/* Number indicator */}
      <button
        className="absolute top-0 right-0 flex flex-row gap-1 items-center px-1 bg-white bg-opacity-75
                   rounded-lg shadow z-10">
        <span>{artworkInfo.images?.length || 0}</span>
        {/* Heroicon collection */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
        </svg>
      </button>
      {/* Metadata */}
      <div className="rounded-b-2xl p-2 bg-white dark:bg-gray-800 text-sm flex flex-col">
        {/* Pixiv id */}
        <div className="px-2 py-1 flex flex-row gap-2 items-center text-gray-500">
          <span>{artworkInfo.art_id}</span>
          <CopyTextToClipboardButton
            text={artworkInfo.art_id.toString()}
            className="hover:text-green-500 ease-in-out duration-700"
          />
        </div>
        {/* Pixiv link */}
        <a target="_blank"
           href={`https://www.pixiv.net/artworks/${artworkInfo.art_id}`}
           rel="noopener noreferrer"
           className="px-2 py-1 flex flex-row gap-2 items-center text-green-700 hover:text-green-900 hover:underline">
          <span>Pixiv</span>
          {/* Heroicon external-link */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
        </a>
        {/* SL */}
        {/*<Bar value={artworkInfo.sl} label={'SL'} fillPercentage={(artworkInfo.sl-2) * 100.0 / (6.0-2.0)} />*/}
        <SLBar sl={artworkInfo.sl} />
        {/* Nsfw */}
        {/*<Bar value={artworkInfo.images[0]?.nsfw?.drawings} label={'NSFW'} fillPercentage={0} />*/}
        <NSFWBar images={artworkInfo.images} />
      </div>
    </div>
  );
}


function toImageUrlSmall(image: ArtworkImageInfo): string {
  return `https://img.minamiktr.com${getPath(image.urls.small)}`;
}

function toImageUrlOriginal(image: ArtworkImageInfo): string {
  return `https://img.minamiktr.com${getPath(image.urls.original)}`;
}

function getPath(url: string): string {
  const u = new URL(url);
  return u.pathname;
}


export { Bar, Pulse }
export type { BarProps } from './bar'
export default ImageCard
