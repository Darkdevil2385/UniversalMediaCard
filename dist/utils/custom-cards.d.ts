export interface RegisterCardParams {
    type: string;
    name: string;
    description?: string;
}
declare global {
    interface Window {
        customCards?: Array<RegisterCardParams>;
    }
}
export declare function registerCustomCard(params: RegisterCardParams): void;
