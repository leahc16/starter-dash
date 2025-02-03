import {observer} from "mobx-react";
import React, {createRef} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { EditTextNodeStore } from "../../../stores";
import "./TextEditor.scss";
import {observable, action} from "mobx";

/**
 * Interface that holds the properties of TextEditor, 
 * includes the text that the user will customize
 */
interface TextEditorProps {
    store: EditTextNodeStore;
    field: keyof EditTextNodeStore;
    initialText: string;
}

/**
 * This class uses the rich text editor react-quill in order to allow
 * EditTextNodeView an editable text node. Extends TextEditorProps.
 */
@observer
export class TextEditor extends React.Component<TextEditorProps> {

    @observable 
    private quillRef = createRef<ReactQuill>();

    @observable
    private isEditing = false;

    @observable
    private currentText = this.props.initialText;

    /**
     * Arrow function that creates a new react-quill editor
     * when the text box is clicked on by the user, allowing
     * for the text to be changed
     */
    @action
    startEditing = (): void => {
        this.isEditing = true;
        setTimeout(() => {
            let editor = this.quillRef.current?.getEditor(); //creates a new react-quill editor
            if (editor) {
                editor.focus();
                editor.setSelection(editor.getLength(), 0);
            }
        }, 0);
    };

    /**
     * Arrow function that is called when the user presses the "save"
     * button, saves the text so that it remains after exiting the
     * text box
     */
    finishEditing = (): void => {
        let editor = this.quillRef.current?.getEditor();
        editor?.blur();
        this.isEditing = false;
        this.handleEdit(this.currentText);
    };

    /**
     * Helper function that takes in the string the user inputs and
     * updates the store to display that string
     */
    handleEdit = (newText: string) => {
        this.currentText = newText;
        this.props.store.updateField(this.props.field, newText);
    }

    /**
     * Allows for the entire body of editable text to be clicked and highlighted
     * to be deleted/edited as desired
     * @param e PointerEvent
     */
    onPointerDown = (e: React.PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();

        let editor = this.quillRef.current?.getEditor();
        editor?.setSelection(0, editor.getLength(), "user");
    }

    /**
     * Renders the React Quill and other elements so that they may be added to the editable text node
     * @returns the newly created text editor
     */
    render (){
        return (
            <div className="editor" onPointerDown = {this.onPointerDown}>
                {this.isEditing ? (
                    <div>
                        <ReactQuill 
                            ref={this.quillRef}
                            value={this.currentText}
                            onChange={this.handleEdit}
                        />
                        <button onClick={this.finishEditing}>Save</button>
                    </div>
                ) : (
                    <div className="editing" onClick={this.startEditing}>
                    <div dangerouslySetInnerHTML={{__html: this.currentText}}></div>
                    </div>
                )}
            </div>
        );
    }
}