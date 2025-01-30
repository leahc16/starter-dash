import { observer } from "mobx-react";
import * as React from 'react';
import { EditTextNodeStore } from "../../../stores";
import { TopBar } from "../TopBar";
import { ResizeBar } from "../ResizeBar";
import "./../NodeView.scss";
import "./EditTextNodeView.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
//import {TextEditor} from "../TextEditor";

// import { EditorContent, Editor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";


interface EditTextNodeProps {
    store: EditTextNodeStore;
}


@observer
export class EditTextNodeView extends React.Component<EditTextNodeProps> {
    handleChange = (value: string) => {
        const { store } = this.props;
        store.text = value; // Update the store with the new editor value
    };

    render() {
        let store = this.props.store;
        return (
            <div className="node editTextNode" style={{ transform: store.transform }} onWheel={(e: React.WheelEvent) => {
                e.stopPropagation();
                e.preventDefault();
            }}>
                <TopBar store={store}/>
                <ResizeBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                         {/*  <TextEditor
                             value={store} // Bind to store's text property
                             field="title"
                             initialText = {store.text} // Quill's theme (default: "snow")
                            /> */}
                        </div> 
                        <p className="paragraph">{store.text}</p> 
                        
                    </div>
                </div>
          //  </div>
        );
    }
} 
