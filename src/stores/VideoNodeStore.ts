import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

/**
 * The class that stores attributes for video nodes, extends NodeStore
 */
export class VideoNodeStore extends NodeStore {

    constructor(initializer: Partial<VideoNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    @observable
    public title: string | undefined;

    @observable
    public url: string | undefined;

}