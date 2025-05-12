import { middyRouteAdapter } from "../../middyRouteAdapter"
import { z } from "zod"
import { ForgotPasswordController, IForgotPasswordController } from "../../../../application/controllers/auth/ForgotPassword"

const forgotPasswordSchema = z.object({
    email: z.string().email(),
})

forgotPasswordSchema._type satisfies IForgotPasswordController

type IForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>

export const handler = middyRouteAdapter<IForgotPasswordSchema>(new ForgotPasswordController(), forgotPasswordSchema)
