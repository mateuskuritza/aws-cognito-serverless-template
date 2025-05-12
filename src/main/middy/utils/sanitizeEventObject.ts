export function sanitizeEventObject(obj: Record<string, string | undefined> = {}): Record<string,string>{
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if(!value) return acc

        return {
            ...acc,
            [key]: value
        }
    }, {})
}
