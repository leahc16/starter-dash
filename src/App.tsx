import React from 'react';
import './App.scss';
import { NodeCollectionStore, NodeStore, StaticTextNodeStore, StoreType, 
  VideoNodeStore, WebsiteNodeStore, ImageNodeStore, EditTextNodeStore } from './stores';
import { FreeFormCanvas } from './views/freeformcanvas/FreeFormCanvas';
//import { NewNodes } from './views/newnodes/NewNodes';
import '@xyflow/react/dist/style.css';



const mainNodeCollection = new NodeCollectionStore();

// create a bunch of text and video nodes (you probably want to delete this at some point)
// let numNodes: number = 300;
// let maxX: number = 10000;
// let maxY: number = 10000;
// let nodes: NodeStore[] = [];

// // add 150 static text nodes to random locations
// for (let i = 0; i < numNodes / 2; i++) {
//     nodes.push(new StaticTextNodeStore({ type: StoreType.Text, x: Math.random() * maxX, y: Math.random() * maxY, title: "Text for nodes", text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" }));
//  //   nodes.push(new EditTextNodeStore("Node Title","<p>Editable content here...</p>"));

// }

// // add 150 video nodes to random locations
// for (let i = 0; i < numNodes / 4; i++) {
//     nodes.push(new WebsiteNodeStore({ type: StoreType.Website, x: Math.random() * maxX, y: Math.random() * maxY, title: "Website Node", url: "https://en.wikipedia.org/wiki/HTML" }))
//     nodes.push(new VideoNodeStore({ type: StoreType.Video, x: Math.random() * maxX, y: Math.random() * maxY, title: "Video Node Title", url: "http://cs.brown.edu/people/peichman/downloads/cted.mp4" }));
// }

// nodes.push(new ImageNodeStore({ type: StoreType.Image, x: 0, y: 0, title: "taco", alt: 'react logo', url: "https://cdn.iconscout.com/icon/free/png-512/free-react-logo-icon-download-in-svg-png-gif-file-formats--company-brand-world-logos-vol-4-pack-icons-282599.png?f=webp&w=256"}));

// // add set of 300 nodes to node collection
// mainNodeCollection.addNodes(nodes);

export class App extends React.Component {
    render() {
        return (
          <div>
            <div className="App">
              <FreeFormCanvas store={mainNodeCollection} /> 
            </div>
          </div>  
        );
    }
}
/*
<div style = {{width: '100vw', height: '100vh'}}>
                <ReactFlow nodes = {initialNodes} edges = {initialEdges} />
                </div> */
export default App; 
/*import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
 
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
 
export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
} */