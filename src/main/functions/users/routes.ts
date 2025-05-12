// Sometimes we want to group n lambda functions together to decrease cold start time.
// Usually, we do this by creating a single lambda function that handles multiple routes.
// This is a good practice when the routes are related, e.g. all routes called to load the same dashboard in cascade.

import { DeleteUserController } from "../../../application/controllers/users/DeleteUser"
import { ListUsersController } from "../../../application/controllers/users/ListUsers"
import { makeHandler } from "../../middy/makeHandler"
import { makeRoutesHandler } from "../../middy/makeRoutesHandler"

export const handler = makeRoutesHandler([
    {
        method: "GET",
        path: "/users",
        handler: makeHandler(new ListUsersController())
    },
    {
        method: "DELETE",
        path: "/users/{userId}",
        handler: makeHandler(new DeleteUserController())
    }
])
