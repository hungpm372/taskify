/**
 * @author Phan Minh Hung
 * @email hungpm372@gmail.com
 * @create date 2024-04-30 22:48:03
 * @modify date 2024-04-30 22:48:03
 * @desc I am a student of information technology
 * @github https://github.com/hungpm372
 */
'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useCardModal } from '@/hooks/use-card-modal'
import { fetcher } from '@/lib/fetcher'
import { CardWithList } from '@/types'
import { useQuery } from '@tanstack/react-query'
import Header from './Header'
import Description from './Description'

const CardModal = () => {
  const id = useCardModal((state) => state.id)
  const isOpen = useCardModal((state) => state.isOpen)
  const onClose = useCardModal((state) => state.onClose)

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ['card', id],
    queryFn: () => fetcher(`/api/cards/${id}`)
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
        <div className='grid grid-cols-1 md:grid-cols-4 md:gap-4'>
          <div className='col-span-3'>
            <div className='w-full space-y-6'>
              {!cardData ? <Description.Skeleton /> : <Description data={cardData} />}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CardModal
