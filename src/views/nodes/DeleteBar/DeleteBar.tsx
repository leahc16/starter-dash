import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore, NodeStore } from "../../../stores";
import "./DeleteBar.scss";

interface DeleteBarProps {
    store: NodeCollectionStore;
   // node: NodeStore;
}

@observer
export class DeleteBar extends React.Component<DeleteBarProps> {

    onPointerDown = (e: React.PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        document.removeEventListener("pointerup", this.onPointerUp);
        document.addEventListener("pointerup", this.onPointerUp);
    }

    onPointerUp = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
       // this.props.store.removeNode(this.props.node);
        document.removeEventListener("pointerup", this.onPointerUp);
    }

    render() {
        return <div className="deletebar" onPointerDown={this.onPointerDown} />
    }
}