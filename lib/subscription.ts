/**
 * @author Phan Minh Hung
 * @email hungpm372@gmail.com
 * @create date 2024-05-01 21:21:01
 * @modify date 2024-05-01 21:21:01
 * @desc I am a student of information technology
 * @github https://github.com/hungpm372
 */

import { auth } from '@clerk/nextjs'
import { db } from './db'

const DAY_IN_MS = 86_400_000

export const checkSubscription = async () => {
  const { orgId } = auth()

  if (!orgId) return false

  const orgSubscription = await db.orgSubscription.findUnique({
    where: {
      orgId
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true
    }
  })

  if (!orgSubscription) return false

  const isValid =
    orgSubscription.stripePriceId &&
    orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

  return !!isValid
}
