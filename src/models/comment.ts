import {IUserSerializer} from "./user";

export interface ICommentSerializer {
    id: number;
    user: IUserSerializer;
    post: number;
    content: string;
    created_at: string;
}