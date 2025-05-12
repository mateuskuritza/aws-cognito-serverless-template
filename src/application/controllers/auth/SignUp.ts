import { SignUpCommand, UsernameExistsException } from "@aws-sdk/client-cognito-identity-provider"
import { cognitoClient } from "../../clients/cognitoClient"
import { IController } from "../../types/IController"
import { IHttpRequest, IHttpResponse } from "../../types/IHttp"
import { HttpError } from "../../errors/HttpError"

export interface ISignUpController {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export class SignUpController implements IController<ISignUpController> {
    async handler(request: IHttpRequest<ISignUpController>): Promise<IHttpResponse> {
        try {
            const { email, password, firstName, lastName } = request.body

            const command = new SignUpCommand({
                ClientId: process.env.COGNITO_CLIENT_ID,
                Username: email,
                Password: password,
                UserAttributes: [
                    {
                        Name: "given_name",
                        Value: firstName
                    },
                    {
                        Name: "family_name",
                        Value: lastName
                    }
                ]
            })

            const { UserSub } = await cognitoClient.send(command)


            return {
                statusCode: 201,
                body: {
                    message: "User created successfully",
                    user: {
                        id: UserSub
                    }
                }
            }
        } catch (error) {
            if (error instanceof UsernameExistsException) {
                throw new HttpError(409, "User already exists")

            }

            throw error
        }
    }
}
