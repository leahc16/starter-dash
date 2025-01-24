import { action, extendObservable, observable } from "mobx";
import { JSONContent } from "@tiptap/react";
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
        title: string = "";
        text: JSONContent | string = "";
        transfor: string = "";
    
        constructor(title: string, text: string = "", transform: string = "translate(0, 0)") {
            super();
            extendObservable(this, {
                title,
                text,
                transform,
            });
        }
    
        @action
        setTextContent(content: JSONContent) {
            this.text = content;
        }
    }