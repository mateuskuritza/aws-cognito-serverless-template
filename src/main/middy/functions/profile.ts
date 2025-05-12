import { APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyResultV2 } from "aws-lambda"
import { AdminGetUserCommand } from "@aws-sdk/client-cognito-identity-provider"
import { cognitoClient } from "../../../application/clients/cognitoClient"

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer): Promise<APIGatewayProxyResultV2> {
    try {
        const userId = event.requestContext.authorizer.jwt.claims.sub

        const command = new AdminGetUserCommand({
            Username: String(userId),
            UserPoolId: process.env.COGNITO_USER_POOL_ID,
        })

        const { UserAttributes } = await cognitoClient.send(command)

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Hello, world!",
                user: {
                    id: userId,
                    ...UserAttributes
                }
            })
        }
    }catch(error){
        console.error("Error fetching user data:", error)
        return {
            body: "Error",
            statusCode: 500
        }
    }
}
