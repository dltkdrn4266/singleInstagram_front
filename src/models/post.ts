import {IUserSerializer} from "./user";

export interface IPostSerializer {
    id: number,
    user: IUserSerializer,
    photos: string,
    like: boolean,
    content: string,
    created_at: string
}