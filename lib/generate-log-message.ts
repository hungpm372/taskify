/**
 * @author Phan Minh Hung
 * @email hungpm372@gmail.com
 * @create date 2024-05-01 17:46:38
 * @modify date 2024-05-01 17:46:38
 * @desc I am a student of information technology
 * @github https://github.com/hungpm372
 */
import { ACTION, AuditLog } from '@prisma/client'

export const generateLogMessage = ({ action, entityTitle, entityType }: AuditLog) => {
  switch (action) {
    case ACTION.CREATE:
      return `created ${entityType.toLowerCase()} "${entityTitle}"`
    case ACTION.UPDATE:
      return `updated ${entityType.toLowerCase()} "${entityTitle}"`
    case ACTION.DELETE:
      return `deleted ${entityType.toLowerCase()} "${entityTitle}"`
    default:
      return `unknown action on ${entityType.toLowerCase()} "${entityTitle}"`
  }
}
