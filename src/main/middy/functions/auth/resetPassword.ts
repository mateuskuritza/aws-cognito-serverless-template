import { middyRouteAdapter } from "../../middyRouteAdapter"
import { z } from "zod"
import { IResetPasswordController, ResetPasswordController } from "../../../../application/controllers/auth/ResetPassword"

const resetPasswordSchema = z.object({
    email: z.string().email(),
    code: z.string().min(1),
    newPassword: z.string().min(8),
})

resetPasswordSchema._type satisfies IResetPasswordController

type IResetPasswordSchema = z.infer<typeof resetPasswordSchema>

export const handler = middyRouteAdapter<IResetPasswordSchema>(new ResetPasswordController(), resetPasswordSchema)
