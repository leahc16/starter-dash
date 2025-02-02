import { observer } from "mobx-react";
import * as React from 'react';
import { CollectNodeStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import { ResizeBar } from "./../ResizeBar";
import "./CollectionNodeView.scss";

interface CollectNodeProps {
    store: CollectNodeStore;
}

@observer
export class CollectionNodeView extends React.Component<CollectNodeProps> {
    render() {
        let store = this.props.store;
        return (
            <div className="node collectionNode" style={{ transform: store.transform + store.resize}}>
                <TopBar store={store}/>
                <ResizeBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.title}</h3>
                        <iframe id='website' title='embedded-website' src={"google.com"}></iframe>
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