import Axios, {AxiosInstance} from "axios";
import PostStore from "./postStore";
import {configure} from "mobx";
import LoadingStore from "./loadingStore";
import {ENV_CONSTANTS} from "../constants";
import CommentStore from "./commentStore";


configure({
    enforceActions: 'observed'
});

export default class RootStore {
    public axiosStore: AxiosInstance;
    public postStore: PostStore
    public loadingStore: LoadingStore;
    public commentStore: CommentStore

    constructor(){
        this.axiosStore = Axios.create({
            baseURL: ENV_CONSTANTS.baseURL
        });
        this.postStore = new PostStore(this);
        this.loadingStore = new LoadingStore(this);
        this.commentStore = new CommentStore(this);
    }
}

const STORE_NAME = 'rootStore';

export interface IStoreInjectedProps {
    [STORE_NAME]?: RootStore;
}

export {RootStore, STORE_NAME};