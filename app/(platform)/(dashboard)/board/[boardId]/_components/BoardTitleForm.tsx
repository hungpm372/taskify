'use client'
import { updateBoard } from '@/actions/update-board'
import { FormInput } from '@/components/form/FormInput'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { Board } from '@prisma/client'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'

interface BoardTitleFormProps {
  data: Board
}

const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const { execute } = useAction(updateBoard, {
    onSuccess(data) {
      toast.success(`Board "${data.title}" updated!`)
      setTitle(data.title)
      disableEditing()
    },
    onError(error) {
      toast.error(error)
    }
  })

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)
  const [title, setTitle] = useState(data.title)
  const [isEditing, setIsEditing] = useState(false)

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

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string

    execute({
      title,
      id: data.id
    })
  }

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  if (isEditing) {
    return (
      <form action={onSubmit} ref={formRef} className='flex items-center gap-x-2'>
        <FormInput
          ref={inputRef}
          id='title'
          onBlur={onBlur}
          defaultValue={title}
          className='text-lg font-bold px-2 py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none'
        />
      </form>
    )
  }

  return (
    <Button
      onClick={enableEditing}
      variant={'transparent'}
      className='font-bold text-lg size-auto p-1 px-2'
    >
      {title}
    </Button>
  )
}

export default BoardTitleForm
