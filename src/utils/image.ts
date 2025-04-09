import { LocalFile } from "../types/image"

export const convertFileToBase64 = (file: File): Promise<LocalFile> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            resolve({
                name: file.name,
                size: file.size,
                type: file.type,
                base64: reader.result as string,
            })
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}

export const extractBase64Type = (base64: string): string => {
    const match = base64.match(/^data:(.*?);base64,/)
    return match?.[1] ?? 'base64'
}

export const estimateBase64Size = (base64: string): number => {
    const base64Str = base64.split(',')[1] ?? '';
    const padding = (base64Str.match(/=+$/) || [''])[0].length;
    return Math.ceil((base64Str.length * 3) / 4) - padding;
}

export const formatSize = (size: number): string => {
    if (size === 0) return "-";
    return size < 1024 * 1024
        ? `${(size / 1024).toFixed(1)} KB`
        : `${(size / (1024 * 1024)).toFixed(1)} MB`;
}
