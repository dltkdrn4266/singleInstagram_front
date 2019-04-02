import {IUserSerializer} from "./user";

export interface IPostSerializer {
    id: number,
    user: IUserSerializer,
    photos: string,
    latitude: string,
    longitude: string,
    like: boolean,
    content: string,
    created_at: string
}