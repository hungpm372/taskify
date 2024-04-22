'use client'

import { defaultImages } from '@/constant/images'
import { unsplash } from '@/lib/unsplash'
import { cn } from '@/lib/utils'
import { Check, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import FormErrors from './FormErrors'

interface FormPickerProps {
  id: string
  errors?: Record<string, string[] | undefined>
}

const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus()
  const [images, setImages] = useState<Array<Record<string, any>>>(defaultImages)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedImageId, setSelectedImageId] = useState(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 9
        })

        if (result && result.response) {
          const imagesRes = result.response as Array<Record<string, any>>
          setImages(imagesRes)
        } else {
          console.log('Failed to ge images from Unsplash')
        }
      } catch (error) {
        setImages(defaultImages)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [])

  if (isLoading) {
    return (
      <div className='p-6 flex items-center justify-center'>
        <Loader2 className='text-sky-700 animate-spin size-6' />
      </div>
    )
  }

  return (
    <div className='relative'>
      <div className='grid grid-cols-3 gap-2 mb-2'>
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted',
              pending && 'opacity-50 hover:opacity-50 cursor-auto'
            )}
            onClick={() => {
              if (pending) return
              setSelectedImageId(image.id)
            }}
          >
            <input
              type='radio'
              id={id}
              name={id}
              className='hidden'
              checked={selectedImageId === image.id}
              disabled={pending}
              readOnly
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              src={image.urls.thumb}
              sizes={'full'}
              priority
              fill
              alt={image.id}
              className='object-cover rounded-sm'
            />
            {selectedImageId === image.id && (
              <div className='absolute inset-y-0 size-full bg-black/30 flex items-center justify-center'>
                <Check className='size-4 text-white' />
              </div>
            )}
            <Link
              href={image.links.html}
              target='_blank'
              className='opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50'
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id={id} errors={errors} />
    </div>
  )
}

export default FormPicker
