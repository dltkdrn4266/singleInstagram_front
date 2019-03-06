import RootStore from "./rootStore";
import {ICommentSerializer} from "../models";
import {ENV_CONSTANTS} from "../constants";
import {action, observable} from "mobx";

export default class CommentStore {

    private rootStore: RootStore;
    @observable public commentList: ICommentSerializer[];

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.commentList = [];
    }

    @action
    public setCommentList = (data: ICommentSerializer[]) => {
        console.log('data');
        console.log(data);
        this.commentList = data;
    };

    public getCommentList = async() => {
        try {
            this.rootStore.loadingStore.startLoading();
            const response = await this.rootStore.axiosStore.get<ICommentSerializer[]>('/instagram/comments/', {
                auth: ENV_CONSTANTS.auth
            });
            this.rootStore.commentStore.setCommentList(response.data);
            this.rootStore.loadingStore.endLoading();
            console.log('end getCommentList');
        } catch (error) {
            console.log(error);
        }
    };
}

