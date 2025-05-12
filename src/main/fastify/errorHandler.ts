import { FastifyError, FastifyReply, FastifyRequest } from "fastify"
import { HttpError } from "../../application/errors/HttpError"

export function errorHandler(error: FastifyError, _request: FastifyRequest<any>, reply: FastifyReply) {
    if (error && (error instanceof HttpError || "statusCode" in error)) {
        reply.status(error.statusCode || 500).send({ message: error?.message })
    } else {
        console.error("Unknown error:", error)
        reply.status(500).send({ message: "Internal server error" })
    }
}
