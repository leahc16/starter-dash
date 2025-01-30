import { action, extendObservable, observable } from "mobx";
import { NodeStore } from "./NodeStore";
import { observer } from "mobx-react";

/* export class EditTextNodeStore extends NodeStore {

    constructor(initializer: Partial<EditTextNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    @observable
    public title: string = "";

    public text: JSONContent | string;;

    @action
    setTextContent(content: JSONContent) {
        this.text = content;
    }
} */
    export class EditTextNodeStore extends NodeStore {
      //  title: string = "";
      //  text: JSONContent | string = "";
      //  transfor: string = "";
    
        constructor(initializer: Partial<EditTextNodeStore>){//title: string, text: string = "", transform: string = "translate(0, 0)") {
            super();
            Object.assign(this, initializer);
            // extendObservable(this, {
            //     title,
            //     text,
            //     transform,
            // });
        }
    
        // @action
        // setTextContent(content: JSONContent) {
        //     this.text = content;
        // }
        @observable
        public title: string = "";
    
        @observable
        public text: string = "";
        @action
        public updateField (field: keyof EditTextNodeStore, newText: string) {
            if (field !== "title"&& field !== "text") return;
            this[field] = newText;
        }
    }