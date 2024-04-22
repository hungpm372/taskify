import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import React from 'react'
import MobileSidebar from './MobileSidebar'
import FormPopover from '@/components/form/FormPopover'

const Navbar = () => {
  return (
    <nav className='fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center'>
      <MobileSidebar />
      <div className='flex items-center gap-x-4'>
        <div className='hidden md:flex'>
          <Logo />
        </div>
        <FormPopover align='start' side='bottom' sideOffset={20}>
          <Button
            asChild
            size={'sm'}
            variant={'primary'}
            className='rounded-sm hidden md:block h-auto py-1.5 px-2'
          >
            <span>Create</span>
          </Button>
        </FormPopover>
        <FormPopover>
          <Button asChild size={'sm'} variant={'primary'} className='rounded-sm block md:hidden'>
            <Plus className='w-4 h-4' />
          </Button>
        </FormPopover>
      </div>
      <div className='ml-auto flex items-center gap-x-2'>
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl='/organization/:id'
          afterLeaveOrganizationUrl='/select-org'
          afterSelectOrganizationUrl='/organization/:id'
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              },
              avatarBox: {
                width: 30,
                height: 30
              }
            }
          }}
        />
        <UserButton
          afterSignOutUrl='/'
          appearance={{
            elements: {
              avatarBox: {
                width: 30,
                height: 30
              }
            }
          }}
        />
      </div>
    </nav>
  )
}

export default Navbar
