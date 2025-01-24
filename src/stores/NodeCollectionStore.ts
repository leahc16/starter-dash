import { computed, observable, action } from "mobx";
import { NodeStore } from "./NodeStore";

export class NodeCollectionStore extends NodeStore {

    @observable
    public nodes: NodeStore[] = new Array<NodeStore>();

    @computed
    public get transform(): string {
        return "translate(" + this.x + "px," + this.y + "px)"; // for CSS transform property
    } 

  /*  @computed
    public get resize(): string {
        return "scale(" + this.newWidth / this.width + ", " + this.newHeight / this.height + ")"; 
    } */

    @action
    public addNodes(stores: NodeStore[]): void {
        this.nodes.push(...stores); // This is equivalent to: stores.forEach(store => this.nodes.push(store));

    }
}