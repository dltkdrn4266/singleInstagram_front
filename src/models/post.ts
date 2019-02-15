import {IUserSerializer} from "./user";

export interface IPostSerializer {
    id: number,
    user: IUserSerializer,
    photos: string,
    like: number,
    content: string,
    created_at: string
}