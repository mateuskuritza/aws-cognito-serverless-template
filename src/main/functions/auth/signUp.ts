import { makeHandler } from "../../middy/makeHandler"
import { ISignUpController, SignUpController } from "../../../application/controllers/auth/SignUp"
import { z } from "zod"

const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
})

signUpSchema._type satisfies ISignUpController

type ISignUpSchema = z.infer<typeof signUpSchema>

export const handler = makeHandler<ISignUpSchema>(new SignUpController(), signUpSchema)
