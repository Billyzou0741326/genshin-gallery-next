import { useEffect, useState } from "react"

interface CopyTextToClipboardButtonProps {
  text: string
  className?: string
  children?: React.ReactNode
  noop?: boolean
}

const DefaultIcon = (): JSX.Element => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
    </svg>
  )
}

const CopyTextToClipboardButton = (props: CopyTextToClipboardButtonProps): JSX.Element => {
  // heroicon clipboard-copy
  let timeoutRet: ReturnType<typeof setTimeout> | null = null
  const [ popoverVisible, setPopoverVisible ] = useState(false)
  const {
    text,
    className = '',
    children = <DefaultIcon />,
    noop = false,
  } = props
  // copy text to clipboard
  const copy = async (text: string) => {
    if (!noop) {
      if (!navigator || !navigator.clipboard || !navigator.clipboard.writeText) {
        // no access to clipboard
        return
      }
      try {
        await navigator.clipboard.writeText(text)
        setPopoverVisible(true)
        console.log('clipboard copy activated')
        if (timeoutRet !== null) clearTimeout(timeoutRet)
        timeoutRet = setTimeout(() => {
          console.log('clipboard copy expired')
          setPopoverVisible(false)
        }, 3000)
      } catch (error) {
        console.log(error)
      }
    }
  }
  useEffect(() => {
    return () => { if (timeoutRet !== null) clearTimeout(timeoutRet) }
  }, null)
  return (
    <button onClick={() => copy(text)} className={`${className} relative w-4 h-4`}>
      { popoverVisible && (
        <div className={`absolute p-2 left-1/2 text-xs -translate-x-1/2 -top-12 text-white hover:text-white bg-green-500 rounded-lg`}>
          Copied!
          <svg aria-hidden="true" width="16" height="6" viewBox="0 0 16 6" className="text-green-500 absolute top-full left-1/2 -mt-px -ml-2"><path fill-rule="evenodd" clip-rule="evenodd" d="M15 0H1V1.00366V1.00366V1.00371H1.01672C2.72058 1.0147 4.24225 2.74704 5.42685 4.72928C6.42941 6.40691 9.57154 6.4069 10.5741 4.72926C11.7587 2.74703 13.2803 1.0147 14.9841 1.00371H15V0Z" fill="currentColor"></path></svg>
        </div>
      ) }
      {children}
    </button>
  )
}

export default CopyTextToClipboardButton
