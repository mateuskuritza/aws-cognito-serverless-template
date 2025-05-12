import { makeHandler } from "../../middy/makeHandler"
import { z } from "zod"
import { ForgotPasswordController, IForgotPasswordController } from "../../../application/controllers/auth/ForgotPassword"

const forgotPasswordSchema = z.object({
    email: z.string().email(),
})

forgotPasswordSchema._type satisfies IForgotPasswordController

type IForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>

export const handler = makeHandler<IForgotPasswordSchema>(new ForgotPasswordController(), forgotPasswordSchema)
