import { ForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider"
import { cognitoClient } from "../../clients/cognitoClient"
import { IController } from "../../types/IController"
import { IHttpRequest, IHttpResponse } from "../../types/IHttp"

export interface IForgotPasswordController {
  email: string;
}

export class ForgotPasswordController implements IController<IForgotPasswordController> {
    async handler(request: IHttpRequest<IForgotPasswordController>): Promise<IHttpResponse> {
        const { email } = request.body

        const command = new ForgotPasswordCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: email,
        })

        await cognitoClient.send(command)

        return {
            statusCode: 204,
        }
    }
}
