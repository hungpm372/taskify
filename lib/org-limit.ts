/**
 * @author Phan Minh Hung
 * @email hungpm372@gmail.com
 * @create date 2024-05-01 19:26:46
 * @modify date 2024-05-01 19:26:46
 * @desc I am a student of information technology
 * @github https://github.com/hungpm372
 */

import { auth } from '@clerk/nextjs'
import { db } from './db'
import { MAX_FREE_BOARDS } from '@/constant/boards'

export const incrementAvailableCount = async () => {
  const { orgId } = auth()

  if (!orgId) {
    throw new Error('Unauthorised')
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId
    }
  })

  if (orgLimit) {
    await db.orgLimit.update({
      where: {
        orgId
      },
      data: {
        count: orgLimit.count + 1
      }
    })
  } else {
    await db.orgLimit.create({
      data: {
        orgId,
        count: 1
      }
    })
  }
}

export const decreaseAvailableCount = async () => {
  const { orgId } = auth()

  if (!orgId) {
    throw new Error('Unauthorised')
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId
    }
  })

  if (orgLimit) {
    await db.orgLimit.update({
      where: {
        orgId
      },
      data: {
        count: orgLimit.count > 0 ? orgLimit.count - 1 : 0
      }
    })
  } else {
    await db.orgLimit.create({
      data: {
        orgId,
        count: 0
      }
    })
  }
}

export const hasAvailableCount = async () => {
  const { orgId } = auth()

  if (!orgId) {
    throw new Error('Unauthorised')
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId
    }
  })

  if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
    return true
  }
  return false
}

export const getAvailableCount = async () => {
  const { orgId } = auth()

  if (!orgId) {
    return 0
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId
    }
  })

  if (!orgLimit) {
    return 0
  }
  return orgLimit.count
}
