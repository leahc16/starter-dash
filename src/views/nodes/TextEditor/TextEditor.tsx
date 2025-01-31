import {observer} from "mobx-react";
import React, {createRef} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { EditTextNodeStore } from "../../../stores";
import "./TextEditor.scss";
import {observable, action} from "mobx";


interface TextEditorProps {
    store: EditTextNodeStore;
    field: keyof EditTextNodeStore;
    initialText: string;
   // onSave: (currentText: string) => void;
}

@observer
export class TextEditor extends React.Component<TextEditorProps> {
    // state = {
    //     isEditing: false,
    //     currentText: this.props.initialText,
    // }

    @observable 
    private quillRef = createRef<ReactQuill>();

    @observable
    private isEditing = false;
    @observable
    private currentText = this.props.initialText;
  //  startEditing = (e: React.MouseEvent) 
    @action
    startEditing = (e: React.MouseEvent): void => {
        // });
        this.isEditing = true;
        // const editor = this.quillRef.current?.getEditor();
        // editor?.setSelection(editor.getLength(), 0);
        setTimeout(() => {
            const editor = this.quillRef.current?.getEditor();
            if (editor) {
                editor.focus();
                editor.setSelection(editor.getLength(), 0);
            }
        }, 0);
        // this.quillRef.current?.getEditor().setSelection(this.quillRef.current?.getEditor().getLength(), 0);
    };

    finishEditing = (e: React.MouseEvent): void => {
        const editor = this.quillRef.current?.getEditor();
        editor?.blur();

        // this.setState({isEditing: false});
        this.isEditing = false;

        this.handleEdit(this.currentText);
    };

    handleEdit = (newText: string) => {
        // this.setState({currentText: newText});
        this.currentText = newText;
        this.props.store.updateField(this.props.field, newText);
      //  this.props.onSave(newText);
    }

    onPointerDown = (e: React.PointerEvent): void => {
                e.stopPropagation();
                e.preventDefault();

                const editor = this.quillRef.current?.getEditor();

                if (editor) {
                    const bounds = editor.getBounds(editor.getSelection()?.index || 0);
        
                    // Calculate the click position relative to the editor content
                    const x = e.clientX;
                    const y = e.clientY;
                    if(bounds !== null){
                        const x = e.clientX - bounds.left;
                        const y = e.clientY - bounds.top;
                    }
                }

                // const range = (editor?.getLength())
                // editor?.setSelection(range, 'user');

                //this selects the entire text bc it goes from 0 to editor.getLength()
                //editor?.setSelection(0, editor.getLength(), 'user');
        
                // setSelection(range: { index: number, length: number },
                //     source: string = 'api')
                // document.removeEventListener("pointermove", this.onPointerMove);
                // document.removeEventListener("pointerup", this.onPointerUp);
                // document.addEventListener("pointermove", this.onPointerMove);
                // document.addEventListener("pointerup", this.onPointerUp);
            }

    render (){
        // const { isEditing, currentText } = this.state;
        // const isEditing = this.isEditing;
        // const currentText = this.currentText;

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
                    <div
                        onClick={this.startEditing}
                        style={{ cursor: "pointer", border: "1px solid #ccc", padding: "10px" }}
                    >
                    <div dangerouslySetInnerHTML={{__html: this.currentText}}></div>
                    </div>
                )}
            </div>
        );
    }
}

/**
 * This file contains the RichTextEditor class which is a React component 
 * that utilizes and modifies the React Quill Rich Text Editor library
 */


/**\
 * This interface includes the props that need to be passed into 
 * the constructor of a RichTextEditor object upon creation.
 * The props inlcude the store, field in the store, initial text
 * to display, and the method to alter the text upon save. 
 */


    /**
     * The initial state of any formattable text is set to the initial
     * text passed as a prop and to be not editable at the moment
     */


    // state = {
    //         isEditing: false,
    //         currentText: this.props.initialText,
    // };

   // @observable private quillRef = createRef<ReactQuill>();
    // @observable editor = this.quillRef.current?.getEditor();


    // finishEditing = (e: React.MouseEvent): void => {
    //     const editor = this.quillRef.current?.getEditor();
    //     editor?.blur();

    //     // this.setState({isEditing: false});
    //     this.isEditing = false;

    //     this.handleEdit(this.currentText);
    // };

    // handleEdit = (newText: string) => {
    //     // this.setState({currentText: newText});
    //     this.currentText = newText;
    //     this.props.store.updateField(this.props.field, newText);
    //     this.props.onSave(newText);
    // }

    // onPointerDown = (e: React.PointerEvent): void => {
    //             e.stopPropagation();
    //             e.preventDefault();

    //             const editor = this.quillRef.current?.getEditor();

    //             if (editor) {
    //                 const bounds = editor.getBounds(editor.getSelection()?.index || 0);
        
    //                 // Calculate the click position relative to the editor content
    //                 const x = e.clientX;
    //                 const y = e.clientY;
    //                 if(bounds !== null){
    //                     const x = e.clientX - bounds.left;
    //                     const y = e.clientY - bounds.top;
    //                 }
                    
    //         //         const position = editor.getSelection();
    //         // if (position) {
    //         //     // Find the index at the clicked position
    //         //     const index = editor.getIndexFromPoint(x, );
    //         //     if (index !== null && index !== undefined) {
    //         //         // Set the selection to the clicked position
    //         //         quillEditor.setSelection(index);
    //         //     }
    //         // }
    //             }

    //             // const range = (editor?.getLength())
    //             // editor?.setSelection(range, 'user');

    //             //this selects the entire text bc it goes from 0 to editor.getLength()
    //             //editor?.setSelection(0, editor.getLength(), 'user');
        
    //             // setSelection(range: { index: number, length: number },
    //             //     source: string = 'api')
    //             // document.removeEventListener("pointermove", this.onPointerMove);
    //             // document.removeEventListener("pointerup", this.onPointerUp);
    //             // document.addEventListener("pointermove", this.onPointerMove);
    //             // document.addEventListener("pointerup", this.onPointerUp);
    //         }

    // render (){
    //     // const { isEditing, currentText } = this.state;
    //     // const isEditing = this.isEditing;
    //     // const currentText = this.currentText;

    //     return (
    //         <div className="editor" onPointerDown = {this.onPointerDown}>
    //             {this.isEditing ? (
    //                 <div>
    //                     <ReactQuill 
    //                         ref={this.quillRef}
    //                         value={this.currentText}
    //                         onChange={this.handleEdit}
    //                     />
    //                     <button onClick={this.finishEditing}>Save</button>
    //                 </div>
    //             ) : (
    //                 <div
    //                     onClick={this.startEditing}
    //                     style={{ cursor: "pointer", border: "1px solid #ccc", padding: "10px" }}
    //                 >
    //                 <div dangerouslySetInnerHTML={{__html: this.currentText}}></div>
    //                 </div>
    //             )}
    //         </div>
    //     );
    // }

