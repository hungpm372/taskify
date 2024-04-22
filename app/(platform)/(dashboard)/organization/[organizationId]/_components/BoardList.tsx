import Hint from '@/components/Hint'
import FormPopover from '@/components/form/FormPopover'
import { Skeleton } from '@/components/ui/skeleton'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { HelpCircle, User2 } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const BoardList = async () => {
  const { orgId } = auth()

  if (!orgId) return redirect('/select-org')

  const boards = await db.board.findMany({
    where: {
      orgId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className='space-y-4'>
      <div className='flex items-center font-semibold text-lg text-neutral-700'>
        <User2 className='size-6 mr-2' />
        <span>Your boards</span>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            className='group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm size-full p-2 overflow-hidden'
          >
            <div className='absolute inset-0 bg-black/30 group-hover:bg-black/40 transition' />
            <p className='relative font-semibold text-white'> {board.title} </p>
          </Link>
        ))}
        <FormPopover sideOffset={10} side='right'>
          <div
            role='button'
            className='aspect-video relative size-full bg-muted rounded-sm flex items-center justify-center flex-col gap-y-1 hover:opacity-75 transition'
          >
            <p className='text-sm'>Create new board</p>
            <span className='text-xs'>5 remaining</span>
            <Hint
              sideOffset={40}
              description={`Free Wrokspaces can have up to 5 open boards. For unlimited boards upgrade this workspace`}
            >
              <HelpCircle className='absolute bottom-2 right-2 size-[14px]' />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  )
}

export default BoardList

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
      <Skeleton className='aspect-video size-full p-2' />
      <Skeleton className='aspect-video size-full p-2' />
      <Skeleton className='aspect-video size-full p-2' />
      <Skeleton className='aspect-video size-full p-2' />
      <Skeleton className='aspect-video size-full p-2' />
      <Skeleton className='aspect-video size-full p-2' />
      <Skeleton className='aspect-video size-full p-2' />
      <Skeleton className='aspect-video size-full p-2' />
    </div>
  )
}
