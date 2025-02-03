import { observer } from "mobx-react";
import {action} from "mobx";
import * as React from 'react';
import { NodeStore } from "../../../stores";
import "./ResizeBar.scss";

/**
 * Interface that holds the properties for ResizeBar
 */
interface ResizeBarProps {
    store: NodeStore;
}

/**
 * The ResizeBar class extends ResizeBarProps and handles all of the pointer
 * events that occur on the object. Once imported into a node, it scales the 
 * node to become larger or smaller
 */
@observer
export class ResizeBar extends React.Component<ResizeBarProps> {
    private isClicked = false;

     /**
     * The method that is called when the user clicks/taps/otherwise 
     * holds down on the canvas
     * @param e PointerEvent, the event when the canvas is held down on
     */
    onPointerDown = (e: React.PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this.isClicked = true;
        document.removeEventListener("pointermove", this.onPointerMove);
        document.addEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
        document.addEventListener("pointerup", this.onPointerUp);
    }

    /**
     * The method that is called when the user clicks/taps/otherwise 
     * releases the canvas
     * @param e PointerEvent, the event when the canvas is released
     */
    onPointerUp = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this.isClicked = false;
        document.removeEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
    }

    
     /**
     * The method that is called when the user clicks/taps/otherwise 
     * holds down and drags on the canvas, resizes the Node
     * @param e PointerEvent, the event when the canvas is being clicked and dragged
     */
    @action
    onPointerMove = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        if (!this.isClicked) return;

        this.props.store.width = 300;
        this.props.store.height = 300;

        this.props.store.newWidth += -1 * e.movementX;
        this.props.store.newHeight += -1 * e.movementY;
    }

    /**
     * Renders the ResizeBar so that it can be added and seen on a Node
     * @returns the resize bar
     */
    render() {
        return <div className="resizebar" onPointerDown={this.onPointerDown} />
    }
}