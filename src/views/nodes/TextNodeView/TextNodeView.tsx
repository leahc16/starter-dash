import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore, StaticTextNodeStore } from "../../../stores";
import { TopBar } from "../TopBar";
import { ResizeBar } from "../ResizeBar";
import "./../NodeView.scss";
import "./TextNodeView.scss";

/**
 * An interface that holds the properties for TextNodeView
 */
interface TextNodeProps {
    store: StaticTextNodeStore;
    nodeCollection: NodeCollectionStore;
}

/**
 * The TextNodeView class renders the elements of a static text node
 * and all of the properties needed, including a method to move to a linked
 * node.
 */
@observer
export class TextNodeView extends React.Component<TextNodeProps> {
    public moveTo(xCoord: number, yCoord: number) {
        this.props.nodeCollection.x = xCoord;
        this.props.nodeCollection.y = yCoord;
    }

    /**
     * Renders the elements of a Text Node so that it may be added to other components and viewed on a screen
     * @returns the newly created text node
     */
    render() {
        let store = this.props.store;
        let nodeCollection = this.props.nodeCollection;
        return (
            <div className="node textNode" style={{ transform:store.resize + store.transform } } onWheel={(e: React.WheelEvent) => {
                e.stopPropagation();
                e.preventDefault();
            }}>
                <TopBar store={store}/> 
                <ResizeBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.title}</h3>
                        <p className="paragraph">{store.text}</p> 
                        {/* Render and push linked nodes to store */}
                        <div className="linked-nodes">
                            {store.links.map((node, index) => (
                                <div key={index} className="linked-node" onClick={() => nodeCollection.moveTo(node.x, node.y)}>
                                    🔗 Linked to node {node.id}
                                </div>
                            ))}
                        </div>    
                    </div>
                </div>
            </div>
        );
    }
}