import RootStore from "./rootStore";
import {ICommentSerializer, IPostSerializer} from "../models";
import {ENV_CONSTANTS} from "../constants";
import {action} from "mobx";

export default class CommentStore {

    private rootStore: RootStore;
    public commentList: ICommentSerializer[];

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.commentList = [];
    }

    @action
    public setCommentList = (data: ICommentSerializer[]) => {
        this.commentList = data;
    };

    public getCommentList = async() => {
        try {
            this.rootStore.loadingStore.startLoading();
            const response = await this.rootStore.axiosStore.get<ICommentSerializer[]>('/instagram/comments/', {
                auth: ENV_CONSTANTS.auth
            });
            console.log(response.data);
            this.rootStore.commentStore.setCommentList(response.data);
            this.rootStore.loadingStore.endLoading();
        } catch (error) {
            console.log(error);
        }
    };
}

