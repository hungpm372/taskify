'use client'

import { X } from 'lucide-react'
import { Button } from '../ui/button'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '../ui/popover'
import { FormInput } from './FormInput'
import { FormSubmitButton } from './FormSubmitButton'
import { useAction } from '@/hooks/use-action'
import { createBoard } from '@/actions/create-board'
import { toast } from 'sonner'

interface FormPopoverProps {
  children: React.ReactNode
  side?: 'left' | 'right' | 'top' | 'bottom'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
}

const FormPopover = ({ children, align, side = 'bottom', sideOffset = 0 }: FormPopoverProps) => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data)
      toast.success('Board created!')
    },
    onError: (error) => {
      console.log(error)
      toast.error(error)
    }
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string

    execute({ title })
  }

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent align={align} side={side} sideOffset={sideOffset} className='w-80 pt-3'>
        <div className='text-sm font-medium text-center text-neutral-600 pb-4'>Create board</div>
        <PopoverClose asChild>
          <Button
            className='size-auto p-2 absolute top-2 right-2 text-neutral-600'
            variant={'ghost'}
          >
            <X className='size-4' />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className='space-y-4'>
          <div className='space-y-4'>
            <FormInput id='title' label='Board title' type='text' errors={fieldErrors} />
          </div>
          <FormSubmitButton className='w-full'>Create</FormSubmitButton>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default FormPopover
