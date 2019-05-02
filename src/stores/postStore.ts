import RootStore from './rootStore';
import {IPostSerializer} from "../models";
import {action, observable} from "mobx";
import {ENV_CONSTANTS} from "../constants";

export default class postStore {
    private rootStore: RootStore;
    @observable public postList: IPostSerializer[];

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
        this.postList = [];
    }

    @action
    public setPostList = (data: IPostSerializer[]) => {
        this.postList = data;
    };

    public getPostList = async() => {
        try {
            this.rootStore.loadingStore.startLoading();
            const response = await this.rootStore.axiosStore.get<IPostSerializer[]>('/instagram/posts/', {
                auth: ENV_CONSTANTS.auth
            });
            console.log(response.data);
            this.rootStore.postStore.setPostList(response.data);
            this.rootStore.loadingStore.endLoading();
        } catch (error) {
            console.log(error);
        }
    };

    public likePost = (post: IPostSerializer, data: IPostSerializer) =>{
        const tempPostList = [...this.postList];
        tempPostList.splice(tempPostList.indexOf(post), 1, data);
        this.setPostList(tempPostList);
    }
}