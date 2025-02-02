import { computed, observable, action } from "mobx";
import { NodeStore } from "./NodeStore";

export class NodeCollectionStore extends NodeStore {

    @observable
    public nodes: NodeStore[] = new Array<NodeStore>();

    

    @computed
    public get transform(): string {
        return "translate(" + this.x + "px," + this.y + "px)"; // for CSS transform property
    } 

    // @computed
    // public get resize(): string {
    //     return "scale(" + this.newWidth / this.width + ", " + this.newHeight / this.height + ")"; 
    // } 

    @action
    public addNodes(stores: NodeStore[]): void {
        this.nodes.push(...stores); // This is equivalent to: stores.forEach(store => this.nodes.push(store));

    }

    @action
    public removeNode(): void {
        let node = prompt("Please enter the node to be deleted:", "");
        if (this.nodes.length <= 0) {
            alert("There are no nodes to delete!");
        }
        if (node === null || node === "") {
            return; 
        } 
        else if (+node-1 > this.nodes.length || +node-1 < 0) {
            alert("Please enter a number between 1 and " + (this.nodes.length) + "!");

        }
        else {
            this.nodes.splice(+node-1, 1);
        }
    }

    @action
    public linkNodes(): void {
        let nodes = prompt("Please enter the nodes you want to link as\nnode #,node # with no spaces:", ""); 
        let checkExists: number = 0;
        if (this.nodes.length <= 0) {
            alert("There are no nodes to link!");
        }
        if (nodes === null || nodes === "") {
            return; 
        } 
        let node1: number = +nodes?.split(',')[0];
        let node2: number = +nodes?.split(',')[1];
        for(let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].id === node1 || this.nodes[i].id === node2) {
                checkExists += 1;
            }
        }
        if (checkExists!=2 || node1 > this.nodes.length || node1 < 0 || node2 > this.nodes.length || node2 < 0) {
            alert("Please choose nodes that exist!");

        }
        else {
            this.nodes[node1-1].linkTo(this.nodes[node2-1]);
            this.nodes[node2-1].linkTo(this.nodes[node1-1]);

           // this.nodes.splice(+node-1, 1);
        }
    }

    @action
    public lstView(): void {
        for (let i = 0; i < this.nodes.length; i++) {
             this.nodes[i].x = i;
             this.nodes[i].x *= 400;
            // if (i >= 6) {
                // this.nodes[i].x = i % 6;
                // this.nodes[i].x *= 300;

                // this.nodes[i].y = i % 6;
                // this.nodes[i].y *= 300 * (i%6);
           // }
            // if (i % 6 === 0) {
            //     this.nodes[i].x = 0;
            //     this.nodes[i].x *= 300;
            // }
        }
    }
}