import { Action, ActionType, TeamGameState } from './GameInterface';

export class Bot {
    constructor() {
        console.log('Initializing your super duper mega bot');
        // This method should be use to initialize some variables you will need throughout the game.
    }

    /*
     * Here is where the magic happens, for now the moves are random. I bet you can do better ;)
     */
    getNextMoves(gameState: TeamGameState): Action[] {
        const actions: Action[] = [];
        const mapDimension = getMapDimensions(gameState)
        const map = gameState.map
        const threats = gameState.threats
        const me = gameState.yourCharacter
        
        console.log(map.tiles)

        const possibleActions: Action[] = [
            { type: ActionType.MOVE_LEFT },
            { type: ActionType.MOVE_RIGHT },
            { type: ActionType.MOVE_UP },
            { type: ActionType.MOVE_DOWN },
        ];

        actions.push(randomlyChoose(possibleActions));

        // You can clearly do better than the random actions above. Have fun!!
        return actions;
    }
}

function randomlyChoose<T>(arr: T[]): T {
    return arr[Math.floor(arr.length * Math.random())];
}

const getMapDimensions = (gameState: TeamGameState) => {
    return gameState.map.height * gameState.map.width
}
