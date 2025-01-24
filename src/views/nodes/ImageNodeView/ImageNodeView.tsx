import { observer } from "mobx-react";
import * as React from 'react';
import { ImageNodeStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import { ResizeBar } from "./../ResizeBar";
import "./ImageNodeView.scss";

interface ImageNodeProps {
    store: ImageNodeStore;
}

@observer
export class ImageNodeView extends React.Component<ImageNodeProps> {
    
    render() {
        let store = this.props.store;
      /*  const moving = {
            transform: translate(2px, 3px) scale(2);
        }  */
        return (
            <div className="node imageNode" style={{transform: store.transform}}>
                <TopBar store={store}/>
                <ResizeBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.title}</h3>
                        <img src={store.url} alt={store.alt} />
                    </div>
                </div>
            </div>
        );
    }
} 