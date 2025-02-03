import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore, WebsiteNodeStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import { ResizeBar } from "./../ResizeBar";
import "./WebsiteNodeView.scss";

interface WebsiteNodeProps {
    store: WebsiteNodeStore;
    nodeCollection: NodeCollectionStore;
}

@observer
export class WebsiteNodeView extends React.Component<WebsiteNodeProps> {
    public moveTo(xCoord: number, yCoord: number) {
        this.props.nodeCollection.x = xCoord;
        this.props.nodeCollection.y = yCoord;
    }
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