/**
 * @author Phan Minh Hung
 * @email hungpm372@gmail.com
 * @create date 2024-04-29 17:10:11
 * @modify date 2024-04-29 17:10:11
 * @desc I am a student of information technology
 * @github https://github.com/hungpm372
 */

import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import ListContainer from './_components/ListContainer'

interface BoardIdPageProps {
  params: {
    boardId: string
  }
}

const BoardIdPage = async ({ params: { boardId } }: BoardIdPageProps) => {
  const { orgId } = auth()

  if (!orgId) redirect('/select-org')

  const lists = await db.list.findMany({
    where: { boardId, board: { orgId } },
    include: { cards: { orderBy: { order: 'asc' } } },
    orderBy: { order: 'asc' }
  })

  return (
    <div className='p-4 h-full overflow-x-auto'>
      <ListContainer boardId={boardId} data={lists} />
    </div>
  )
}

export default BoardIdPage
