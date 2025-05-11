import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda"
import { response } from "../../utils/response"
import { bodyParser } from "../../utils/bodyParser"
import { ForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider"
import { cognitoClient } from "../../libs/cognitoClient"

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    try {
        const { email } = bodyParser(event.body)

        const command = new ForgotPasswordCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: email,
        })

        await cognitoClient.send(command)

        return response(204)
    } catch(error) {
        console.error("Error sending password reset code:", error)
        return response(500, {
            message: "Internal server error"
        })
    }
}
