import RootStore from "./rootStore";
import {action, observable} from "mobx";

export default class loadingStore {
    private rootStore: RootStore;
    @observable isLoading: boolean;

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
        this.isLoading = false;
    };

    @action
    public startLoading = () => {
        this.isLoading = true;
    };

    @action
    public endLoading = () => {
        this.isLoading = false;
    };
}