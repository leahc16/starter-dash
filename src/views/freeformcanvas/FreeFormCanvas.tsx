import { observer } from "mobx-react";
import * as React from 'react';
import { NodeStore, NodeCollectionStore, StaticTextNodeStore, StoreType, 
    VideoNodeStore, WebsiteNodeStore, ImageNodeStore, EditTextNodeStore, 
    CollectNodeStore} from "../../stores";
import { TextNodeView, VideoNodeView, WebsiteNodeView, ImageNodeView, EditTextNodeView, CollectionNodeView } from "../nodes";
import "./FreeFormCanvas.scss";

/**
 * An interface that holds the properties for FreeformCanvas
 */
interface FreeFormProps {
    store: NodeCollectionStore
}

/**
 * The top level logical class representing the canvas that adds, 
 * removes, and holds all of the nodes. Extends FreeFormProps
 */
@observer
export class FreeFormCanvas extends React.Component<FreeFormProps> {
    private isPointerDown: boolean | undefined;

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
     * holds down and drags on the canvas, moves the canvas with the mouse/pointer event
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
     * A helper method to add the correct Node to the canvas
     * when its corresponding add button is pressed with some 
     * default input.
     * @param type Storetype, the type of Node that is being added
     */
    private addNode(type: StoreType): void {
        NodeStore.numNode += 1;
        switch(type) {
            case StoreType.Text:
                this.props.store.nodes.push(new StaticTextNodeStore({ type: StoreType.Text, x: 0, y: 0, 
                    title: "Static Text, Node " + NodeStore.numNode, 
                    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" }));
                break;
            case StoreType.Video:
                this.props.store.nodes.push(new VideoNodeStore({ type: StoreType.Video, x: 0, y: 0, 
                    title: "Video, Node " + NodeStore.numNode, 
                    url: "http://cs.brown.edu/people/peichman/downloads/cted.mp4" }));
                break;
            case StoreType.Website:
                this.props.store.nodes.push(new WebsiteNodeStore({ type: StoreType.Website, x: 0, y: 0, 
                    title: "Website, Node " + NodeStore.numNode, 
                    url: "https://en.wikipedia.org/wiki/HTML" }))
                break;
            case StoreType.Image:
                this.props.store.nodes.push(new ImageNodeStore({ type: StoreType.Image, x: 0, y: 0, 
                    title: "Image, Node " + NodeStore.numNode, 
                    alt: 'oranges for the color pallette of the site', 
                    url: "https://colorpalettes.net/wp-content/uploads/2022/08/color-palette-4568.png"}));
                break;
            case StoreType.EditText:
                this.props.store.nodes.push(new EditTextNodeStore({type: StoreType.EditText, x: 0, y: 0, 
                    title: "Editable, Node " + NodeStore.numNode}));
                break;     
            case StoreType.Collection:
                this.props.store.nodes.push(new CollectNodeStore({type: StoreType.Collection, x: 0, y: 0, 
                    title: "Collection, Node " + NodeStore.numNode}));
                break;    
            default:
                break;        
        }
    }

    /**
     * The method that renders every element so that they are actually visable on the screen
     * @returns the elements being added to the canvas
     */
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
                                    return (<TextNodeView key={nodeStore.Id} store={nodeStore as StaticTextNodeStore}  nodeCollection={store}/>)

                                case StoreType.Video:
                                    return (<VideoNodeView key={nodeStore.Id} store={nodeStore as VideoNodeStore}  nodeCollection={store}/>)

                                case StoreType.Website:
                                    return (<WebsiteNodeView key={nodeStore.Id} store={nodeStore as WebsiteNodeStore}  nodeCollection={store}/>)    

                                case StoreType.Image:
                                    return (<ImageNodeView key={nodeStore.Id} store={nodeStore as ImageNodeStore}  nodeCollection={store}/>)  

                                case StoreType.EditText:
                                return (<EditTextNodeView key={nodeStore.Id} store={nodeStore as EditTextNodeStore} nodeCollection={store}/>)    
                                    
                                case StoreType.Collection:
                                    return (<CollectionNodeView key={nodeStore.Id} store={nodeStore as CollectNodeStore} nodeCollection={store}/>)  

                                default:
                                    return (null);
                            }
                        })
                    }
                    
                </div>
                {/* Group of buttons that add Nodes */}
                <div className= "btn-group">
                <button onClick={() => this.addNode(StoreType.Text)}>Add Text Node</button>
                <button onClick={() => this.addNode(StoreType.Video)}>Add Video Node</button>
                <button onClick={() => this.addNode(StoreType.Website)}>Add Website Node</button>
                <button onClick={() => this.addNode(StoreType.Image)}>Add Image Node</button>
                <button onClick={() => this.addNode(StoreType.EditText)}>Add Editable Text Node</button>
                <button onClick={() => this.addNode(StoreType.Collection)}>Add Collection Node</button>
                </div>

                {/* Group of buttons that organize Nodes */}
                <div className= "org-group">
                <button onClick={() => store.lstView()}>View as List</button>
                <button onClick={() => store.removeNode()}>Delete Node</button>
                <button onClick={() => store.linkNodes()}>Link Nodes</button>
                </div>
            </div>
        );
    }
}
