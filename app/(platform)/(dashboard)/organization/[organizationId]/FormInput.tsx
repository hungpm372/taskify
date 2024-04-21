'use client'

import { useFormStatus } from 'react-dom'
import { Input } from '@/components/ui/input'

interface FormInputProps {
  errors?: {
    title?: string[]
  }
}

const FormInput = ({ errors }: FormInputProps) => {
  const { pending } = useFormStatus()

  return (
    <div>
      <Input
        type='text'
        id='title'
        name='title'
        required
        placeholder='Enter a board title'
        disabled={pending}
      />
      {errors?.title ? (
        <div>
          {errors.title.map((error) => {
            return (
              <p key={error} className='text-rose-500'>
                {error}
              </p>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default FormInput
