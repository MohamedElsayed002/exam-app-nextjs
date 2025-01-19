
declare type User =  {
    // id: string;
    username : string;
    email : string;
    firstName : string;
    lastName : string;
    // fullName : string;
    role : string;
    photo ?: string;
    isVerified : boolean;
    blocked : string;
}  & DatabaseFields

declare interface LoginResponse {
    token : string
    user : User
}