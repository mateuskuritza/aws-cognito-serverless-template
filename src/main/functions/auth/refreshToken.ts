import { makeHandler } from "../../middy/makeHandler"
import { z } from "zod"
import { IRefreshTokenController, RefreshTokenController } from "../../../application/controllers/auth/RefreshToken"

const refreshTokenSchema = z.object({
    refreshToken: z.string().min(1),
})

refreshTokenSchema._type satisfies IRefreshTokenController

type IRefreshTokenSchema = z.infer<typeof refreshTokenSchema>

export const handler = makeHandler<IRefreshTokenSchema>(new RefreshTokenController(), refreshTokenSchema)
