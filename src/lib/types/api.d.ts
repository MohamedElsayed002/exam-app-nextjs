

declare type SuccessfulResponse<T> = {
    // status : 'success',
    message : 'success',
    token : string,
    // statusCode : number,
    data : T
}

declare type ErrorResponse<T> = {
    // status: 'error' | 'fail',
    // statusCode : number
    code : number,
    message : string
}


declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse