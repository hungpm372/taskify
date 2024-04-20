'use client'
import { useOrganizationList } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

const OrgControl = () => {
  const { organizationId } = useParams<{ organizationId: string }>()
  const { setActive } = useOrganizationList()

  useEffect(() => {
    if (!setActive) return

    setActive({
      organization: organizationId
    })
  }, [setActive, organizationId])

  return null
}

export default OrgControl
