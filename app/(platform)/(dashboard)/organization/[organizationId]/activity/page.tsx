/**
 * @author Phan Minh Hung
 * @email hungpm372@gmail.com
 * @create date 2024-05-01 18:22:04
 * @modify date 2024-05-01 18:22:04
 * @desc I am a student of information technology
 * @github https://github.com/hungpm372
 */
import React, { Suspense } from 'react'
import Info from '../_components/Info'
import { Separator } from '@/components/ui/separator'
import ActivityList from './_components/ActivityList'
import { checkSubscription } from '@/lib/subscription'

const ActivityPage = async () => {
  const isPro = await checkSubscription()
  return (
    <div className='w-full mb-20'>
      <Info isPro={isPro} />
      <Separator className='my-4' />
      <div className='px-2 md:px-4'>
        <Suspense fallback={<ActivityList.Skeleton />}>
          <ActivityList />
        </Suspense>
      </div>
    </div>
  )
}

export default ActivityPage
