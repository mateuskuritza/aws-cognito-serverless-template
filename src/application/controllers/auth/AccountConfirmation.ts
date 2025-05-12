import { ConfirmSignUpCommand } from "@aws-sdk/client-cognito-identity-provider"
import { cognitoClient } from "../../clients/cognitoClient"
import { IController } from "../../types/IController"
import { IHttpRequest, IHttpResponse } from "../../types/IHttp"

export interface IAccountConfirmationController {
  email: string;
  code: string;
}

export class AccountConfirmationController implements IController<IAccountConfirmationController> {
    async handler(request: IHttpRequest<IAccountConfirmationController>): Promise<IHttpResponse> {
        const { email, code } = request.body

        const command = new ConfirmSignUpCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: email,
            ConfirmationCode: code,
        })

        await cognitoClient.send(command)

        return {
            statusCode: 204,
        }
    }
}
