import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <Toaster closeButton />
      {children}
    </ClerkProvider>
  )
}

export default PlatformLayout
