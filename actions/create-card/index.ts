'use server'
import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { CreateCard } from './schema'
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

  const { title, boardId, listId } = data

  let card
  try {
    const list = await db.list.findFirst({
      where: { id: listId, boardId, board: { orgId } }
    })

    if (!list) {
      return {
        error: 'List not found.'
      }
    }

    const lastCard = await db.card.findFirst({
      where: { listId },
      orderBy: { order: 'desc' },
      select: { order: true }
    })

    card = await db.card.create({
      data: {
        title,
        listId,
        order: lastCard?.order ? lastCard.order + 1 : 1
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
      error: 'Failed to create.'
    }
  }

  revalidatePath(`/board/${boardId}`)

  return {
    data: card
  }
}

export const createCard = createSafeAction(CreateCard, handler)
