import { FastifyReply, FastifyRequest } from "fastify"
import { IController } from "../../application/types/IController"
import { sanitizeObject } from "../../utils/sanitizeObject"
import { z } from "zod"
import { HttpError } from "../../application/errors/HttpError"

export function fastifyRouteAdapter<RequestBody extends Record<string, unknown> | undefined = undefined>(controller: IController<RequestBody>, schema?: z.ZodType<RequestBody>) {
    return async (request: FastifyRequest<{
    Body?: Record<string,any> | undefined,
    Params: Record<string,string>,
    headers: Record<string,string>,
  }>, reply: FastifyReply) => {
        let body = request.body as RequestBody
        if (schema && body) {
            const { success, data, error } = schema.safeParse(body)
            if (!success) {
                throw new HttpError(400, {
                    message: "Invalid request",
                    errors: error.issues.map((issue) => issue.message)
                })
            }
            body = data
        }

        const { statusCode,body: responseBody,headers = {} } = await controller.handler({
            body,
            headers: sanitizeObject(request.headers),
            params: sanitizeObject(request.params)
        })

        return reply.status(statusCode).send(responseBody).headers(headers)
    }
}
