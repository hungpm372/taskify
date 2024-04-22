'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useOrganization } from '@clerk/nextjs'
import { CreditCard } from 'lucide-react'
import Image from 'next/image'

const Info = () => {
  const { organization, isLoaded } = useOrganization()

  if (!isLoaded) {
    return <Info.Skeleton />
  }

  return (
    <div className='flex items-center gap-x-4'>
      <div className='size-[60px] relative'>
        <Image
          fill
          src={organization?.imageUrl!}
          alt={organization?.name!}
          className='rounded-md object-cover'
        />
      </div>
      <div className='space-y-1'>
        <p className='font-semibold text-xl'>{organization?.name}</p>
        <div className='flex items-center text-sm text-muted-foreground'>
          <CreditCard className='size-4 mr-1' />
          <span>Free</span>
        </div>
      </div>
    </div>
  )
}

export default Info

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className='flex items-center gap-x-4'>
      <div className='size-[60px] relative'>
        <Skeleton className='size-full absolute' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-8 w-[200px]' />
        <div className='flex items-center'>
          <Skeleton className='size-4 mr-1' />
          <Skeleton className='h-4 w-[100px]' />
        </div>
      </div>
    </div>
  )
}
