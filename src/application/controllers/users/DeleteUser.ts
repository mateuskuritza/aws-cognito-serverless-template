import { IController } from "../../types/IController"
import { IHttpRequest, IHttpResponse } from "../../types/IHttp"

export class DeleteUserController implements IController {
    async handler(request: IHttpRequest): Promise<IHttpResponse> {
        return {
            statusCode: 200,
            body: {
                message: "User deleted successfully",
                userId: request.params?.userId,
            }
        }
    }
}
