export interface IResponse<T = any> {
    code: number;
    success: boolean;
    message?: string;
    data?: T;
}
