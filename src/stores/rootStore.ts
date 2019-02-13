import Axios, {AxiosInstance} from "axios";

export default class RootStore {
    public axiosStore: AxiosInstance;

    constructor(){
        this.axiosStore = Axios.create({
            baseURL: ''
        })
    }
}

const STORE_NAME = 'rootStore';

export interface IStoreInjectedProps {
    [STORE_NAME]?: RootStore;
}

export {RootStore, STORE_NAME};