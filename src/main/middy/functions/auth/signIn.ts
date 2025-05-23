import { middyRouteAdapter } from "../../middyRouteAdapter"
import { z } from "zod"
import { ISignInController, SignInController } from "../../../../application/controllers/auth/SignIn"

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

signInSchema._type satisfies ISignInController

type ISignInSchema = z.infer<typeof signInSchema>

export const handler = middyRouteAdapter<ISignInSchema>(new SignInController(), signInSchema)
