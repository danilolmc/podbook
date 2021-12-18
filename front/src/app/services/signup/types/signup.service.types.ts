export interface SignupRequestData {
    name: string,
    email: string,
    password: string
}

export interface SignupResponseData {
    body: Body,
    headers: Headers,
    user: {
        id: number,
        name: string,
        email: string
    },
    auth: boolean,
    token: string
}