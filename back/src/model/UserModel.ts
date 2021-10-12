export interface UserModel{
    name: string;
    email: string;
    password: string;
}

export interface UserResponse{
    id: number;
    name: string;
    email: string;
    token: string;
}

export interface LoginModel{
    email: string;
    password: string;
}

export interface UserPublicData{
    id: number;
    name: string;
    email: string;
}
