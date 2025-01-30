import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore, StaticTextNodeStore } from "../../../stores";
import { TopBar } from "../TopBar";
import { ResizeBar } from "../ResizeBar";
import { DeleteBar } from "../DeleteBar";
import "./../NodeView.scss";
import "./TextNodeView.scss";



interface TextNodeProps {
    store: StaticTextNodeStore;
  //  bigStore: NodeCollectionStore;
}

@observer
export class TextNodeView extends React.Component<TextNodeProps> {
    render() {
        let store = this.props.store;
      //  let bigStore = this.props.bigStore;
        return (
            <div className="node textNode" style={{ transform:store.resize + store.transform } } onWheel={(e: React.WheelEvent) => {
                e.stopPropagation();
                e.preventDefault();
            }}>
                <TopBar store={store}/> 
                <ResizeBar store={store}/>
              {/*  <DeleteBar store={bigStore}/>  node={store}/> */}
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