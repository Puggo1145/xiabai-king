export interface IResponse<T = any> {
    code: string;
    success: boolean;
    message?: string;
    data?: T;
}
