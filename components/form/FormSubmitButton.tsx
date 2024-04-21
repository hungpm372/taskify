'use client'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'

interface FormSubmitButtonProps {
  children: React.ReactNode
  disabled?: boolean
  className?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'primary'
}

export const FormSubmitButton = forwardRef<HTMLInputElement, FormSubmitButtonProps>(
  ({ children, disabled, className, variant }, ref) => {
    const { pending } = useFormStatus()

    return (
      <Button
        disabled={pending || disabled}
        type='submit'
        variant={variant}
        size={'sm'}
        className={cn(className)}
      >
        {children}
      </Button>
    )
  }
)

FormSubmitButton.displayName = 'FormSubmitButton'
