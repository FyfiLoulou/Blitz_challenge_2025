export interface TeamGameState {
    type: string;
    tick: number;
    currentTickNumber: number;
    lastTickErrors: Array<string>;
    constants: Constants;
    yourCharacter: YourCharacter;
    threats: Array<Threat>;
    map: GameMap;
}

export interface Constants {}

export interface Threat {
    position: Position;
    direction: string;
    personality: string;
    style: string;
}

export interface YourCharacter {
    id: string;
    teamId: string;
    position: Position;
    alive: boolean;
    spawnPoint: Position;
    distances: Array<Array<number>>;
}

export interface GameMap {
    width: number;
    height: number;
    tiles: Array<Array<TileType>>;
}

export interface Position {
    x: number;
    y: number;
}

export enum TileType {
    EMPTY = 'EMPTY',
    WALL = 'WALL',
}

export enum ActionType {
    MOVE_LEFT = 'MOVE_LEFT',
    MOVE_RIGHT = 'MOVE_RIGHT',
    MOVE_UP = 'MOVE_UP',
    MOVE_DOWN = 'MOVE_DOWN',
    MOVE_TO = 'MOVE_TO',
}

export type Action = ActionMoveLeft | ActionMoveRight | ActionMoveUp | ActionMoveDown | ActionMoveTo;

interface ActionBase {
    type: ActionType;
}

export interface ActionMoveLeft extends ActionBase {
    type: ActionType.MOVE_LEFT;
}

export interface ActionMoveRight extends ActionBase {
    type: ActionType.MOVE_RIGHT;
}

export interface ActionMoveUp extends ActionBase {
    type: ActionType.MOVE_UP;
}

export interface ActionMoveDown extends ActionBase {
    type: ActionType.MOVE_DOWN;
}

export interface ActionMoveTo extends ActionBase {
    type: ActionType.MOVE_TO;
    position: Position;
}
