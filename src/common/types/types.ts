export type FieldError = {
    error: string;
    field: string;
};

export type BaseResponse<D> = {
    resultCode: number;
    messages: string[];
    fieldsErrors: FieldError[];
    data: D;
};

export type ApiResponse<T = {}> = {
    data: { item: T };
    messages: string[];
    fieldsErrors: FieldError[];
    resultCode: number;
};
