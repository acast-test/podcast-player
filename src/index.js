import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from './store';
import Podcasts from './podcasts';
import Errors from './errors'

const title = 'Podcast player22';

ReactDOM.render(
    <Provider store={store}>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Errors />
        <Podcasts title={title} />
      </div>
    </Provider>,
    document.getElementById('app')
);
