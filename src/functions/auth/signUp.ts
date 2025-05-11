import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda"
import { response } from "../../utils/response"
import { bodyParser } from "../../utils/bodyParser"
import { SignUpCommand, UsernameExistsException } from "@aws-sdk/client-cognito-identity-provider"
import { cognitoClient } from "../../libs/cognitoClient"

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    try {
        const body = bodyParser(event.body)

        const command = new SignUpCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: body.username,
            Password: body.password,
            UserAttributes: [
                {
                    Name: "given_name",
                    Value: body.firstName
                },
                {
                    Name: "family_name",
                    Value: body.lastName
                }
            ]
        })

        const { UserSub } = await cognitoClient.send(command)

        return response(201, {
            message: "User created successfully",
            user: {
                id: UserSub
            }
        })
    } catch(error) {
        console.error("Sign up error:", error)

        if(error instanceof UsernameExistsException) {
            return response(409, {
                message: "Email already exists"
            })
        }

        return response(500, {
            message: "Internal server error"
        })
    }
}
