import { observer } from "mobx-react";
import * as React from 'react';
import { EditTextNodeStore, NodeCollectionStore } from "../../../stores";
import { TopBar } from "./../TopBar";
import { TextEditor } from "../TextEditor";
import "./../NodeView.scss";
import "./EditTextNodeView.scss";
import "react-quill/dist/quill.snow.css";
import { ResizeBar } from "../ResizeBar";

/**
 * An interface that holds the properties for EditTextNodeView
 */
interface EditTextNodeProps {
    store: EditTextNodeStore;
    nodeCollection: NodeCollectionStore;
}

/**
 * The EditTextNodeView class renders the elements of an editable text node
 * and all of the properties needed, including a method to move to a linked
 * node.
 */
@observer
export class EditTextNodeView extends React.Component<EditTextNodeProps> {
    /**
     * Renders the elements of an Edit Text Node so that it may be added to other components and viewed on a screen
     * @returns the newly created editable text node
     */
    render() {
        let store = this.props.store;
        let nodeCollection = this.props.nodeCollection;
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
                             store={store} 
                             field="title"
                             initialText = {store.text} 
                            /> 
                        </div> 
                        {/* Render linked nodes */}
                        <div className="linked-nodes">
                            {store.links.map((node, index) => (
                                <div key={index} className="linked-node" onClick={() => nodeCollection.moveTo(node.x, node.y)}>
                                    🔗 Linked to node {node.id}
                                </div>
                            ))}
                        </div>                        
                    </div>
                </div>
        );
    }
} 
