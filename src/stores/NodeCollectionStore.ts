import { computed, observable, action } from "mobx";
import { NodeStore } from "./NodeStore";

/**
 * Class NodeCollectionStore holds the attributes and methods that get
 * applied to all of the nodes in the FreeFormCanvas and extends NodeStore
 */
export class NodeCollectionStore extends NodeStore {

    @observable
    public nodes: NodeStore[] = new Array<NodeStore>();

    @computed
    public get transform(): string {
        return "translate(" + this.x + "px," + this.y + "px)"; // for CSS transform property
    }

    @action
    public addNodes(stores: NodeStore[]): void {
        this.nodes.push(...stores); // This is equivalent to: stores.forEach(store => this.nodes.push(store));

    }

    /**
     * Utilizes popups to take an input from the user
     * indicating which node they would like to delete. 
     * Takes no parameters and returns void.
     * @returns void
     */
    @action
    public removeNode(): void {
        let node = prompt("Please enter the node to be deleted:", "");
        if (this.nodes.length <= 0) {
            alert("There are no nodes to delete!");
        }

        if (node === null || node === "") {
            return; 
        } 
        else {
            for (let i = 0; i < this.nodes.length; i++) {
                if (this.nodes[i].id === +node) {
                    this.nodes.splice(i, 1);
                    return;
                }
            }
            if (+node-1 > this.nodes.length || +node-1 < 0) {
                alert("That node does not exist!");
    
            }
        }
    }

    /**
     * Utilizes popups for the user to input which two nodes
     * they would like to link together. 
     * @returns void
     */
    @action
    public linkNodes(): void {
        let nodes = prompt("Please enter the nodes you want to link\nex: 1,2 with no spaces:", ""); 
        let checkExists: number = 0;

        if (this.nodes.length <= 0) {
            alert("There are no nodes to link!");
        }
        if (nodes === null || nodes === "" || nodes.length < 3) {
            return; 
        } 

        let node1: number = +nodes?.split(',')[0];
        let node2: number = +nodes?.split(',')[1];
        for(let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].id === node1 || this.nodes[i].id === node2) {
                checkExists += 1;
            }
        }
        if (checkExists !== 2) {
            alert("Please choose nodes that exist!");
            return;
        }
        else {
            this.nodes[node1-1].linkTo(this.nodes[node2-1]);
            this.nodes[node2-1].linkTo(this.nodes[node1-1]);
        }
    }

    /**
     * This method is called when a button is pressed to arrange
     * the nodes in a collection into a list from first to last node created
     */
    @action
    public lstView(): void {
        for (let i = 0; i < this.nodes.length; i++) {
             this.nodes[i].x = i;
             this.nodes[i].x *= 400;
             this.nodes[i].y = 0;
        }
    }

    /**
     * A helper method that moves the canvas to where the linked node
     * is on the canvas
     * @param xCoord number, the x coordinate of the linked node
     * @param yCoord number, the y coordinate of the linked node
     */
    @action
    public moveTo(xCoord: number, yCoord: number) {
        this.x = xCoord;
        this.y = yCoord;
    }
}