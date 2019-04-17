import {IUserSerializer} from "./user";

export interface IPostSerializer {
    id: number,
    user: IUserSerializer,
    photos: string,
    latitude: number,
    longitude: number,
    like: boolean,
    content: string,
    created_at: string
}