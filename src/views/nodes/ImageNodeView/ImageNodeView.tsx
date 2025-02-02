import { observer } from "mobx-react";
import * as React from 'react';
import { ImageNodeStore, NodeStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "../TopBar";
import { ResizeBar } from "../ResizeBar";
import "./ImageNodeView.scss";

interface ImageNodeProps {
    store: ImageNodeStore;
}

@observer
export class ImageNodeView extends React.Component<ImageNodeProps> {
    
    render() {
        let store = this.props.store;
        return (
            <div className="node imageNode" style={{transform: store.transform + store.resize}}>
                <TopBar store={store}/>
                <ResizeBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.title}</h3>
                        <img src={store.url} alt={store.alt} />
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