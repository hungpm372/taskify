/**
 * @author Phan Minh Hung
 * @email hungpm372@gmail.com
 * @create date 2024-04-29 23:54:40
 * @modify date 2024-04-29 23:54:40
 * @desc I am a student of information technology
 * @github https://github.com/hungpm372
 */
import { KeyboardEventHandler, forwardRef } from 'react'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { cn } from '@/lib/utils'
import FormErrors from './FormErrors'
import { useFormStatus } from 'react-dom'

interface FormTextAreaProps {
  id: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errors?: Record<string, string[] | undefined>
  className?: string
  defaultValue?: string
  onBlur?: () => void
  onClick?: () => void
  onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> | undefined
}

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  (
    {
      id,
      onKeyDown,
      className,
      defaultValue,
      disabled,
      errors,
      label,
      onBlur,
      onClick,
      placeholder,
      required
    },
    ref
  ) => {
    const { pending } = useFormStatus()

    return (
      <div className='space-y-2 w-full'>
        <div className='space-y-1 w-full'>
          {label ? (
            <Label htmlFor={id} className='text-xs font-semibold text-neutral-700'>
              {label}
            </Label>
          ) : null}
          <Textarea
            onKeyDown={onKeyDown}
            onClick={onClick}
            onBlur={onBlur}
            id={id}
            ref={ref}
            disabled={pending || disabled}
            name={id}
            placeholder={placeholder}
            required={required}
            className={cn(
              'resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm',
              className
            )}
            aria-describedby={`${id}-error`}
            defaultValue={defaultValue}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    )
  }
)

export default FormTextArea

FormTextArea.displayName = 'FormTextArea'
