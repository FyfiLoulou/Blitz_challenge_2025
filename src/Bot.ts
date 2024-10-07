import {Action, ActionType, GameMap, Position, TeamGameState, Threat, TileType} from './GameInterface';

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
        const mapDimension = getMapDimensions(gameState.map)
        const map = gameState.map.tiles
        const threatsPos = getThreatsPos(gameState.threats)
        const me = gameState.yourCharacter.position


        const possibleActions: Action[] = [
            {type: ActionType.MOVE_LEFT},
            {type: ActionType.MOVE_RIGHT},
            {type: ActionType.MOVE_UP},
            {type: ActionType.MOVE_DOWN},
        ];

        actions.push(randomlyChoose(possibleActions));

        // You can clearly do better than the random actions above. Have fun!!
        return actions;
    }
}

function randomlyChoose<T>(arr: T[]): T {
    return arr[Math.floor(arr.length * Math.random())];
}

/**
 * return map dimensions
 * * @param gameState
 */
const getMapDimensions = (map: GameMap): number => {
    return map.height * map.width
}

/**
 * return an array with threats position
 * @param threats
 */
const getThreatsPos = (threats: Threat[]): Position[] => {
    let t = []
    threats.forEach(threat => {
        // console.log(threat.position)
        t.push(threat.position)
    })
    return t
}

/**
 * return true if a threat is near
 * @param threats = array of threats
 * @param pos = our pos
 * @param danger = danger distance threshold
 */
const isThreatsNear = (threats: Threat[], pos: Position, danger: number): boolean => {
    let retVal = false
    threats.forEach(t => {
        if (getDist(pos, t.position) < danger) {
            retVal = true
        }
    })
    return retVal
}

/**
 * return distance between 2 points
 * @param p1
 * @param p2
 */
const getDist = (p1: Position, p2: Position): number => {
    return Math.abs(p1.x - p2.x) + Math.abs(p2.y - p1.y)
}

/**
 * return position x,y from closest threat
 * @param p
 * @param tPos
 */
const closest = (p: Position, tPos: Position[]): Position | null => {
    let c: Position | null = null
    let dist: number = Infinity

    tPos.forEach(t => {
        const d: number = getDist(p, t)
        if (d < dist) {
            dist = d
            c = t
        }
    })
    return c
}

