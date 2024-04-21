'use client'

import { Button } from '@/components/ui/button'
import { useFormState } from 'react-dom'
import FormInput from './FormInput'
import FormButton from './FormButton'
import { useAction } from '@/hooks/use-action'
import { createBoard } from '@/actions/create-board'

const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, 'ok')
    },
    onError: (error) => {
      console.log(error, 'loi')
    }
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string

    execute({ title })
  }

  return (
    <form action={onSubmit}>
      <div className='flex flex-col space-y-2'>
        <FormInput errors={fieldErrors} />
      </div>
      <FormButton />
    </form>
  )
}

export default Form
