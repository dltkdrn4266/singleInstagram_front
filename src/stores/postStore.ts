import RootStore from './rootStore';
import {IPostSerializer} from "../models";
import {action, observable} from "mobx";

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
    }
}