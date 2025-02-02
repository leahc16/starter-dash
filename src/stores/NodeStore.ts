import { computed, observable, action } from "mobx";
import { Utils } from "../Utils";

export enum StoreType {
    Text, 
    Video,
    Website,
    Image,
    EditText,
    Collection
}

export class NodeStore {
    public Id: string = Utils.GenerateGuid();

    public type: StoreType | null = null;

    @observable
    public x: number = 0;

    @observable
    public y: number = 0;

    @observable
    public width: number = 0;

    @observable
    public height: number = 0; 

    @observable
    public newWidth: number = 0;

    @observable
    public newHeight: number = 0;

    @observable 
    public links: NodeStore[] = []; // Stores linked nodes

    @observable
    public static numNode: number = 0;

    @observable
    public id: number = NodeStore.numNode;


    @computed
    public get transform(): string {
        return "translate(" + this.x + "px, " + this.y + "px)"; 
    } 

    @computed
    public get resize(): string {
        return "scale(" + this.newWidth / this.width + ", " + this.newHeight / this.height + ")"; 
    } 
    @action
    public linkTo(node: NodeStore) {
      //  if (!this.links.includes(node)) {
            this.links.push(node);
      //  }
    }
    

}