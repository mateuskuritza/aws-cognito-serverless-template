import { MiddlewareObj } from "@middy/core"
import { APIGatewayProxyEventV2 } from "aws-lambda"
import { HttpError } from "../../../application/errors/HttpError"

export function errorHandler(): MiddlewareObj<APIGatewayProxyEventV2> {
    return {
    // before: () => {},
    // after: () => {},
        onError: (request) => {
            const { error } = request
            if (error && (error instanceof HttpError || "statusCode" in error)) {
                request.response = {
                    ...request.response,
                    statusCode: error.statusCode,
                    body: error?.message,
                    headers: {
                        ...request.response?.headers,
                        "Content-Type": "application/json"
                    }
                }
            } else {
                console.error("Unknown error:", error)
                request.response = {
                    ...request.response,
                    statusCode: 500,
                    body: JSON.stringify({
                        message: "Internal server error",
                    }),
                    headers: {
                        ...request.response?.headers,
                        "Content-Type": "application/json"
                    }
                }
            }
        }
    }
}
