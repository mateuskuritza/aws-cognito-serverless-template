import { MiddlewareObj } from "@middy/core"
import { APIGatewayProxyEventV2 } from "aws-lambda"
import { z } from "zod"
import { bodyParser } from "../../../utils/bodyParser"
import { HttpError } from "../../../application/errors/HttpError"

export function validationHandler<ValidationOutput extends Record<string, unknown> | undefined>(schema?: z.Schema<ValidationOutput>): MiddlewareObj<APIGatewayProxyEventV2> {
    return {
        before: (request) => {
            if (!schema || !request.event.body) {
                return request
            }

            const body = bodyParser(request.event.body)

            const { success, data, error } = schema.safeParse(body)

            if (!success) {
                throw new HttpError(400, {
                    message: "Invalid request",
                    errors: error.issues.map((issue) => issue.message)
                })
            }

            request.event.body = data as any

            return request
        },
    }
}
