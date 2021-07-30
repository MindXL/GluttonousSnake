import React from 'react';

type BlockInArray = [number, number];
export type SnakeBodyArray = BlockInArray[];

type BlockInSet = {
    row: number;
    col: number;
};

type Block = BlockInSet;

export enum Direction {
    East,
    South,
    West,
    North,
}
interface ISnakeProps {
    row: number;
    col: number;
    snake: BlockInArray[];
    direction: Direction;
    clockrate: number;
}

interface ISnakeState {
    headColor: string;
    bodyColor: string;
    snake: Block[];
    styles: string[];
    direction: Direction;
}

export default class Snake extends React.Component<ISnakeProps, ISnakeState> {
    timer: NodeJS.Timeout | undefined;
    constructor(props: ISnakeProps) {
        super(props);

        // Initial
        const headColor = 'pink';
        const bodyColor = 'cyan';
        const snake = converse(props.snake) as Block[];

        this.state = {
            headColor: headColor,
            bodyColor: bodyColor,
            snake: snake,
            styles: snake.map(
                (block, index) =>
                    `#map tr:nth-child(${block.row + 1}) td:nth-child(${
                        block.col + 1
                    }) {background-color: ${index ? bodyColor : headColor};}\n`
            ),
            direction: props.direction,
        };
        this.move = this.move.bind(this);
    }

    // clearBody() {
    //     this.setState({ body: [], style: '' });
    // }

    // setBody(blocks: Block[]) {
    //     this.setState({
    //         style: blocks
    //             .map(block => generateStyles(block, this.props.bodyColor))
    //             .join('\n'),
    //     });
    // }

    // appendBody(block: Block) {
    //     this.setState({
    //         style:
    //             this.state.style +
    //             `\n#map tr:nth-child(${block.row}) td:nth-child(${block.col}) {background-color: red;}`,
    //     });
    //     console.log(this.state.style);
    // }

    static getDerivedStateFromProps(
        nextProps: ISnakeProps,
        prevState: ISnakeState
    ) {
        return {
            direction:
                Math.abs(nextProps.direction - prevState.direction) === 2
                    ? prevState.direction
                    : nextProps.direction,
        };
        // return null;
    }

    generateStyle(block: Block, isHead: boolean = true): string {
        return `#map tr:nth-child(${block.row + 1}) td:nth-child(${
            block.col + 1
        }) {background-color: ${
            isHead ? this.state.headColor : this.state.bodyColor
        };}\n`;
    }
    generateStyles(blocks: Block[]): string[] {
        return blocks.map(
            (block, index) =>
                `#map tr:nth-child(${block.row + 1}) td:nth-child(${
                    block.col + 1
                }) {background-color: ${
                    index ? this.state.bodyColor : this.state.headColor
                };}\n`
        );
    }

    // shouldComponentUpdate(nextProps: ISnakeProps, nextState: ISnakeState) {
    //     switch (nextProps.direction) {
    //         case Direction.East:
    //             nextState.body.push(converse([3, 4]) as BlockInSet);
    //             break;
    //         case Direction.South:
    //             nextState.body.push(converse([3, 4]) as BlockInSet);
    //             break;
    //         case Direction.West:
    //             nextState.body.push(converse([3, 4]) as BlockInSet);
    //             break;
    //         case Direction.North:
    //             nextState.body.push(converse([3, 4]) as BlockInSet);
    //             nextState.style += `\n#map tr:nth-child(${3}) td:nth-child(${4}) {background-color: red;}`;
    //             break;

    //         default:
    //             break;
    //     }
    //     return true;
    // }

    move() {
        let body = this.state.snake.slice(0, -1);
        let styles = this.state.styles.slice(0, -1);

        const head = this.state.snake[0];
        let nextBlock = head;

        switch (this.state.direction) {
            case Direction.East:
                nextBlock = {
                    row: head.row,
                    col: (head.col + 1) % this.props.col,
                };
                break;
            case Direction.South:
                nextBlock = {
                    row: (head.row + 1) % this.props.row,
                    col: head.col,
                };
                break;
            case Direction.West:
                nextBlock = {
                    row: head.row,
                    col: head.col ? head.col - 1 : this.props.col - 1,
                };
                break;
            case Direction.North:
                nextBlock = {
                    row: head.row ? head.row - 1 : this.props.row - 1,
                    col: head.col,
                };
                break;
        }

        // 蛇头不会碰到身子的第0、1块
        if (body.length >= 2) {
            for (let i = 2; i < body.length; i++) {
                if (
                    body[i].row === nextBlock.row &&
                    body[i].col === nextBlock.col
                ) {
                    clearInterval(this.timer!);
                    window.alert('Game Over!');
                    return;
                }
            }
        }

        body.unshift(nextBlock);
        styles[0] = styles[0].replace(
            this.state.headColor,
            this.state.bodyColor
        );
        styles.unshift(this.generateStyle(nextBlock));

        this.setState({
            snake: body,
            styles: styles,
        });
    }

    render = () => {
        if (!this.timer)
            this.timer = setInterval(this.move, this.props.clockrate);
        return <style id="Snake">{this.state.styles}</style>;
    };
}

type ConverseResult = BlockInSet | BlockInSet[] | BlockInArray | BlockInArray[];

function converse(object: ConverseResult): ConverseResult {
    if (Array.isArray(object)) {
        // empty BlockInSet[] | BlockInArray[]
        if (object.length === 0) return [];

        if (Array.isArray(object[0])) {
            // BlockInArray[]
            return (object as BlockInArray[]).map(blockInArray => {
                return { row: blockInArray[0], col: blockInArray[1] };
            }) as BlockInSet[];
        } else {
            // BlockInArray
            if (typeof object[0] === 'number') {
                return { row: object[0], col: object[1] } as BlockInSet;
            }
            // BlockInSet[]
            return (object as BlockInSet[]).map(blockInSet => [
                blockInSet.row,
                blockInSet.col,
            ]) as BlockInArray[];
        }
    } else {
        // BlockInSet
        return [object.row, object.col] as BlockInArray;
    }
}
