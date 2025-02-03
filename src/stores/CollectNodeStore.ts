import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

/**
 * The class that stores attributes for collection nodes, extends NodeStore
 */
export class CollectNodeStore extends NodeStore {

    constructor(initializer: Partial<CollectNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    @observable
    public title: string | undefined;

    public url: string | undefined;

}