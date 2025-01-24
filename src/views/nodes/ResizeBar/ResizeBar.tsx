import { observer } from "mobx-react";
import * as React from 'react';
import { NodeStore } from "../../../stores";
import "./ResizeBar.scss";

interface ResizeBarProps {
    store: NodeStore;
}

@observer
export class ResizeBar extends React.Component<ResizeBarProps> {

    private isClicked = false;

    onPointerDown = (e: React.PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this.isClicked = true;
        document.removeEventListener("pointermove", this.onPointerMove);
        document.addEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
        document.addEventListener("pointerup", this.onPointerUp);
    }

    onPointerUp = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this.isClicked = false;
        document.removeEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
    }

  //  @action
    onPointerMove = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        if (!this.isClicked) return;

       // this.props.store.newWidth = 0;
       // this.props.store.newHeight = 0;

        this.props.store.width = 300;
        this.props.store.height = 300;

        this.props.store.newWidth += -1 * e.movementX;
        this.props.store.newHeight += -1 * e.movementY;
     //   console.log("old width: " + this.props.store.newWidth);

    //    console.log("new width: " + this.props.store.width);
    console.log(e.movementX);

    }

    render() {
        return <div className="resizebar" onPointerDown={this.onPointerDown} />
    }
}