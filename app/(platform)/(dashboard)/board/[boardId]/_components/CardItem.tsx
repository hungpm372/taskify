/**
 * @author Phan Minh Hung
 * @email hungpm372@gmail.com
 * @create date 2024-04-30 01:03:05
 * @modify date 2024-04-30 01:03:05
 * @desc I am a student of information technology
 * @github https://github.com/hungpm372
 */
'use client'

import { Card } from '@prisma/client'

interface CardItemProps {
  data: Card
  index: number
}

const CardItem = ({ data, index }: CardItemProps) => {
  return (
    <div role='button' className='truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-sm shadow-sm'>
      {data.title}
    </div>
  )
}

export default CardItem
