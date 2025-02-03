import { action, observable } from "mobx";
import { NodeStore } from "./NodeStore";

/**
 * The class that stores attributes for editable text nodes, extends NodeStore
 */
export class EditTextNodeStore extends NodeStore {
    constructor(initializer: Partial<EditTextNodeStore>){
        super();
        Object.assign(this, initializer);
    }

    @observable
    public title: string = "";
    
    @observable
    public text: string = "start typing...";

    /**
     * This function updates the text property of the EditTextNode after
     * the user has finished typing.
     * @param field EditTextNodeStore
     * @param newText string
     * @returns void
     */
    @action
    public updateField (field: keyof EditTextNodeStore, newText: string): void {
        if (field !== "title" && field !== "text") {
            return;
        }    
        if (field === "text") {
            this[field] = newText;
        }
    }
}