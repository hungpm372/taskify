'use client'

import Hint from '@/components/Hint'
import FormPopover from '@/components/form/FormPopover'
import { HelpCircle, User2 } from 'lucide-react'
import React from 'react'

const BoardList = () => {
  return (
    <div className='space-y-4'>
      <div className='flex items-center font-semibold text-lg text-neutral-700'>
        <User2 className='size-6 mr-2' />
        <span>Your boards</span>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
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
