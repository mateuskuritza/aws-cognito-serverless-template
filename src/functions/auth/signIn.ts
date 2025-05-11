import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda"
import { response } from "../../utils/response"
import { bodyParser } from "../../utils/bodyParser"
import { InitiateAuthCommand, UserNotConfirmedException, UserNotFoundException } from "@aws-sdk/client-cognito-identity-provider"
import { cognitoClient } from "../../libs/cognitoClient"

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    try {
        const { email, password } = bodyParser(event.body)

        const command = new InitiateAuthCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            AuthFlow: "USER_PASSWORD_AUTH",
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password
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
                refreshToken: AuthenticationResult.RefreshToken,
            }
        })
    } catch(error) {
        console.error("Sign in error:", error)

        if(error instanceof UserNotFoundException) {
            return response(401, {
                message: "Invalid credentials"
            })
        }

        if(error instanceof UserNotConfirmedException) {
            return response(401, {
                message: "Confirm your account before signing in"
            })
        }

        return response(500, {
            message: "Internal server error"
        })
    }
}
