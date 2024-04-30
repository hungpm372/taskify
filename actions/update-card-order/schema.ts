import { z } from 'zod'

export const UpdateCardOrder = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      listId: z.string()
    })
  ),
  boardId: z.string()
})
