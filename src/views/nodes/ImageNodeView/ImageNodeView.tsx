import { observer } from "mobx-react";
import * as React from 'react';
import { ImageNodeStore, NodeCollectionStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "../TopBar";
import { ResizeBar } from "../ResizeBar";
import "./ImageNodeView.scss";

/**
 * An interface that holds the properties for ImageNodeView
 */
interface ImageNodeProps {
    store: ImageNodeStore;
    nodeCollection: NodeCollectionStore;
}

/**
 * The CollectionNodeView class renders the elements of a Collection node
 * and all of the properties needed, including a method to move to a linked
 * node.
 */
@observer
export class ImageNodeView extends React.Component<ImageNodeProps> {
    /**
     * Renders the elements of a Collection Node so that it may be added to other components and viewed on a screen
     * @returns the newly created collection node
     */
    render() {
        let store = this.props.store;
        let nodeCollection = this.props.nodeCollection;
        return (
            <div className="node imageNode" style={{transform: store.transform + store.resize}}>
                <TopBar store={store}/>
                <ResizeBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.title}</h3>
                        <img src={store.url} alt={store.alt} />
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