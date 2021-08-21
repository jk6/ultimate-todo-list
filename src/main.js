import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './components/App';
import store from './stores/store';
import injectTapEventPlugin from 'react-tap-event-plugin';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

document.body.style.backgroundColor = '#e2e2e2';

ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme(baseTheme)}>
        <Provider todos={store.todoList}>
            <App />
        </Provider>
    </MuiThemeProvider>, document.getElementById('content')
);