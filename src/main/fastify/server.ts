import Fastify from "fastify"
import { fastifyRouteAdapter } from "./fastifyRouteAdapter"
import { errorHandler } from "./errorHandler"
import { z } from "zod"
import { ISignInController, SignInController } from "../../application/controllers/auth/SignIn"

const fastify = Fastify({
    logger: true
})

// Just an adapter example, some important things to do: add middlewares for validation and error
const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})
signInSchema._type satisfies ISignInController
fastify.get("/users", fastifyRouteAdapter(new SignInController(), signInSchema))

fastify.setErrorHandler(errorHandler)

fastify.listen({ port: 3000 }, (err) => {
    if(err){
        fastify.log.error(err)
        process.exit(1)
    }
})
