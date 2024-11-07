export type FieldError = {
    error: string;
    field: string;
};

export type ApiResponse<T = {}> = {
    data: T;
    messages: string[];
    fieldsErrors: FieldError[];
    resultCode: number;
};
