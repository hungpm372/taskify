/**
 * @author Phan Minh Hung
 * @email hungpm372@gmail.com
 * @create date 2024-04-30 23:07:46
 * @modify date 2024-04-30 23:07:46
 * @desc I am a student of information technology
 * @github https://github.com/hungpm372
 */
'use client'
import { useEffect, useState } from 'react'
import CardModal from '../modals/card-modal'
import ProModal from '../modals/ProModal'

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <CardModal />
      <ProModal />
    </>
  )
}

export default ModalProvider
