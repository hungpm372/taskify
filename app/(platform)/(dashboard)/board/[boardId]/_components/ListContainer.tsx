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
import ListForm from './ListForm'
import { use, useEffect, useState } from 'react'
import ListItem from './ListItem'

interface ListContainerProps {
  boardId: string
  data: ListWithCards[]
}

const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data)

  useEffect(() => {
    setOrderedData(data)
  }, [data])

  return (
    <ol className='flex h-full gap-x-3 pb-2'>
      {orderedData.map((list, index) => (
        <ListItem key={list.id} index={index} data={list} />
      ))}
      <ListForm />
      <li className='flex-shrink-0 w-1' />
    </ol>
  )
}

export default ListContainer
