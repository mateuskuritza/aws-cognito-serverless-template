import { z } from "zod"
import { AccountConfirmationController, IAccountConfirmationController } from "../../../../application/controllers/auth/AccountConfirmation"
import { middyRouteAdapter } from "../../middyRouteAdapter"

const accountConfirmationSchema = z.object({
    email: z.string().email(),
    code: z.string().min(1),
})

accountConfirmationSchema._type satisfies IAccountConfirmationController

type IAccountConfirmationSchema = z.infer<typeof accountConfirmationSchema>

export const handler = middyRouteAdapter<IAccountConfirmationSchema>(new AccountConfirmationController(), accountConfirmationSchema)
