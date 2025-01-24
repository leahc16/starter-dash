import { observer } from "mobx-react";
import * as React from 'react';
import { EditTextNodeStore } from "../../../stores";
import { TopBar } from "../TopBar";
import { ResizeBar } from "../ResizeBar";
import "./../NodeView.scss";
import "./EditTextNodeView.scss";

import { EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

//import "react-quill/dist/quill.snow.css";

interface EditTextNodeProps {
    store: EditTextNodeStore;
}


@observer
export class EditTextNodeView extends React.Component<EditTextNodeProps> {
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
                        <h3 className="title">{store.title}</h3>
                        <div className="editor-container">
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
} 
