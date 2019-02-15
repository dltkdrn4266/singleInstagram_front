import RootStore from './rootStore';

export default class postStore {
    private rootStore: RootStore;

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }
}