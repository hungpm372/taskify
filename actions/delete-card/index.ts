'use server'
import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { DeleteCard } from './schema'
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

  const { id, boardId } = data

  let card
  try {
    card = await db.card.delete({
      where: {
        id,
        list: {
          boardId,
          board: {
            orgId
          }
        }
      }
    })

		await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.DELETE
    })
  } catch (error) {
    return {
      error: 'Failed to delete.'
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: card }
}

export const deleteCard = createSafeAction(DeleteCard, handler)
