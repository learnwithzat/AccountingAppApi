export declare const successResponse: (data: any, message?: string) => {
    success: boolean;
    message: string;
    data: any;
};
export declare const errorResponse: (message?: string) => {
    success: boolean;
    message: string;
};
