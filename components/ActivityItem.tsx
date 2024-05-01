/**
 * @author Phan Minh Hung
 * @email hungpm372@gmail.com
 * @create date 2024-05-01 17:50:54
 * @modify date 2024-05-01 17:50:54
 * @desc I am a student of information technology
 * @github https://github.com/hungpm372
 */
import { AuditLog } from '@prisma/client'
import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { generateLogMessage } from '@/lib/generate-log-message'
import { format } from 'date-fns'

const ActivityItem = ({ data }: { data: AuditLog }) => {
  return (
    <li className='flex items-center gap-x-2'>
      <Avatar className='size-8'>
        <AvatarImage src={data.userImage} />
      </Avatar>
      <div className='flex flex-col space-y-0.5'>
        <p className='text-sm text-muted-foreground'>
          <span className='font-semibold lowercase text-neutral-700'>{data.userName}</span>
          &nbsp;
          {generateLogMessage(data)}
        </p>
        <p className='text-xs text-muted-foreground'>
          {format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  )
}

export default ActivityItem
