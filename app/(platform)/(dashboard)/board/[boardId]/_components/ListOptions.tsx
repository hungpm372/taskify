/**
 * @author Phan Minh Hung
 * @email hungpm372@gmail.com
 * @create date 2024-04-29 21:53:57
 * @modify date 2024-04-29 21:53:57
 * @desc I am a student of information technology
 * @github https://github.com/hungpm372
 */
'use client'

import { copyList } from '@/actions/copy-list'
import { deleteList } from '@/actions/delete-list'
import { FormSubmitButton } from '@/components/form/FormSubmitButton'
import { Button } from '@/components/ui/button'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { useAction } from '@/hooks/use-action'
import { List } from '@prisma/client'
import { MoreHorizontal, X } from 'lucide-react'
import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'

interface ListOptionsProps {
  data: List
  onAddCard: () => void
}

const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<'button'>>(null)

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess(data) {
      toast.success(`List "${data.title}" deleted`)
      closeRef.current?.click()
    },
    onError(error) {
      toast.error(error)
    }
  })

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess(data) {
      toast.success(`List "${data.title}" copied`)
      closeRef.current?.click()
    },
    onError(error) {
      toast.error(error)
    }
  })

  const onDelete = (formData: FormData) => {
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string

    executeDelete({ id, boardId })
  }

  const onCopy = (formData: FormData) => {
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string

    executeCopy({ id, boardId })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='size-auto p-2' variant={'ghost'}>
          <MoreHorizontal className='size-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='px-0 py-3' side='bottom' align='start'>
        <div className='text-sm font-medium text-center text-neutral-600 pb-4'>List actions</div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className='size-auto p-2 absolute top-2 right-2 text-neutral-600'
            variant={'ghost'}
          >
            <X className='size-4' />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
          variant={'ghost'}
        >
          Add card...
        </Button>
        <form action={onCopy}>
          <input hidden readOnly name='id' value={data.id} />
          <input hidden readOnly name='boardId' value={data.boardId} />
          <FormSubmitButton
            className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
            variant='ghost'
          >
            Copy list...
          </FormSubmitButton>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden readOnly name='id' value={data.id} />
          <input hidden readOnly name='boardId' value={data.boardId} />
          <FormSubmitButton
            className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
            variant='ghost'
          >
            Delete this list
          </FormSubmitButton>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default ListOptions
