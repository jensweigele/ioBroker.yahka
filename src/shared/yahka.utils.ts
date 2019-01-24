
export function propertyExists<T>(object: any, property: keyof T) {
    return property in object;
}