import Image from 'next/image';

import type { ArtworkInfo, ArtworkImageInfo } from '../lib/models/artwork'
import CopyTextToClipboardButton from './clipboard/CopyTextToClipboard'


interface BarProps {
  value: number
  label: string
  fillPercentage?: number
}


const Bar = (props: BarProps): JSX.Element => {
  const {
    value,
    label,
    fillPercentage = 0,
  } = props
  return (
    <div className="px-2 py-1 relative">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs uppercase leading-3 text-blue-600 bg-blue-200 dark:bg-blue-300 py-1 px-2 rounded-full">
            { label }
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs text-blue-600 dark:text-blue-400">
            { value }
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-2 text-xs flex rounded bg-green-100">
        <div
          style={{
            width: `${fillPercentage}%`
          }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
        ></div>
      </div>
    </div>
  )
}


interface ImageCardProps {
  artworkInfo: ArtworkInfo
}


export default function ImageCard(props: ImageCardProps) {
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
        <Bar value={2} label={'SL'} fillPercentage={0} />
        {/* Nsfw */}
        <Bar value={0} label={'NSFW'} fillPercentage={0} />
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


export const Pulse = (): JSX.Element => {
  return (
    <div className="w-full h-full rounded-2xl shadow-md hover:shadow-2xl animate-pulse">
      {/* Image Card */}
      <div className="relative aspect-w-12 aspect-h-16 rounded-t-2xl bg-gray-200 dark:bg-gray-600" />
      {/* Metadata */}
      <div className="rounded-b-2xl p-2 bg-white dark:bg-gray-800 text-sm flex flex-col">
        {/* Pixiv id */}
        <div className="px-2 py-1 flex flex-row gap-2 items-center text-gray-500">
          <span className="h-3 w-full my-1 rounded-md bg-gray-200 dark:bg-gray-600" />
          {/* Heroicon clipboard-copy */}
          <div className="h-3 w-3 rounded-md bg-gray-200 dark:bg-gray-600" />
        </div>
        {/* Pixiv link */}
        <div className="px-2 py-1 flex flex-row gap-2 items-center text-green-500 hover:text-green-700">
          <span className="h-3 w-8 my-1 rounded-md bg-gray-200 dark:bg-gray-600" />
          {/* Heroicon external-link */}
          <div className="h-3 w-3 rounded-md bg-gray-200 dark:bg-gray-600" />
        </div>
        {/* SL */}
        <div className="px-2 py-1 relative">
          <div className="flex mb-2 items-center justify-between">
            <span className="w-12 h-5 rounded-full bg-gray-200 dark:bg-gray-600 py-1 px-2">{" "}</span>
            <span className="w-3 h-3 rounded-md bg-gray-200 dark:bg-gray-600">{" "}</span>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-600">
            <div
              style={{
                width: '0%'
              }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
            ></div>
          </div>
        </div>
        {/* Nsfw */}
        <div className="px-2 py-1 relative">
          <div className="flex mb-2 items-center justify-between">
            <span className="w-12 h-5 rounded-full bg-gray-200 dark:bg-gray-600 py-1 px-2">{" "}</span>
            <span className="w-3 h-3 rounded-md bg-gray-200 dark:bg-gray-600">{" "}</span>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-600">
            <div
              style={{
                width: '0%'
              }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
