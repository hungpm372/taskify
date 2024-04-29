/**
 * @author Phan Minh Hung
 * @email hungpm372@gmail.com
 * @create date 2024-04-29 18:51:23
 * @modify date 2024-04-29 18:51:23
 * @desc I am a student of information technology
 * @github https://github.com/hungpm372
 */
'use client'

import { updateList } from '@/actions/update-list'
import { FormInput } from '@/components/form/FormInput'
import { useAction } from '@/hooks/use-action'
import { List } from '@prisma/client'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener } from 'usehooks-ts'
import ListOptions from './ListOptions'

interface ListHeaderProps {
  data: List
  onAddCard: () => void
}

const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
  const { execute } = useAction(updateList, {
    onSuccess(data) {
      setTitle(data.title)
      disableEditing()
      toast.success(`Renamed to "${data.title}"`)
    },
    onError(error) {
      toast.error(error)
    }
  })

  const [title, setTitle] = useState(data.title)
  const [isEditing, setIsEditing] = useState(false)

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      formRef.current?.requestSubmit()
    }
  }

  useEventListener('keydown', onKeyDown)

  const onSubmit = (formData: FormData) => {
    const id = formData.get('id') as string
    const title = formData.get('title') as string
    const boardId = formData.get('boardId') as string

    if (title === data.title) return disableEditing()

    execute({ id, title, boardId })
  }

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  return (
    <div className='p-2 text-sm font-semibold flex justify-between items-start gap-x-2'>
      {isEditing ? (
        <form action={onSubmit} ref={formRef} className='flex-1 px-[2px]'>
          <input hidden name='id' value={data.id} readOnly />
          <input hidden name='boardId' value={data.boardId} readOnly />
          <FormInput
            ref={inputRef}
            id='title'
            onBlur={onBlur}
            placeholder='Enter list title...'
            defaultValue={title}
            className='text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white'
          />
          <button type='submit' hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className='w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent'
        >
          {title}
        </div>
      )}
      <ListOptions onAddCard={onAddCard} data={data} />
    </div>
  )
}

export default ListHeader
