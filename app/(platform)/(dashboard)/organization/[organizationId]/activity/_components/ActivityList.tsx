/**
 * @author Phan Minh Hung
 * @email hungpm372@gmail.com
 * @create date 2024-05-01 18:25:39
 * @modify date 2024-05-01 18:25:39
 * @desc I am a student of information technology
 * @github https://github.com/hungpm372
 */

import ActivityItem from '@/components/ActivityItem'
import { Skeleton } from '@/components/ui/skeleton'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

const ActivityList = async () => {
  const { orgId } = auth()

  if (!orgId) redirect('/select-org')

  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <ol className='space-y-4 mt-4'>
      <p className='hidden last:block text-sm text-center text-muted-foreground'>
        No activity found inside this organization
      </p>
      {auditLogs.map((log) => (
        <ActivityItem key={log.id} data={log} />
      ))}
    </ol>
  )
}

export default ActivityList

ActivityList.Skeleton = function ActivitySkeleton() {
  return (
    <ol className='space-y-4 mt-4'>
      <Skeleton className='w-[80%] h-14' />
      <Skeleton className='w-[80%] h-14' />
      <Skeleton className='w-[80%] h-14' />
      <Skeleton className='w-[80%] h-14' />
      <Skeleton className='w-[80%] h-14' />
      <Skeleton className='w-[80%] h-14' />
      <Skeleton className='w-[80%] h-14' />
      <Skeleton className='w-[80%] h-14' />
      <Skeleton className='w-[80%] h-14' />
      <Skeleton className='w-[80%] h-14' />
    </ol>
  )
}
