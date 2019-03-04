import {IUserSerializer} from "./user";

export interface ICommentSerializer {
    id: number;
    user: IUserSerializer;
    postNumber: number;
    content: string;
    created_at: string;
}