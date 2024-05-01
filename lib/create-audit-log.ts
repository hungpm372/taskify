/**
 * @author Phan Minh Hung
 * @email hungpm372@gmail.com
 * @create date 2024-05-01 17:10:00
 * @modify date 2024-05-01 17:10:00
 * @desc I am a student of information technology
 * @github https://github.com/hungpm372
 */

import { auth, currentUser } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { db } from './db'

interface Props {
  entityId: string
  entityType: ENTITY_TYPE
  entityTitle: string
  action: ACTION
}

export const createAuditLog = async (props: Props) => {
  try {
    const { orgId } = auth()
    const user = await currentUser()

    if (!user || !orgId) {
      throw new Error('Unauthorised')
    }

    const { entityId, entityType, entityTitle, action } = props

    await db.auditLog.create({
      data: {
        orgId,
        entityId,
        entityType,
        entityTitle,
        action,
        userId: user.id,
        userImage: user?.imageUrl,
        userName:
          user?.firstName + ' ' + user?.lastName ||
          user?.username ||
          user?.emailAddresses[0].emailAddress
      }
    })
  } catch (error) {
    console.log('[AUDIT LOG ERROR]', error)
  }
}
