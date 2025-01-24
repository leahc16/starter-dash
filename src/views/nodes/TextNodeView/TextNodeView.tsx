import { observer } from "mobx-react";
import * as React from 'react';
import { StaticTextNodeStore } from "../../../stores";
import { TopBar } from "../TopBar";
import { ResizeBar } from "../ResizeBar";
import "./../NodeView.scss";
import "./TextNodeView.scss";

interface TextNodeProps {
    store: StaticTextNodeStore;
}

@observer
export class TextNodeView extends React.Component<TextNodeProps> {
  
    render() {
        let store = this.props.store;
        return (
            <div className="node textNode" style={{transform: store.resize } } onWheel={(e: React.WheelEvent) => {
                e.stopPropagation();
                e.preventDefault();
            }}>
                <TopBar store={store}/> 
                <ResizeBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.title}</h3>
                        <p className="paragraph">{store.text}</p> 
                    </div>
                    
                </div>
            </div>
        );
    }
}

 /* state = {
        width: 300,
        height: 300
    }; */