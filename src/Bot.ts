import { createEmitAndSemanticDiagnosticsBuilderProgram, createModuleResolutionCache, flattenDiagnosticMessageText, getNameOfJSDocTypedef } from 'typescript';
import { Action, ActionType, GameMap, Position, TeamGameState, Threat, TileType } from './GameInterface';
import * as assert from "assert";

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

    // Possible actions the bot can take.
    possibleActions: Action[] = [
        { type: ActionType.MOVE_LEFT },
        { type: ActionType.MOVE_RIGHT },
        { type: ActionType.MOVE_UP },
        { type: ActionType.MOVE_DOWN },
    ]

    /**
     * Determines the next moves for the bot based on the current game state.
     * Currently, the moves are chosen randomly, but this can be improved with better logic.
     *
     * @param gameState - The current state of the game.
     * @returns An array of actions that the bot will take.
     */
    getNextMoves(gameState: TeamGameState): Action[] {
        const actions: Action[] = [];
        /*
        const me = gameState.yourCharacter.position;
        let tick = gameState.currentTickNumber
        let enemyMoveTicksRemaining = tick % 5

        if (tick == 1) {
            console.log(gameState.threats)
            console.log(getMapDimensions(gameState.map))
            console.log(gameState.map.tiles)
        }


        // Choose a random action from the possible actions.
        actions.push(randomlyChoose(this.possibleActions));
*/
        return dodgeThreats(gameState)
    }
    /*
        flee = (closest: Threat[], me: Position, gameMap: string[][]): Action[] => {
            console.log("A")
            let p = me;
            let move = [];
    
            // Determine potential move position based on threat direction
            let targetPosition;
            if (d == "up") targetPosition = { x: p.x, y: p.y - 1 };  // Move up
            else if (d == "down") targetPosition = { x: p.x, y: p.y + 1 }; // Move down
            else if (d == "left") targetPosition = { x: p.x - 1, y: p.y }; // Move left
            else if (d == "right") targetPosition = { x: p.x + 1, y: p.y }; // Move right
    
            // Check if the target position is EMPTY
            if (gameMap[targetPosition.y][targetPosition.x] === 'EMPTY') {
                // Choose the corresponding action
                if (d == "up") move.push(this.possibleActions[2]); // Move up
                else if (d == "down") move.push(this.possibleActions[3]); // Move down
                else if (d == "left") move.push(this.possibleActions[0]); // Move left
                else if (d == "right") move.push(this.possibleActions[1]); // Move right
            } else {
                // If the direct move isn't possible, find an alternative EMPTY tile
                move = this.findAlternativeMove(p, gameMap);
            }
    
            return move;
        };
    */
    // Function to find an alternative move to an EMPTY tile
    findAlternativeMove = (position: Position, gameMap: string[][]): Action[] => {
        console.log("b")
        const directions = [
            { action: this.possibleActions[0], x: position.x - 1, y: position.y }, // Left
            { action: this.possibleActions[1], x: position.x + 1, y: position.y }, // Right
            { action: this.possibleActions[2], x: position.x, y: position.y - 1 }, // Up
            { action: this.possibleActions[3], x: position.x, y: position.y + 1 }  // Down
        ];

        for (let dir of directions) {
            if (dir.x >= 0 && dir.x < gameMap[0].length && dir.y >= 0 && dir.y < gameMap.length) {
                if (gameMap[dir.y][dir.x] === 'EMPTY') {
                    return [dir.action]; // Return the action to move to the EMPTY tile
                }
            }
        }
    };

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
 * @returns True if any threat is within the danger distance, otherwise false.
 */
const getThreatsNear = (threats: Threat[], pos: Position): Threat[] => {
    return threats.sort((t1, t2) => getDist(t1.position, pos) - getDist(t2.position, pos))
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
 * @param t
 * @returns The closest position to p from tPos, or null if tPos is empty.
 */
const closest = (p: Position, t: Threat[]): Threat | null => {
    let c: Threat | null = null;
    let dist: number = Infinity;

    t.forEach(t => {
        const d: number = getDist(p, t.position);
        if (d < dist) {
            dist = d;
            c = t;
        }
    });
    return c;
}

const getNeighborTiles = (p: Position, m) => {
    let retVal = []
    retVal[0] = [m[p.x], m[p.y + 1]] //up
    retVal[1] = [m[p.x], m[p.y - 1]] //down
    retVal[2] = [m[p.x + 1], m[p.y]] // right
    retVal[3] = [m[p.x - 1], m[p.y]] //left
    return retVal
}

function dodgeThreats(gameState: TeamGameState): Action[] {
    const actions: Action[] = [];
    const myCharacter = gameState.yourCharacter;
    const threats = gameState.threats;

    // Possible movements in relation to the current position
    const potentialMoves: { [key: string]: Position } = {
        MOVE_LEFT: { x: myCharacter.position.x - 1, y: myCharacter.position.y },
        MOVE_RIGHT: { x: myCharacter.position.x + 1, y: myCharacter.position.y },
        MOVE_UP: { x: myCharacter.position.x, y: myCharacter.position.y - 1 },
        MOVE_DOWN: { x: myCharacter.position.x, y: myCharacter.position.y + 1 }
    };

    // Create a set of unsafe moves based on threats' positions
    const unsafeMoves = new Set<string>();

    // Gather positions of threats for easy lookup
    const threatPositions = new Set<string>(
        threats.map(threat => `${threat.position.x},${threat.position.y}`)
    );

    // Evaluate possible actions and filter out unsafe moves
    for (const action of Object.keys(potentialMoves)) {
        const targetPosition = potentialMoves[action];

        // Check if the move is within the bounds of the game map and not on a wall or a threat
        if (
            targetPosition.x >= 0 && 
            targetPosition.x < gameState.map.width && 
            targetPosition.y >= 0 && 
            targetPosition.y < gameState.map.height &&
            gameState.map.tiles[targetPosition.y][targetPosition.x] !== TileType.WALL &&
            !threatPositions.has(`${targetPosition.x},${targetPosition.y}`)
        ) {
            // If it's safe to move, create the action object based on action type
            switch (action) {
                case 'MOVE_LEFT':
                    actions.push({ type: ActionType.MOVE_LEFT });
                    break;
                case 'MOVE_RIGHT':
                    actions.push({ type: ActionType.MOVE_RIGHT });
                    break;
                case 'MOVE_UP':
                    actions.push({ type: ActionType.MOVE_UP });
                    break;
                case 'MOVE_DOWN':
                    actions.push({ type: ActionType.MOVE_DOWN });
                    break;
            }
        }
    }

    // If no valid actions, consider a random movement as a fallback
    if (actions.length === 0) {
        // Fallback logic: Pick a random action that is valid
        actions.push(randomlyChoose(Object.values(ActionType)));
    }

    return actions;
}


/**
 * Chooses a random action from the ActionType enum and returns it as an Action.
 * 
 * @param actions An array of possible action types.
 * @returns A randomly selected action as an Action type.
 */
function randomlyChoose(actions: ActionType[]): Action {
    const randomActionType = actions[Math.floor(Math.random() * actions.length)];

    // Return the action in the correct format
    switch (randomActionType) {
        case ActionType.MOVE_LEFT:
            return { type: ActionType.MOVE_LEFT };
        case ActionType.MOVE_RIGHT:
            return { type: ActionType.MOVE_RIGHT };
        case ActionType.MOVE_UP:
            return { type: ActionType.MOVE_UP };
        case ActionType.MOVE_DOWN:
            return { type: ActionType.MOVE_DOWN };
        default:
            throw new Error('Unknown action type');  // For safety, though this should not occur
    }
}

