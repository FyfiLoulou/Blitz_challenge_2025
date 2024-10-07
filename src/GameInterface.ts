/**
 * Team Game State Interface
 *
 * Represents the current state of the game, including the tick information, character details,
 * threats, and the game map.
 */
export interface TeamGameState {
    type: string;  // The type of game state (e.g., "team_game")
    tick: number;  // The current tick count of the game
    currentTickNumber: number;  // The number of the current tick in the game cycle
    lastTickErrors: Array<string>;  // An array of errors from the last tick
    constants: Constants;  // Game constants relevant to the current game state
    yourCharacter: YourCharacter;  // Details about the player's character
    threats: Array<Threat>;  // An array of threats present in the game
    map: GameMap;  // The game map
}

/**
 * Constants Interface
 *
 * Represents any constants used within the game. This interface can be expanded to include
 * specific constant values as needed.
 */
export interface Constants {}

/**
 * Threat Interface
 *
 * Represents a threat in the game, which could be another character or an environmental hazard.
 */
export interface Threat {
    position: Position;  // The position of the threat on the map
    direction: string;  // The direction the threat is moving
    personality: string;  // Describes the personality type of the threat
    style: string;  // Describes the style of the threat (e.g., aggressive, defensive)
}

/**
 * Your Character Interface
 *
 * Contains information about the player's character in the game.
 */
export interface YourCharacter {
    id: string;  // The unique identifier for the character
    teamId: string;  // The team identifier the character belongs to
    position: Position;  // The current position of the character on the map
    alive: boolean;  // Indicates whether the character is alive
    spawnPoint: Position;  // The spawn point of the character
    distances: Array<Array<number>>;  // Distance matrix for various positions on the map
}

/**
 * Game Map Interface
 *
 * Represents the game map, including its dimensions and the types of tiles it contains.
 */
export interface GameMap {
    width: number;  // The width of the game map in tiles
    height: number;  // The height of the game map in tiles
    tiles: Array<Array<TileType>>;  // A 2D array representing the types of tiles in the map
}

/**
 * Position Interface
 *
 * Represents a position on the game map using x and y coordinates.
 */
export interface Position {
    x: number;  // The x-coordinate of the position
    y: number;  // The y-coordinate of the position
}

/**
 * Tile Type Enum
 *
 * Represents the different types of tiles that can exist on the game map.
 */
export enum TileType {
    EMPTY = 'EMPTY',  // Represents an empty tile
    WALL = 'WALL',    // Represents a wall tile
}

/**
 * Action Type Enum
 *
 * Represents the possible actions that can be taken by a character in the game.
 */
export enum ActionType {
    MOVE_LEFT = 'MOVE_LEFT',  // Move the character left
    MOVE_RIGHT = 'MOVE_RIGHT', // Move the character right
    MOVE_UP = 'MOVE_UP',       // Move the character up
    MOVE_DOWN = 'MOVE_DOWN',   // Move the character down
    MOVE_TO = 'MOVE_TO',       // Move the character to a specific position
}

/**
 * Action Type Union
 *
 * Represents a type that can be any action available in the game.
 */
export type Action = ActionMoveLeft | ActionMoveRight | ActionMoveUp | ActionMoveDown | ActionMoveTo;

/**
 * Action Base Interface
 *
 * Base interface for all action types, containing the action type.
 */
interface ActionBase {
    type: ActionType;  // The type of action being performed
}

/**
 * Action Move Left Interface
 *
 * Represents an action to move the character left.
 */
export interface ActionMoveLeft extends ActionBase {
    type: ActionType.MOVE_LEFT;  // The action type
}

/**
 * Action Move Right Interface
 *
 * Represents an action to move the character right.
 */
export interface ActionMoveRight extends ActionBase {
    type: ActionType.MOVE_RIGHT;  // The action type
}

/**
 * Action Move Up Interface
 *
 * Represents an action to move the character up.
 */
export interface ActionMoveUp extends ActionBase {
    type: ActionType.MOVE_UP;  // The action type
}

/**
 * Action Move Down Interface
 *
 * Represents an action to move the character down.
 */
export interface ActionMoveDown extends ActionBase {
    type: ActionType.MOVE_DOWN;  // The action type
}

/**
 * Action Move To Interface
 *
 * Represents an action to move the character to a specific position on the map.
 */
export interface ActionMoveTo extends ActionBase {
    type: ActionType.MOVE_TO;  // The action type
    position: Position;         // The target position to move to
}
