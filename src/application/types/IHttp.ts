
export interface IHttpRequest<
IBody extends Record<string, any> | undefined = undefined,
> {
  body: IBody;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

export interface IHttpResponse {
  statusCode: number;
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
}
