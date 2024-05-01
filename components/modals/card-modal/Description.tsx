/**
 * @author Phan Minh Hung
 * @email hungpm372@gmail.com
 * @create date 2024-05-01 11:16:02
 * @modify date 2024-05-01 11:16:02
 * @desc I am a student of information technology
 * @github https://github.com/hungpm372
 */
'use client'

import { updateCard } from '@/actions/update-card'
import { FormSubmitButton } from '@/components/form/FormSubmitButton'
import FormTextArea from '@/components/form/FormTextArea'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAction } from '@/hooks/use-action'
import { CardWithList } from '@/types'
import { useQueryClient } from '@tanstack/react-query'
import { AlignLeft } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

interface DescriptionProps {
  data: CardWithList
}

const Description = ({ data }: DescriptionProps) => {
  const params = useParams()
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)

  const textareaRef = useRef<ElementRef<'textarea'>>(null)
  const formRef = useRef<ElementRef<'form'>>(null)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      textareaRef.current?.focus()
    })
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

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['card', data.id] })
      toast.success(`Card "${data.title}" updated`)
			disableEditing()
    },
    onError(error) {
      toast.error(error)
    }
  })

  const onSubmit = (formData: FormData) => {
    const description = formData.get('description') as string
    const boardId = params.boardId as string

    execute({
      boardId,
      description,
      id: data.id
    })
  }

  return (
    <div className='flex items-start gap-x-3 w-full'>
      <AlignLeft className='size-5 mt-0.5 text-neutral-700' />
      <div className='w-full'>
        <p className='font-semibold text-neutral-700 mb-2'>Description</p>
        {isEditing ? (
          <form action={onSubmit} ref={formRef} className='space-y-2'>
            <FormTextArea
              ref={textareaRef}
              id='description'
              className='w-full mt-2'
              placeholder='Add a more detailed description...'
              defaultValue={data.description || undefined}
              onKeyDown={undefined}
              errors={fieldErrors}
            />
            <div className='flex items-center gap-x-2'>
              <FormSubmitButton>Save</FormSubmitButton>
              <Button type='button' onClick={disableEditing} size={'sm'} variant={'ghost'}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            className='min-h-[78px] bg-neutral-200 text-sm font-semibold py-3 px-3.5 rounded-md'
            role='button'
          >
            {data.description || 'Add a more detailed description...'}
          </div>
        )}
      </div>
    </div>
  )
}

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className='flex items-start gap-x-3 w-full'>
      <Skeleton className='size-6 bg-neutral-200' />
      <div className='w-full'>
        <Skeleton className='w-24 h-6 mb-2 bg-neutral-200' />
        <Skeleton className='w-full h-[78px] bg-neutral-200' />
      </div>
    </div>
  )
}

export default Description
