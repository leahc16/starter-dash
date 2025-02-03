import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore, VideoNodeStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import { ResizeBar } from "./../ResizeBar";
import "./VideoNodeView.scss";

/**
 * An interface that holds the properties for VideoNodeView
 */
interface VideoNodeProps {
    store: VideoNodeStore;
    nodeCollection: NodeCollectionStore;
}

/**
 * The VideoNodeView class renders the elements of a Video node
 * and all of the properties needed, including a method to move to a linked
 * node.
 */
@observer
export class VideoNodeView extends React.Component<VideoNodeProps> {
    // public moveTo(xCoord: number, yCoord: number) {
    //     this.props.nodeCollection.x = xCoord;
    //     this.props.nodeCollection.y = yCoord;
    // }
    render() {
        let store = this.props.store;
        let nodeCollection = this.props.nodeCollection;
        return (
            <div className="node videoNode" style={{ transform: store.transform + store.resize}}>
                <TopBar store={store}/>
                <ResizeBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.title}</h3>
                        <video src={store.url} controls />
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