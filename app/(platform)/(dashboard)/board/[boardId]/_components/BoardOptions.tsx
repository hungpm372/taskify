'use client'

import { deleteBoard } from '@/actions/delete-board'
import { Button } from '@/components/ui/button'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAction } from '@/hooks/use-action'
import { MoreHorizontal, X } from 'lucide-react'
import { toast } from 'sonner'

interface BoardOptionsProps {
  id: string
}

const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error)
    }
  })

  const onDelete = () => {
    execute({ id })
  }

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
          onClick={onDelete}
          className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
          disabled={isLoading}
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default BoardOptions
