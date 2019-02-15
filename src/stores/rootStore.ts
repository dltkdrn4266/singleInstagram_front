import Axios, {AxiosInstance} from "axios";
import PostStore from "./postStore";

export default class RootStore {
    public axiosStore: AxiosInstance;
    public postStore: PostStore

    constructor(){
        this.axiosStore = Axios.create({
            baseURL: 'http://localhost:8000/'
        });
        this.postStore = new PostStore(this);
    }
}

const STORE_NAME = 'rootStore';

export interface IStoreInjectedProps {
    [STORE_NAME]?: RootStore;
}

export {RootStore, STORE_NAME};