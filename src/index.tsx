import React from 'react';
import ReactDOM from 'react-dom';

import Game from './components/Game';

class Index extends React.Component {
    render() {
        return (
            <>
                <Game />
            </>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('app'));
