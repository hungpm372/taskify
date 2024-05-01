'use server'
import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { UpdateCard } from './schema'
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

  const { id, boardId, ...values } = data

  let card
  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          boardId,
          board: {
            orgId
          }
        }
      },
      data: { ...values }
    })

		await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPDATE
    })
  } catch (error) {
    return {
      error: 'Failed to update.'
    }
  }

  revalidatePath(`/board/${boardId}`)

  return {
    data: card
  }
}

export const updateCard = createSafeAction(UpdateCard, handler)
