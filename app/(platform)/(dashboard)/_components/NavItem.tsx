'use client'

import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { Activity, CreditCard, Layout, Settings } from 'lucide-react'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'

export type Organization = {
  id: string
  slug: string
  imageUrl: string
  name: string
}

interface NavItemProps {
  isActive: boolean
  isExpanded: boolean
  organization: Organization
  onExpand: (id: string) => void
}

const NavItem = ({ isActive, isExpanded, organization, onExpand }: NavItemProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const routes = [
    {
      label: 'Boards',
      icon: <Layout className='size-4 mr-2' />,
      href: `/organization/${organization.id}`
    },
    {
      label: 'Activity',
      icon: <Activity className='size-4 mr-2' />,
      href: `/organization/${organization.id}/activity`
    },
    {
      label: 'Settings',
      icon: <Settings className='size-4 mr-2' />,
      href: `/organization/${organization.id}/settings`
    },
    {
      label: 'Billing',
      icon: <CreditCard className='size-4 mr-2' />,
      href: `/organization/${organization.id}/billing`
    }
  ]

  const onClick = (href: string) => {
    router.push(href)
  }

  return (
    <AccordionItem value={organization.id} className='border-none'>
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          'flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline',
          isActive && !isExpanded && 'bg-sky-500/10 text-sky-700'
        )}
      >
        <div className='flex items-center gap-x-2'>
          <div className='size-7 relative'>
            <Image
              priority
              fill
              sizes='7'
              src={organization.imageUrl}
              alt={organization.name}
              className='rounded-sm object-cover'
            />
          </div>
          <span className='font-medium text-sm'>{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className='pt-1 text-neutral-700'>
        {routes.map((route) => {
          return (
            <Button
              key={route.href}
              size={'sm'}
              variant={'ghost'}
              onClick={() => onClick(route.href)}
              className={cn(
                'w-full font-normal justify-start pl-10 mb-1',
                pathname === route.href && 'bg-sky-500/10 text-sky-700'
              )}
            >
              {route.icon}
              {route.label}
            </Button>
          )
        })}
      </AccordionContent>
    </AccordionItem>
  )
}

export default NavItem

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className='flex items-center gap-x-2'>
      <div className='size-10 relative shrink-0'>
        <Skeleton className='size-10 absolute' />
      </div>
      <Skeleton className='h-10 w-full' />
    </div>
  )
}
