export function bodyParser(body: string) {
    try {
        return JSON.parse(body)
    } catch (error) {
        console.error("Error parsing body:", error)
        return {}
    }
}
