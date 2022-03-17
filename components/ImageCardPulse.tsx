export default function ImageCardPulse() {
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
      </div>
    </div>
  );
}