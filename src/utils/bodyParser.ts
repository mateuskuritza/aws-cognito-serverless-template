export function bodyParser(body?: string) {
    if (!body) return {}

    try {
        return JSON.parse(body)
    } catch (error) {
        console.error("Error parsing body:", error)
        return {}
    }
}
