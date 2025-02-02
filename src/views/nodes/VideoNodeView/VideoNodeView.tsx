import { observer } from "mobx-react";
import * as React from 'react';
import { VideoNodeStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import { ResizeBar } from "./../ResizeBar";
import "./VideoNodeView.scss";

interface VideoNodeProps {
    store: VideoNodeStore;
}

@observer
export class VideoNodeView extends React.Component<VideoNodeProps> {

    render() {
        let store = this.props.store;
        return (
            <div className="node videoNode" style={{ transform: store.transform + store.resize}}>
                <TopBar store={store}/>
                <ResizeBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.title}</h3>
                        <video src={store.url} controls />
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
            </div>
        );
    }
}