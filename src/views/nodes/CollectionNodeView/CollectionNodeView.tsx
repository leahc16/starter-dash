import { observer } from "mobx-react";
import * as React from 'react';
import { NodeStore, NodeCollectionStore, StaticTextNodeStore, StoreType, 
    VideoNodeStore, WebsiteNodeStore, ImageNodeStore, EditTextNodeStore } from "../../../stores";
import { TextNodeView, VideoNodeView, WebsiteNodeView, ImageNodeView, EditTextNodeView } from "../../nodes";
import "./CollectionNodeView.scss";

interface CollectionProps {
    store: NodeCollectionStore
}

//let nodes: NodeStore[] = [];
@observer
export class FreeFormCanvas extends React.Component<CollectionProps> {
    private isPointerDown: boolean | undefined;
    private collectionNodes: NodeStore[] = [];

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

        this.props.store.x += e.movementX;
        this.props.store.y += e.movementY;
    }

    inSameArea(): boolean {
      //  if (this.props.store.y <= )
        return false;
    }

    addNode(type: StoreType): void {
        switch(type) {
            case StoreType.Text:
                this.collectionNodes.push(new StaticTextNodeStore({ type: StoreType.Text, x: 0, y: 0, title: "Need to resize before moving", text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" }));
                break;
            case StoreType.Video:
                this.collectionNodes.push(new VideoNodeStore({ type: StoreType.Video, x: 0, y: 0, title: "Need to resize before moving", url: "http://cs.brown.edu/people/peichman/downloads/cted.mp4" }));
                break;
            case StoreType.Website:
                this.collectionNodes.push(new WebsiteNodeStore({ type: StoreType.Website, x: 0, y: 0, title: "Need to resize before moving", url: "https://en.wikipedia.org/wiki/HTML" }))
                break;
            case StoreType.Image:
                this.collectionNodes.push(new ImageNodeStore({ type: StoreType.Image, x: 0, y: 0, title: "Need to resize before moving", alt: 'react logo', url: "https://cdn.iconscout.com/icon/free/png-512/free-react-logo-icon-download-in-svg-png-gif-file-formats--company-brand-world-logos-vol-4-pack-icons-282599.png?f=webp&w=256"}));
                break;
            case StoreType.EditText:
                this.collectionNodes.push(new EditTextNodeStore({type: StoreType.EditText, x: 0, y: 0, title: "Need to resize before moving"}));
                break;        
            default:
                break;        
        }
        this.props.store.addNodes(this.collectionNodes);
    }

    render() {
        let store = this.props.store;
        return (
            <div className="freeformcanvas-container" onPointerDown={this.onPointerDown}>
                <div className="collection" style={{ transform: store.transform }}>
                    {   
                        // maps each item in the store to be rendered in the canvas based on the node type
                        store.nodes.map(nodeStore => {
                            switch (nodeStore.type) {
                                case StoreType.Text:
                                    return (<TextNodeView key={nodeStore.Id} store={nodeStore as StaticTextNodeStore}/>)

                                case StoreType.Video:
                                    return (<VideoNodeView key={nodeStore.Id} store={nodeStore as VideoNodeStore}/>)

                                case StoreType.Website:
                                    return (<WebsiteNodeView key={nodeStore.Id} store={nodeStore as WebsiteNodeStore}/>)    

                                case StoreType.Image:
                                    return (<ImageNodeView key={nodeStore.Id} store={nodeStore as ImageNodeStore}/>)  

                                case StoreType.EditText:
                                    return (<EditTextNodeView key={nodeStore.Id} store={nodeStore as EditTextNodeStore}/>)      
                                default:
                                    return (null);
                            }
                        })
                    }
                    
                </div>
                <button className="button" onClick={() => this.addNode(StoreType.Text)}>Add Text Node</button>
                <button className="button" onClick={() => this.addNode(StoreType.Video)}>Add Video Node</button>
                <button className="button" onClick={() => this.addNode(StoreType.Website)}>Add Website Node</button>
                <button className="button" onClick={() => this.addNode(StoreType.Image)}>Add Image Node</button>
                <button className="button" onClick={() => this.addNode(StoreType.EditText)}>Add Editable Text Node</button>
            </div>
        );
    }
}
