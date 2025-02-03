import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

/**
 * The class that stores attributes for website nodes, extends NodeStore
 */
export class WebsiteNodeStore extends NodeStore {

    constructor(initializer: Partial<WebsiteNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    @observable
    public title: string | undefined;

    @observable
    public url: string | undefined;

}