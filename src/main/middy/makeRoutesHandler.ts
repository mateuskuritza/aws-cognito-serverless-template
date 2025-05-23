import middy from "@middy/core"
import httpRouterHandler, { Route } from "@middy/http-router"
import { errorHandler } from "./middlewares/errorHandler"

export function makeRoutesHandler(routes: Route<any,any>[]) {
    return middy()
        .use(errorHandler())
        .handler(httpRouterHandler(routes))
}
