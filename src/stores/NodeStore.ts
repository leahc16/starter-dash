import { computed, observable, action } from "mobx";
import { Utils } from "../Utils";

/**
 * Enums for each type of node
 */
export enum StoreType {
    Text, 
    Video,
    Website,
    Image,
    EditText,
    Collection
}

/**
 * The NodeStore class, holds the properties of a Node
 * and the general methods that apply to a single Node
 * and is the class all Nodes extend from
 */
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
    public links: NodeStore[] = []; 
    
    @observable
    public static numNode: number = 0;

    @observable
    public id: number = NodeStore.numNode;


    /**
    * A CSS styling property to translate each node
    * along a mouse movement, returns a string
    */
    @computed
    public get transform(): string {
        return "translate(" + this.x + "px, " + this.y + "px)"; 
    } 

    /**
     * A CSS styling property to resize each node
     * using scale and mouse movement, returns a
     * string
     */
    @computed
    public get resize(): string {
        return "scale(" + this.newWidth / this.width + ", " + this.newHeight / this.height + ")"; 
    } 

    /**
     * A method to link one Node to another
     * @param node , the node being passed in will be linked to the node that calls the method
     */
    @action
    public linkTo(node: NodeStore) {
        this.links.push(node);
    }
}