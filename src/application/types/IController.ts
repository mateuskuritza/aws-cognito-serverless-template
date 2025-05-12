import { IHttpRequest, IHttpResponse } from "./IHttp"

export interface IController<
  IBody extends Record<string, any> | undefined = undefined> {
  handler(request: IHttpRequest<IBody>): Promise<IHttpResponse>;
}
