import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore, WebsiteNodeStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import { ResizeBar } from "./../ResizeBar";
import "./WebsiteNodeView.scss";

/**
 * An interface that holds the properties for WebsiteNodeView
 */
interface WebsiteNodeProps {
    store: WebsiteNodeStore;
    nodeCollection: NodeCollectionStore;
}

/**
 * The WebsiteNodeView class renders the elements of a Video node
 * and all of the properties needed
 */
@observer
export class WebsiteNodeView extends React.Component<WebsiteNodeProps> {
    /**
     * Renders the elements of a Website Node so that it may be added to other components and viewed on a screen
     * @returns the newly created website node
     */
    render() {
        let store = this.props.store;
        let nodeCollection = this.props.nodeCollection;
        return (
            <div className="node websiteNode" style={{ transform: store.transform + store.resize}}>
                <TopBar store={store}/>
                <ResizeBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.title}</h3>
                        <iframe id='website' title='embedded-website' src={store.url}></iframe>
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