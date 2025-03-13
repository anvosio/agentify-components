import { generateMCPServer } from '../../src/index';
import * as components from './components/ButtonExample';

const componentList = Object.values(components);

console.log(componentList);
generateMCPServer(componentList);