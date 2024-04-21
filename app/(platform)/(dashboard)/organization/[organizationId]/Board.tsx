import { deleteBoard } from '@/actions/deleteBoard'
import { Button } from '@/components/ui/button'
import FormDelete from './FormDelete'

interface BoardProps {
  id: string
  title: string
}

const Board = ({ id, title }: BoardProps) => {
  const deleteBoardById = deleteBoard.bind(null, id)

  return (
    <form action={deleteBoardById} className='flex items-center gap-x-2'>
      <p>{title}</p>
      <FormDelete />
    </form>
  )
}

export default Board
