import { InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider"
import { cognitoClient } from "../../clients/cognitoClient"
import { IController } from "../../types/IController"
import { IHttpRequest, IHttpResponse } from "../../types/IHttp"
import { HttpError } from "../../errors/HttpError"

export interface IRefreshTokenController {
  refreshToken: string;
}

export class RefreshTokenController implements IController<IRefreshTokenController> {
    async handler(request: IHttpRequest<IRefreshTokenController>): Promise<IHttpResponse> {
        const { refreshToken } = request.body

        const command = new InitiateAuthCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            AuthFlow: "REFRESH_TOKEN_AUTH",
            AuthParameters: {
                REFRESH_TOKEN: refreshToken,
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
                    refreshToken: refreshToken, // Refresh token remains the same
                }
            }
        }
    }
}
