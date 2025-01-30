import { observer } from "mobx-react";
import * as React from 'react';
import { WebsiteNodeStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import { ResizeBar } from "./../ResizeBar";
import "./WebsiteNodeView.scss";

interface WebsiteNodeProps {
    store: WebsiteNodeStore;
}

@observer
export class WebsiteNodeView extends React.Component<WebsiteNodeProps> {
    render() {
        let store = this.props.store;
        return (
            <div className="node websiteNode" style={{ transform: store.transform + store.resize}}>
                <TopBar store={store}/>
                <ResizeBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.title}</h3>
                        <iframe id='website' title='embedded-website' src={store.url}></iframe>
                    </div>
                </div>
            </div>
        );
    }
}