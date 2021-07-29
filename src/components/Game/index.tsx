import React from 'react';

import Snake, { SnakeBodyArray, Direction } from './Snake';

import './index.scss';

interface IGameState {
    row: number;
    col: number;
    snake: SnakeBodyArray;
    direction: Direction;
    clockrate: number;
}

export default class Game extends React.Component<{}, IGameState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            row: 20,
            col: 20,
            snake: [
                [3, 0],
                [2, 0],
                [1, 0],
                [0, 0],
            ],
            direction: Direction.South,
            clockrate: 1000,
        };
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(ev: KeyboardEvent) {
        console.log(ev);
        // this.setState({
        //     direction: Direction.West,
        // });
        if (ev.key) {
            switch (ev.key) {
                case 'ArrowRight':
                case 'd':
                    this.setState({ direction: Direction.East });
                    break;
                case 'ArrowDown':
                case 's':
                    this.setState({ direction: Direction.South });
                    break;
                case 'ArrowLeft':
                case 'a':
                    this.setState({ direction: Direction.West });
                    break;
                case 'ArrowUp':
                case 'w':
                    this.setState({ direction: Direction.North });
                    break;

                default:
                    break;
            }
        } else if (ev.keyCode) {
            switch (ev.keyCode) {
                case 39:
                case 68:
                    this.setState({ direction: Direction.East });
                    break;
                case 40:
                case 83:
                    this.setState({ direction: Direction.South });
                    break;
                case 37:
                case 65:
                    this.setState({ direction: Direction.West });
                    break;
                case 38:
                case 87:
                    this.setState({ direction: Direction.North });
                    break;

                default:
                    break;
            }
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    render = () => (
        <div id="game">
            {React.createElement(
                'table',
                { id: 'map' },
                Array.from(Array(this.state.row).keys()).map((v, x) =>
                    React.createElement(
                        'tr',
                        { key: x },
                        Array.from(Array(this.state.col).keys()).map((v, y) =>
                            React.createElement('td', { key: y })
                        )
                    )
                )
            )}

            <Snake
                row={this.state.row}
                col={this.state.col}
                snake={this.state.snake}
                direction={this.state.direction}
                clockrate={this.state.clockrate}
            />
        </div>
    );
}
