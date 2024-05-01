'use server'
import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { CopyCard } from './schema'
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
    const cardToCopy = await db.card.findUnique({
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

    if (!cardToCopy) return { error: 'Card not found' }

    const lastCard = await db.card.findFirst({
      where: {
        listId: cardToCopy.listId
      },
      orderBy: {
        order: 'desc'
      },
      select: {
        order: true
      }
    })

    card = await db.card.create({
      data: {
        order: lastCard ? lastCard.order + 1 : 1,
        title: `${cardToCopy.title} - Copy`,
        description: cardToCopy.description,
        listId: cardToCopy.listId
      }
    })

    await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE
    })
  } catch (error) {
    return {
      error: 'Failed to copy.'
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: card }
}

export const copyCard = createSafeAction(CopyCard, handler)
