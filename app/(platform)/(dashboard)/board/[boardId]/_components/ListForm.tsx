/**
 * @author Phan Minh Hung
 * @email hungpm372@gmail.com
 * @create date 2024-04-29 17:45:06
 * @modify date 2024-04-29 17:45:06
 * @desc I am a student of information technology
 * @github https://github.com/hungpm372
 */

'use client'

import { Plus, X } from 'lucide-react'
import { ElementRef, useRef, useState } from 'react'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import ListWrapper from './ListWrapper'
import { FormInput } from '@/components/form/FormInput'
import { useParams, useRouter } from 'next/navigation'
import { FormSubmitButton } from '@/components/form/FormSubmitButton'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { createList } from '@/actions/create-list'
import { toast } from 'sonner'

const ListForm = () => {
  const params = useParams()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess(data) {
      toast.success(`List "${data.title}" created.`)
      disableEditing()
      router.refresh()
    },
    onError(error) {
      toast.error(error)
    }
  })

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => inputRef.current?.focus())
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing()
    }
  }

  useEventListener('keydown', onKeyDown)
  useOnClickOutside(formRef, disableEditing)

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const boardId = formData.get('boardId') as string

    execute({ title, boardId })
  }

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className='w-full p-3 rounded-md bg-white space-y-4 shadow-md'
        >
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            id='title'
            className='text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition'
            placeholder='Enter list title...'
          />
          <input type='hidden' name='boardId' value={params.boardId} />
          <div className='flex items-center gap-x-1'>
            <FormSubmitButton>Add list</FormSubmitButton>
            <Button onClick={disableEditing} size={'sm'} variant={'ghost'}>
              <X className='size-5' />
            </Button>
          </div>
        </form>
      </ListWrapper>
    )
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className='w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm'
      >
        <Plus className='size-4 mr-2' />
        <span>Add a list</span>
      </button>
    </ListWrapper>
  )
}

export default ListForm
