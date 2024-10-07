import {Action, ActionType, GameMap, Position, TeamGameState, Threat, TileType} from './GameInterface';

/**
 * Bot Class
 *
 * Represents a bot that makes decisions in the game based on the current game state.
 */
export class Bot {
    constructor() {
        console.log('Initializing your super duper mega bot');
        // This constructor initializes any necessary variables for the bot's operation.
    }

    /**
     * Determines the next moves for the bot based on the current game state.
     * Currently, the moves are chosen randomly, but this can be improved with better logic.
     *
     * @param gameState - The current state of the game.
     * @returns An array of actions that the bot will take.
     */
    getNextMoves(gameState: TeamGameState): Action[] {
        const actions: Action[] = [];
        const mapDimension = getMapDimensions(gameState.map);
        const map = gameState.map.tiles;
        const threatsPos = getThreatsPos(gameState.threats);
        const me = gameState.yourCharacter.position;

        // Possible actions the bot can take.
        const possibleActions: Action[] = [
            {type: ActionType.MOVE_LEFT},
            {type: ActionType.MOVE_RIGHT},
            {type: ActionType.MOVE_UP},
            {type: ActionType.MOVE_DOWN},
        ];

        // Choose a random action from the possible actions.
        actions.push(randomlyChoose(possibleActions));

        // The bot can implement more sophisticated strategies for choosing actions.
        return actions;
    }
}

/**
 * Chooses a random element from an array.
 *
 * @param arr - The array from which to choose an element.
 * @returns A randomly selected element from the array.
 */
function randomlyChoose<T>(arr: T[]): T {
    return arr[Math.floor(arr.length * Math.random())];
}

/**
 * Returns the dimensions of the game map.
 *
 * @param map - The game map for which dimensions are to be calculated.
 * @returns The total number of tiles in the map (width * height).
 */
const getMapDimensions = (map: GameMap): number => {
    return map.height * map.width;
}

/**
 * Returns an array of positions representing the locations of threats.
 *
 * @param threats - An array of Threat objects.
 * @returns An array of Position objects representing the locations of each threat.
 */
const getThreatsPos = (threats: Threat[]): Position[] => {
    let t: Position[] = [];
    threats.forEach(threat => {
        t.push(threat.position);
    });
    return t;
}

/**
 * Checks if any threats are near the specified position.
 *
 * @param threats - An array of Threat objects.
 * @param pos - The current position of the character.
 * @param danger - The distance threshold for considering a threat to be near.
 * @returns True if any threat is within the danger distance, otherwise false.
 */
const isThreatsNear = (threats: Threat[], pos: Position, danger: number): boolean => {
    let retVal = false;
    threats.forEach(t => {
        if (getDist(pos, t.position) < danger) {
            retVal = true;
        }
    });
    return retVal;
}

/**
 * Calculates the Manhattan distance between two points.
 *
 * @param p1 - The first position.
 * @param p2 - The second position.
 * @returns The distance between the two points.
 */
const getDist = (p1: Position, p2: Position): number => {
    return Math.abs(p1.x - p2.x) + Math.abs(p2.y - p1.y);
}

/**
 * Finds the closest position to a given point from an array of positions.
 *
 * @param p - The reference position.
 * @param tPos - An array of positions to check against.
 * @returns The closest position to p from tPos, or null if tPos is empty.
 */
const closest = (p: Position, tPos: Position[]): Position | null => {
    let c: Position | null = null;
    let dist: number = Infinity;

    tPos.forEach(t => {
        const d: number = getDist(p, t);
        if (d < dist) {
            dist = d;
            c = t;
        }
    });
    return c;
}
