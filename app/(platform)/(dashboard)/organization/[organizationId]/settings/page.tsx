import { OrganizationProfile } from '@clerk/nextjs'
import React from 'react'

const SettingsPage = () => {
  return (
    <div className='w-full'>
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: { boxShadow: 'none', width: '100%' },
            card: { boxShadow: 'none', width: '100%', border: '1px solid #E5E5E5' }
          }
        }}
      />
    </div>
  )
}

export default SettingsPage
