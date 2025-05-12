import { CustomMessageTriggerEvent } from "aws-lambda"

/**
  * Should return the event to continue the authentication flow
  * You can modify the event object to customize the message sent to the user
  * For example, you can change the message body or subject
  * Here, we can customize email contents using some template engine like handlebars
  *
  * @param event - The event object containing information about the trigger.
  * @returns The modified event object.
 */
export async function handler(event: CustomMessageTriggerEvent): Promise<CustomMessageTriggerEvent> {
    const triggerSource = event.triggerSource
    const name = event.request.userAttributes?.given_name

    if(triggerSource === "CustomMessage_SignUp"){
        event.response.emailSubject = "Welcome to our service!"
        event.response.emailMessage = name ? `<h1>Hello ${name}</h1><br/><br/>Welcome to our service!` : "Hello, welcome to our service!"
    }

    if(triggerSource === "CustomMessage_ForgotPassword"){
        const link = `https://example.com/reset-password?code=${event.request.codeParameter}`
        event.response.emailSubject = "Password Reset Code"
        event.response.emailMessage = name ? `Hello ${name}, here is your password recovery link: <strong>${link}</strong>` : `Hello, here is your password recovery link: <strong>${link}</strong>`
    }

    return event
}
