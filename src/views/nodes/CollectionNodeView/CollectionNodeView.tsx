import { observer } from "mobx-react";
import * as React from 'react';
import { CollectNodeStore, NodeCollectionStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import { ResizeBar } from "./../ResizeBar";
import "./CollectionNodeView.scss";

/**
 * An interface that holds the properties for CollectionNodeView
 */
interface CollectNodeProps {
    store: CollectNodeStore;
    nodeCollection: NodeCollectionStore;
}

/**
 * The CollectionNodeView class renders the elements of a Collection node
 * and all of the properties needed
 */
@observer
export class CollectionNodeView extends React.Component<CollectNodeProps> {    
    /**
     * Renders the elements of a Collection Node so that it may be added to other components and viewed on a screen
     * @returns the newly created collection node
     */
    render() {
        let store = this.props.store;
        let nodeCollection = this.props.nodeCollection;
        return (
            <div className="node collectionNode" style={{ transform: store.transform + store.resize}}>
                <TopBar store={store}/>
                <ResizeBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.title}</h3>
                        <iframe id='website' title='embedded-website' src={"google.com"}></iframe>
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