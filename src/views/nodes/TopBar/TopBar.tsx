import { observer } from "mobx-react";
import * as React from 'react';
import { NodeStore } from "../../../stores";
import "./TopBar.scss";

/**
 * Interface that holds the properties for TopBar
 */
interface TopBarProps {
    store: NodeStore;
}

/**
 * The TopBar class extends TopBarProps and handles all of the pointer
 * events that occur on the object. Once imported into a node, it translates
 * the Node to move with the mouse
 */
@observer
export class TopBar extends React.Component<TopBarProps> {
    private isPointerDown = false;

    /**
     * The method that is called when the user clicks/taps/otherwise 
     * holds down on the canvas
     * @param e PointerEvent, the event when the canvas is held down on
     */
    onPointerDown = (e: React.PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this.isPointerDown = true;
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
        this.isPointerDown = false;
        document.removeEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
    }

     /**
     * The method that is called when the user clicks/taps/otherwise 
     * holds down and drags on the canvas, moves the Node
     * @param e PointerEvent, the event when the canvas is being clicked and dragged
     */
    onPointerMove = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        if (!this.isPointerDown) return;

        this.props.store.x += e.movementX;
        this.props.store.y += e.movementY;
    }

    /**
     * Renders the TopBar so that it can be added, seen, and used on a Node
     * @returns the top bar
     */
    render() {
        return <div className="topbar" onPointerDown={this.onPointerDown} />
    }
}
