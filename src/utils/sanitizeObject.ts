export function sanitizeObject(obj: Record<string, any> = {}): Record<string,string>{
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if(!value) return acc

        return {
            ...acc,
            [key]: value
        }
    }, {})
}
