import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda"
import { response } from "../../utils/response"
import { bodyParser } from "../../utils/bodyParser"
import { InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider"
import { cognitoClient } from "../../libs/cognitoClient"

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    try {
        const { refreshToken } = bodyParser(event.body)

        const command = new InitiateAuthCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            AuthFlow: "REFRESH_TOKEN_AUTH",
            AuthParameters: {
                REFRESH_TOKEN: refreshToken,
            }
        })

        const { AuthenticationResult } = await cognitoClient.send(command)

        if(!AuthenticationResult){
            return response(401, {
                message: "Invalid credentials"
            })
        }

        return response(200, {
            message: "User authenticated successfully",
            user: {
                accessToken: AuthenticationResult.AccessToken,
                refreshToken: refreshToken, // Refresh token remains the same
            }
        })
    } catch(error) {
        console.error("Refresh token error:", error)

        return response(500, {
            message: "Internal server error"
        })
    }
}
