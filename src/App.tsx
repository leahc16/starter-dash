import React from 'react';
import './App.scss';
import { NodeCollectionStore} from './stores';
import { FreeFormCanvas } from './views/freeformcanvas/FreeFormCanvas';
import '@xyflow/react/dist/style.css';

const mainNodeCollection = new NodeCollectionStore();

/**
 * The top class that creates the top level logic class
 * FreeFormCanvas and the main node collection that all 
 * of the other nodes get added to.
 */
export class App extends React.Component {
    render() {
        return (
            <div className="App">
              <FreeFormCanvas store={mainNodeCollection} /> 
            </div>
        );
    }
}
export default App; 