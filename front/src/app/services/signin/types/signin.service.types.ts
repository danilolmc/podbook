export interface SignInRequestData {
    email: string,
    password: string,
}

export interface SignInResponseData {
   
    auth: boolean,
    token: string
}