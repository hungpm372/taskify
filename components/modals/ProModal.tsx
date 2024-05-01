/**
 * @author Phan Minh Hung
 * @email hungpm372@gmail.com
 * @create date 2024-05-01 21:39:02
 * @modify date 2024-05-01 21:39:02
 * @desc I am a student of information technology
 * @github https://github.com/hungpm372
 */
'use client'

import { useProModal } from '@/hooks/use-pro-modal'
import { Dialog, DialogContent } from '../ui/dialog'
import Image from 'next/image'
import { Button } from '../ui/button'
import { useAction } from '@/hooks/use-action'
import { stripeRedirect } from '@/actions/stripe-redirect'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'

const ProModal = () => {
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
    execute({})
  }

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className='max-w-md p-5 overflow-hidden'>
        <div className='aspect-video relative flex items-center justify-center'>
          <Image src={'/logo.svg'} alt='Taskify' className='object-cover' fill />
        </div>
        <div className='text-neutral-700 mx-auto space-y-6 p-6'>
          <h2 className='font-semibold text-xl'>Upgrade to Taskify Pro today!</h2>
          <p className='text-xs font-semibold text-neutral-600'>Explore the best of Taskify</p>
          <div className='pl-3'>
            <ul className='text-sm list-disc'>
              <li>Unlimited boards</li>
              <li>Advanced checklists</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button onClick={onClick} disabled={isLoading} className='w-full' variant={'primary'}>
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProModal
