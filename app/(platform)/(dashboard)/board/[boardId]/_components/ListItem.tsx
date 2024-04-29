/**
 * @author Phan Minh Hung
 * @email hungpm372@gmail.com
 * @create date 2024-04-29 18:43:58
 * @modify date 2024-04-29 18:43:58
 * @desc I am a student of information technology
 * @github https://github.com/hungpm372
 */

import { ListWithCards } from '@/types'
import ListHeader from './ListHeader'
import { ElementRef, useRef, useState } from 'react'
import CardForm from './CardForm'
import { cn } from '@/lib/utils'
import CardItem from './CardItem'

interface ListItemProps {
  data: ListWithCards
  index: number
}

const ListItem = ({ data, index }: ListItemProps) => {
  const textareaRef = useRef<ElementRef<'textarea'>>(null)
  const [isEditing, setIsEditing] = useState(false)

  const disableEditing = () => setIsEditing(false)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      textareaRef.current?.focus()
    })
  }

  return (
    <li className='shrink-0 h-full w-[272px] select-none '>
      <div className='w-full rounded-md shadow-md bg-[#f1f2f4] pb-2'>
        <ListHeader onAddCard={enableEditing} data={data} />
        <ol
          className={cn(
            'mx-1 px-1 py-0.5 flex flex-col gap-y-2',
            data.cards.length > 0 ? 'mt-2' : 'mt0'
          )}
        >
          {data.cards.map((card, index) => (
            <CardItem index={index} key={card.id} data={card} />
          ))}
        </ol>
        <CardForm
          ref={textareaRef}
          listId={data.id}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </li>
  )
}

export default ListItem
