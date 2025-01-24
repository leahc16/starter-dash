import { observer } from "mobx-react";
import * as React from 'react';
import { NodeStore } from "../../stores";
import "./NewNodes.scss";

interface NewNodeProps {
    store: NodeStore;
}

@observer
export class NewNodes extends React.Component<NewNodeProps> {
        private isPointerDown = false;
    
        onPointerDown = (e: React.PointerEvent): void => {
            e.stopPropagation();
            e.preventDefault();
            this.isPointerDown = true;
            document.removeEventListener("pointermove", this.onPointerMove);
            document.addEventListener("pointermove", this.onPointerMove);
            document.removeEventListener("pointerup", this.onPointerUp);
            document.addEventListener("pointerup", this.onPointerUp);
        }
    
        onPointerUp = (e: PointerEvent): void => {
            e.stopPropagation();
            e.preventDefault();
            this.isPointerDown = false;
            document.removeEventListener("pointermove", this.onPointerMove);
            document.removeEventListener("pointerup", this.onPointerUp);
        }
    
        onPointerMove = (e: PointerEvent): void => {
            e.stopPropagation();
            e.preventDefault();
            if (!this.isPointerDown) return;
        }

        render() {
            return (
                <li>
                <button onClick={() => console.log("clicked")}>Add Text Node</button>
                <button onClick={() => console.log("click")}>Add Video Node</button>
                </li>
            );
        }
}
