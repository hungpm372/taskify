'use server'
import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { UpdateBoard } from './schema'
import { InputType, ReturnType } from './types'
import { createAuditLog } from '@/lib/create-audit-log'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorised'
    }
  }

  const { title, id } = data

  let board
  try {
    board = await db.board.update({
      where: {
        id,
        orgId
      },
      data: { title }
    })

		await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.UPDATE
    })
  } catch (error) {
    return {
      error: 'Failed to update.'
    }
  }

  revalidatePath(`/board/${id}`)

  return {
    data: board
  }
}

export const updateBoard = createSafeAction(UpdateBoard, handler)
