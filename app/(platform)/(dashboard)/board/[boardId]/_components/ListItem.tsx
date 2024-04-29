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

interface ListItemProps {
  data: ListWithCards
  index: number
}

const ListItem = ({ data, index }: ListItemProps) => {
  return (
    <li className='shrink-0 h-full w-[272px] select-none'>
      <div className='w-full rounded-md shadow-md bg-[#f1f2f4]'>
        <ListHeader data={data} />
      </div>
    </li>
  )
}

export default ListItem
