export default function splitStringWithoutEmpty(str: string, delimiter: string): string[] {
    return str.split(new RegExp(delimiter + "+")).filter(Boolean)
}