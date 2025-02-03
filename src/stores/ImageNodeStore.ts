import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

/**
 * The class that stores attributes for image nodes, extends NodeStore
 */
export class ImageNodeStore extends NodeStore {

    constructor(initializer: Partial<ImageNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    @observable
    public title: string | undefined;

    @observable
    public url: string | undefined;

    @observable
    public alt: string | undefined;
}