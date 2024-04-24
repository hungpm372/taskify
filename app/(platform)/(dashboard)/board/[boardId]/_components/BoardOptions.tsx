'use client'

import { Button } from '@/components/ui/button'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { MoreHorizontal, X } from 'lucide-react'

interface BoardOptionsProps {
  id: string
}

const BoardOptions = ({ id }: BoardOptionsProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='size-auto p-2' variant={'transparent'}>
          <MoreHorizontal className='size-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='px-0 py-3' side='bottom' align='start'>
        <div className='text-sm font-medium text-center text-neutral-600 pb-4'>Board actions</div>
        <PopoverClose asChild>
          <Button
            className='size-auto p-2 absolute top-2 right-2 text-neutral-600'
            variant={'ghost'}
          >
            <X className='size-4' />
          </Button>
        </PopoverClose>
        <Button
          variant={'ghost'}
          className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default BoardOptions
