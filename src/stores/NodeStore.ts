import { computed, observable } from "mobx";
import { Utils } from "../Utils";

export enum StoreType {
    Text, 
    Video,
    Website,
    Image,
    EditText
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
    public switch: Boolean = false;

   // public switch: number = 0;


    @computed
    public get transform(): string {
       // if (this.switch) {
            return "translate(" + this.x + "px, " + this.y + "px)"; 
       // }
       // return "scale(" + this.newWidth / this.width + ", " + this.newHeight / this.height + ")";
    } 

    @computed
    public get resize(): string {
        return "scale(" + this.newWidth / this.width + ", " + this.newHeight / this.height + ")"; 
    } 
}