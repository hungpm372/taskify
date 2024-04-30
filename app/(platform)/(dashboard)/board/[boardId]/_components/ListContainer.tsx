/**
 * @author Phan Minh Hung
 * @email hungpm372@gmail.com
 * @create date 2024-04-29 17:21:41
 * @modify date 2024-04-29 17:21:41
 * @desc I am a student of information technology
 * @github https://github.com/hungpm372
 */
'use client'

import { ListWithCards } from '@/types'
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd'
import { useEffect, useState } from 'react'
import ListForm from './ListForm'
import ListItem from './ListItem'
import { useAction } from '@/hooks/use-action'
import { updateListOrder } from '@/actions/update-list-order'
import { toast } from 'sonner'
import { updateCardOrder } from '@/actions/update-card-order'

interface ListContainerProps {
  boardId: string
  data: ListWithCards[]
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess(data) {
      toast.success('List order updated')
    },
    onError(error) {
      toast.error(error)
    }
  })

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess(data) {
      toast.success('Card order updated')
    },
    onError(error) {
      toast.error(error)
    }
  })

  const [orderedData, setOrderedData] = useState(data)

  useEffect(() => {
    setOrderedData(data)
  }, [data])

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) return
    console.log(result)
    // Move list
    if (type === 'list') {
      const items = reorder(orderedData, source.index, destination.index).map((list, index) => ({
        ...list,
        order: index + 1
      }))

      setOrderedData(items)

      executeUpdateListOrder({ items, boardId })
    }

    if (type === 'card') {
      let newOrderedData = [...orderedData]

      const sourceList = newOrderedData.find((list) => list.id === source.droppableId)
      const destinationList = newOrderedData.find((list) => list.id === destination.droppableId)

      if (!sourceList || !destinationList) return

      if (!sourceList.cards) {
        sourceList.cards = []
      }

      if (!destinationList.cards) {
        destinationList.cards = []
      }

      // Move card within the same list
      if (source.droppableId === destination.droppableId) {
        const items = reorder(sourceList.cards, source.index, destination.index)

        items.forEach((card, index) => {
          card.order = index + 1
        })

        sourceList.cards = items

        setOrderedData(newOrderedData)

        executeUpdateCardOrder({ items, boardId })
      } else {
        // Move card to another list
        const [moveCard] = sourceList.cards.splice(source.index, 1)

        moveCard.listId = destination.droppableId

        destinationList.cards.splice(destination.index, 0, moveCard)

        sourceList.cards.forEach((card, index) => {
          card.order = index + 1
        })

        destinationList.cards.forEach((card, index) => {
          card.order = index + 1
        })

        setOrderedData(newOrderedData)

        executeUpdateCardOrder({ boardId, items: destinationList.cards })
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='lists' type='list' direction='horizontal'>
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className='flex h-full gap-x-3 pb-2'
          >
            {orderedData.map((list, index) => (
              <ListItem key={list.id} index={index} data={list} />
            ))}
            {provided.placeholder}
            <ListForm />
            <li className='flex-shrink-0 w-1' />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default ListContainer
