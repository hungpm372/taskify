/**
 * @author Phan Minh Hung
 * @email hungpm372@gmail.com
 * @create date 2024-05-01 23:28:40
 * @modify date 2024-05-01 23:28:40
 * @desc I am a student of information technology
 * @github https://github.com/hungpm372
 */
'use client'
import { stripeRedirect } from '@/actions/stripe-redirect'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { useProModal } from '@/hooks/use-pro-modal'
import React from 'react'
import { toast } from 'sonner'

const SubscriptionButton = ({ isPro }: { isPro: boolean }) => {
  const proModal = useProModal()
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess(data) {
      window.location.href = data
    },
    onError(error) {
      toast.error(error)
    }
  })

  const onClick = () => {
    if (isPro) {
      execute({})
    } else {
      proModal.onOpen()
    }
  }

  return (
    <Button variant={'primary'} disabled={isLoading} onClick={onClick}>
      {isPro ? 'Manage subscription' : 'Upgrade to Pro'}
    </Button>
  )
}

export default SubscriptionButton
