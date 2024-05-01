'use server'
import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { CreateList } from './schema'
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

  const { title, boardId } = data

  let list
  try {
    const board = await db.board.findUnique({
      where: { id: boardId, orgId }
    })

    if (!board) {
      return {
        error: 'Board not found.'
      }
    }

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: 'desc' },
      select: { order: true }
    })

    let order = lastList ? lastList.order + 1 : 1

    list = await db.list.create({
      data: { title, boardId, order }
    })

    await createAuditLog({
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE
    })
  } catch (error) {
    return {
      error: 'Failed to create.'
    }
  }

  revalidatePath(`/board/${boardId}`)

  return {
    data: list
  }
}

export const createList = createSafeAction(CreateList, handler)
