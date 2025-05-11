import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda"
import { response } from "../../utils/response"
import { bodyParser } from "../../utils/bodyParser"
import { ConfirmSignUpCommand } from "@aws-sdk/client-cognito-identity-provider"
import { cognitoClient } from "../../libs/cognitoClient"

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    try {
        const { email, code } = bodyParser(event.body)

        const command = new ConfirmSignUpCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: email,
            ConfirmationCode: code,
        })

        await cognitoClient.send(command)

        return response(204)
    } catch(error) {
        console.error("Acount confirmation error:", error)
        return response(500, {
            message: "Internal server error"
        })
    }
}
