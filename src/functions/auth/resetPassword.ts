import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda"
import { response } from "../../utils/response"
import { bodyParser } from "../../utils/bodyParser"
import { ConfirmForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider"
import { cognitoClient } from "../../libs/cognitoClient"

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    try {
        const { email, code, newPassword } = bodyParser(event.body)

        const command = new ConfirmForgotPasswordCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: email,
            ConfirmationCode: code,
            Password: newPassword,
        })

        await cognitoClient.send(command)

        return response(204)
    } catch(error) {
        console.error("Error resetting password:", error)
        return response(500, {
            message: "Internal server error"
        })
    }
}
