import middy from "@middy/core"
import httpBodyParser from "@middy/http-json-body-parser"
import httpResponseSerializer from "@middy/http-response-serializer"
import httpMultipartBodyParser from "@middy/http-multipart-body-parser"
import { errorHandler } from "./middlewares/errorHandler"
import { validationHandler } from "./middlewares/validationHandler"
import { z } from "zod"
import { IController } from "../../application/types/IController"
import { sanitizeEventObject } from "./utils/sanitizeEventObject"

export function makeHandler<RequestBody extends Record<string, unknown> | undefined = undefined>(controller: IController<RequestBody>, schema?: z.ZodType<RequestBody>) {
    return middy()
        .use(errorHandler())
        .use(httpBodyParser({
            disableContentTypeError: true
        }))
        .use(validationHandler<RequestBody>(schema))
        .use(httpMultipartBodyParser({
            disableContentTypeError: true,
        }))
        .use(httpResponseSerializer({
            defaultContentType: "application/json",
            serializers: [
                {
                    regex: /^application\/json$/,
                    serializer: ({ body }) => JSON.stringify(body)
                }
            ]
        }))
        .handler(async (event) =>{
            return controller.handler({
                body: event.body,
                headers: sanitizeEventObject(event.headers),
                params: sanitizeEventObject(event.pathParameters),
            })
        })
}
