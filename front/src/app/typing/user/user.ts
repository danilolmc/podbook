export interface UserToken {
    user_id: number,
    email: string
}
export interface UserRawData extends UserToken{
    name: string;
}