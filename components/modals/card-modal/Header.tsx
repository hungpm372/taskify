/**
 * @author Phan Minh Hung
 * @email hungpm372@gmail.com
 * @create date 2024-05-01 00:02:56
 * @modify date 2024-05-01 00:02:56
 * @desc I am a student of information technology
 * @github https://github.com/hungpm372
 */
'use client'

import { updateCard } from '@/actions/update-card'
import { FormInput } from '@/components/form/FormInput'
import { Skeleton } from '@/components/ui/skeleton'
import { useAction } from '@/hooks/use-action'
import { CardWithList } from '@/types'
import { useQueryClient } from '@tanstack/react-query'
import { Layout } from 'lucide-react'
import { useParams } from 'next/navigation'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'

interface HeaderProps {
  data: CardWithList
}

const Header = ({ data }: HeaderProps) => {
  const queryClient = useQueryClient()
  const params = useParams()
  const [title, setTitle] = useState(data.title)

  const inputRef = useRef<ElementRef<'input'>>(null)

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit()
  }

  const { execute } = useAction(updateCard, {
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['card', data.id] })
      queryClient.invalidateQueries({ queryKey: ['card-logs', data.id] })
      toast.success(`Renamed card to ${data.title}`)
      setTitle(data.title)
    },
    onError(error) {
      toast.error(error)
    }
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const boardId = params.boardId as string

    if (title === data.title) return

    execute({
      boardId,
      title,
      id: data.id
    })
  }

  return (
    <div className='flex items-start gap-x-3 mb-6 w-full'>
      <Layout className='size-5 mt-1 text-neutral-500' />
      <div className='w-full'>
        <form action={onSubmit}>
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id='title'
            defaultValue={title}
            className='font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate'
          />
        </form>
        <p className='text-sm text-muted-foreground'>
          in list <span className='underline'>{data.list.title}</span>
        </p>
      </div>
    </div>
  )
}

export default Header

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className='flex items-start gap-x-3 mb-6'>
      <Skeleton className='size-6 mt-1 bg-neutral-200' />
      <div>
        <Skeleton className='w-24 h-6 mb-1 bg-neutral-200' />
        <Skeleton className='w-12 h-4 bg-neutral-200' />
      </div>
    </div>
  )
}
