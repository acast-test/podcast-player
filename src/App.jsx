import React from 'react';
import Errors from './errors';
import Podcasts from './podcasts';
import './App.scss';

function App() {
    return (
        <div class="app">
            <Errors />
            <Podcasts />
        </div>
    )
}

export default App;
