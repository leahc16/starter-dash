import { observer } from "mobx-react";
import * as React from 'react';
import { EditTextNodeStore, NodeStore } from "../../../stores";
import { TopBar } from "./../TopBar";
import { TextEditor } from "../TextEditor";
import "./../NodeView.scss";
import "./EditTextNodeView.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ResizeBar } from "../ResizeBar";

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
            <div className="node editTextNode" style={{ transform: store.transform + store.resize}} onWheel={(e: React.WheelEvent) => {
                e.stopPropagation();
                e.preventDefault();
            }}>
                <TopBar store={store}/>
                <ResizeBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.title}</h3>
                           <TextEditor
                             store={store} // Bind to store's text property
                             field="title"
                             initialText = {store.text} 
                            /> 
                        </div> 
                        {/* Render linked nodes */}
                        <div className="linked-nodes">
                            {store.links.map((node, index) => (
                                <div key={index} className="linked-node">
                                    🔗 Linked to node {node.id}
                                </div>
                            ))}
                        </div>                        
                    </div>
                </div>
          //  </div>
        );
    }
} 
