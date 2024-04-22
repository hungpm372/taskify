import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

interface HintProps {
  children: React.ReactNode
  description: string
  side?: 'left' | 'right' | 'top' | 'bottom'
  sideOffset?: number
}

const Hint = ({ children, description, side = 'bottom', sideOffset = 0 }: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          className='text-xs max-w-[220px] break-words'
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default Hint
