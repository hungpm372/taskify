'use client'

import { Button } from '@/components/ui/button'
import { useFormState } from 'react-dom'
import { useAction } from '@/hooks/use-action'
import { createBoard } from '@/actions/create-board'
import { FormInput } from '@/components/form/FormInput'
import { FormSubmitButton } from '@/components/form/FormSubmitButton'

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
        <FormInput label='Board Title' id='title' errors={fieldErrors} />
      </div>
      <FormSubmitButton>Save</FormSubmitButton>
    </form>
  )
}

export default Form
