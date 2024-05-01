/**
 * @author Phan Minh Hung
 * @email hungpm372@gmail.com
 * @create date 2024-05-01 23:26:04
 * @modify date 2024-05-01 23:26:04
 * @desc I am a student of information technology
 * @github https://github.com/hungpm372
 */
import { checkSubscription } from '@/lib/subscription'
import React from 'react'
import Info from '../_components/Info'
import { Separator } from '@/components/ui/separator'
import SubscriptionButton from './_components/SubscriptionButton'

const BillingPage = async () => {
  const isPro = await checkSubscription()
  return (
    <div className='w-full mb-20'>
      <Info isPro={isPro} />
      <Separator className='my-4' />
      <SubscriptionButton isPro={isPro} />
    </div>
  )
}

export default BillingPage
