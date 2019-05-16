import RootStore from "./rootStore";
import { observable } from "mobx";

export default class filterStore {
    private rootStore: RootStore;
    @observable public isFilter = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }
}