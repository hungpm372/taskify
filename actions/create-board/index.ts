'use server'
import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { CreateBoard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorised'
    }
  }

  const { title, image } = data
  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUsername] = image.split('|')

  if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUsername) {
    return {
      error: 'Missing fields. Failed to create board.'
    }
  }

  let board
  try {
    board = await db.board.create({
      data: {
        title,
        imageFullUrl,
        imageId,
        imageLinkHTML,
        imageThumbUrl,
        imageUsername,
        orgId
      }
    })
  } catch (error) {
    return {
      error: 'Failed to create.'
    }
  }

  revalidatePath(`/board/${board.id}`)

  return {
    data: board
  }
}

export const createBoard = createSafeAction(CreateBoard, handler)
