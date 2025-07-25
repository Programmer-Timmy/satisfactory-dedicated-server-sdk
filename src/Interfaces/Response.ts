export interface Response {
    success: boolean;
    data: Record<string, any> | string | Uint8Array;
}
