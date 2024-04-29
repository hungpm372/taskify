/**
 * @author Phan Minh Hung
 * @email hungpm372@gmail.com
 * @create date 2024-04-29 23:41:35
 * @modify date 2024-04-29 23:41:35
 * @desc I am a student of information technology
 * @github https://github.com/hungpm372
 */
import { createCard } from '@/actions/create-card'
import { FormSubmitButton } from '@/components/form/FormSubmitButton'
import FormTextArea from '@/components/form/FormTextArea'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { Plus, X } from 'lucide-react'
import { useParams } from 'next/navigation'
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

interface CardFormProps {
  listId: string
  isEditing: boolean
  enableEditing: () => void
  disableEditing: () => void
}

const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ disableEditing, enableEditing, isEditing, listId }, ref) => {
    const params = useParams()
    const formRef = useRef<ElementRef<'form'>>(null)

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess(data) {
        toast.success(`Card "${data.title}" created.`)
        formRef.current?.reset()
      },
      onError(error) {
        toast.error(error)
      }
    })

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        disableEditing()
      }
    }

    useOnClickOutside(formRef, disableEditing)
    useEventListener('keydown', onKeyDown)

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        formRef.current?.requestSubmit()
      }
    }

    const onSubmit = (formData: FormData) => {
      const title = formData.get('title') as string
      const listId = formData.get('listId') as string
      const boardId = params.boardId as string

      execute({ title, listId, boardId })
    }

    if (isEditing) {
      return (
        <form ref={formRef} action={onSubmit} className='m-1 py-0.5 px-1 space-y-4'>
          <FormTextArea
            id='title'
            onKeyDown={onTextareaKeyDown}
            ref={ref}
            placeholder='Enter a title for this card...'
            errors={fieldErrors}
          />
          <input hidden readOnly name='listId' value={listId} />
          <div className='flex items-center gap-x-1'>
            <FormSubmitButton>Add card</FormSubmitButton>
            <Button onClick={disableEditing} size={'sm'} variant={'ghost'}>
              <X className='size-5' />
            </Button>
          </div>
        </form>
      )
    }

    return (
      <div className='px-2'>
        <Button
          className='h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm'
          size={'sm'}
          variant={'ghost'}
          onClick={enableEditing}
        >
          <Plus className='h-4 w-4 mr-2' />
          Add a card
        </Button>
      </div>
    )
  }
)

export default CardForm

CardForm.displayName = 'CardForm'
