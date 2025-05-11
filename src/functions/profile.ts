import { APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyResultV2 } from "aws-lambda"
import { response } from "../utils/response"
import { AdminGetUserCommand } from "@aws-sdk/client-cognito-identity-provider"
import { cognitoClient } from "../libs/cognitoClient"

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer): Promise<APIGatewayProxyResultV2> {
    try {
        const userId = event.requestContext.authorizer.jwt.claims.sub

        const command = new AdminGetUserCommand({
            Username: String(userId),
            UserPoolId: process.env.COGNITO_USER_POOL_ID,
        })

        const { UserAttributes } = await cognitoClient.send(command)

        return response(200, {
            message: "Hello, world!",
            user: {
                id: userId,
                ...UserAttributes
            }
        })
    }catch(error){
        console.error("Error fetching user data:", error)
        return response(500, {
            message: "Internal server error",
            error: error
        })
    }
}
