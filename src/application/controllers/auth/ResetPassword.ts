import { ConfirmForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider"
import { cognitoClient } from "../../clients/cognitoClient"
import { IController } from "../../types/IController"
import { IHttpRequest, IHttpResponse } from "../../types/IHttp"

export interface IResetPasswordController {
  email: string;
  code: string;
  newPassword: string;
}

export class ResetPasswordController implements IController<IResetPasswordController> {
    async handler(request: IHttpRequest<IResetPasswordController>): Promise<IHttpResponse> {
        const { email, code, newPassword } = request.body

        const command = new ConfirmForgotPasswordCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: email,
            ConfirmationCode: code,
            Password: newPassword,
        })

        await cognitoClient.send(command)

        return {
            statusCode: 204,
        }
    }
}
