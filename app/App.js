import controller from './controller.js';
import React from 'react';
import ReactDOM from 'react-dom';
import {Container} from 'cerebral-react';
import SequenceEditor from './SequenceEditor.js';

let injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render(<Container controller={controller} app={SequenceEditor}/>, app);

