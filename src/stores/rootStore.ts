import Axios, {AxiosInstance} from "axios";
import PostStore from "./postStore";
import {configure} from "mobx";


configure({
    enforceActions: 'observed'
});

export default class RootStore {
    public axiosStore: AxiosInstance;
    public postStore: PostStore

    constructor(){
        this.axiosStore = Axios.create({
            baseURL: 'http://sanggulee.pythonanywhere.com/'
        });
        this.postStore = new PostStore(this);
    }
}

const STORE_NAME = 'rootStore';

export interface IStoreInjectedProps {
    [STORE_NAME]?: RootStore;
}

export {RootStore, STORE_NAME};