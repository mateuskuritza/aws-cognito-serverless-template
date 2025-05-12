import { InitiateAuthCommand, UserNotConfirmedException, UserNotFoundException } from "@aws-sdk/client-cognito-identity-provider"
import { cognitoClient } from "../../clients/cognitoClient"
import { IController } from "../../types/IController"
import { IHttpRequest, IHttpResponse } from "../../types/IHttp"
import { HttpError } from "../../errors/HttpError"

export interface ISignInController {
  email: string;
  password: string;
}

export class SignInController implements IController<ISignInController> {
    async handler(request: IHttpRequest<ISignInController>): Promise<IHttpResponse> {
        try {
            const { email, password } = request.body

            const command = new InitiateAuthCommand({
                ClientId: process.env.COGNITO_CLIENT_ID,
                AuthFlow: "USER_PASSWORD_AUTH",
                AuthParameters: {
                    USERNAME: email,
                    PASSWORD: password
                }
            })

            const { AuthenticationResult } = await cognitoClient.send(command)

            if (!AuthenticationResult) {
                throw new HttpError(401, "Invalid Credentials")

            }

            return {
                statusCode: 200,
                body: {
                    message: "User authenticated successfully",
                    user: {
                        accessToken: AuthenticationResult.AccessToken,
                        refreshToken: AuthenticationResult.RefreshToken,
                    }
                }
            }
        } catch (error) {
            if (error instanceof UserNotFoundException) {
                throw new HttpError(401, "Invalid Credentials")

            }

            if (error instanceof UserNotConfirmedException) {
                throw new HttpError(401, "Confirm your account before signing in")
            }

            throw error
        }
    }
}
