export interface BarProps {
  value: number | string
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
      {/* Label & Value */}
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
      {/* Horizontal Bar */}
      <div className={`overflow-hidden h-2 text-xs flex rounded
        ${fillPercentage < 33 ? 'bg-green-100' : (
          fillPercentage < 66 ? 'bg-yellow-100' :
          'bg-red-100'
        )}`}>
        <div
          style={{
            width: `${fillPercentage}%`
          }}
          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500
            ${fillPercentage < 33 ? 'bg-green-500' : (
              fillPercentage < 66 ? 'bg-yellow-500' :
              'bg-red-500'
            )}`}
        ></div>
      </div>
    </div>
  )
}

export default Bar
