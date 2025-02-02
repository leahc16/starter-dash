import { observer } from "mobx-react";
import * as React from 'react';
import { NodeStore, NodeCollectionStore, StaticTextNodeStore, StoreType, 
    VideoNodeStore, WebsiteNodeStore, ImageNodeStore, EditTextNodeStore, 
    CollectNodeStore} from "../../stores";
import { TextNodeView, VideoNodeView, WebsiteNodeView, ImageNodeView, EditTextNodeView, CollectionNodeView } from "../nodes";
import "./FreeFormCanvas.scss";

interface FreeFormProps {
    store: NodeCollectionStore
  //  nodeStore: NodeStore
}

//const nodeCollection = new NodeCollectionStore();
//let nodes: NodeStore[] = [];
@observer
export class FreeFormCanvas extends React.Component<FreeFormProps> {
    private isPointerDown: boolean | undefined;

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

    addNode(type: StoreType): void {
        NodeStore.numNode += 1;

        switch(type) {
            case StoreType.Text:
                this.props.store.nodes.push(new StaticTextNodeStore({ type: StoreType.Text, x: 0, y: 0, 
                    title: "Need to resize before moving, Node " + NodeStore.numNode, 
                    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" }));
                break;
            case StoreType.Video:
                this.props.store.nodes.push(new VideoNodeStore({ type: StoreType.Video, x: 0, y: 0, title: "Need to resize before moving, Node " + NodeStore.numNode, url: "http://cs.brown.edu/people/peichman/downloads/cted.mp4" }));
                break;
            case StoreType.Website:
                this.props.store.nodes.push(new WebsiteNodeStore({ type: StoreType.Website, x: 0, y: 0, title: "Need to resize before moving, Node " + NodeStore.numNode, url: "https://en.wikipedia.org/wiki/HTML" }))
                break;
            case StoreType.Image:
                this.props.store.nodes.push(new ImageNodeStore({ type: StoreType.Image, x: 0, y: 0, title: "Need to resize before moving, Node " + NodeStore.numNode, alt: 'oranges for the color pallette of the site', url: "https://www.freeiconspng.com/thumbs/grid-png/graph-paper-grid-png-4.png"}));
                    // "https://colorpalettes.net/wp-content/uploads/2022/08/color-palette-4568.png"}));
                break;
            case StoreType.EditText:
                this.props.store.nodes.push(new EditTextNodeStore({type: StoreType.EditText, x: 0, y: 0, title: "Need to resize before moving, Node " + NodeStore.numNode}));
                break;     
            case StoreType.Collection:
                this.props.store.nodes.push(new CollectNodeStore({ type: StoreType.Collection, x: 0, y: 0, title: "Need to resize before moving, Node " + NodeStore.numNode, url: "https://en.wikipedia.org/wiki/HTML" }))
                break;    
            default:
                break;        
        }
    }

    addOrg(): void {

    }

    render() {
        let store = this.props.store;
        return (
            <div className="freeformcanvas-container" onPointerDown={this.onPointerDown}>
                <div className="freeformcanvas" style={{ transform: store.transform }}>
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
                                    
                                case StoreType.Collection:
                                    return (<CollectionNodeView key={nodeStore.Id} store={nodeStore as CollectNodeStore}/>)  

                                default:
                                    return (null);
                            }
                        })
                    }
                    
                </div>
                <div className= "btn-group">
                <button onClick={() => this.addNode(StoreType.Text)}>Add Text Node</button>
                <button onClick={() => this.addNode(StoreType.Video)}>Add Video Node</button>
                <button onClick={() => this.addNode(StoreType.Website)}>Add Website Node</button>
                <button onClick={() => this.addNode(StoreType.Image)}>Add Image Node</button>
                <button onClick={() => this.addNode(StoreType.EditText)}>Add Editable Text Node</button>
                <button onClick={() => this.addNode(StoreType.Collection)}>Add Collection Node</button>
                </div>
                <img src={"https://www.freeiconspng.com/thumbs/grid-png/graph-paper-grid-png-4.png"} alt={"grid"} />
            </div>
        );
    }
}
