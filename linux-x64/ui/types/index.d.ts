export interface Size {
    width: number;
    height: number;
}
export interface Vector {
    x: number;
    y: number;
}
export interface GameConstants {
    world: Size;
}
export declare enum TileType {
    EMPTY = "EMPTY",
    WALL = "WALL"
}
type Direction = 'up' | 'down' | 'left' | 'right';
export type ThreatStyle = 'straitHead' | 'girouette' | 'aggressive' | 'surveillance' | 'le_fantome_orange_dans_pacman';
export interface Threat {
    position: Vector;
    direction: Direction;
    personality: string;
    style: ThreatStyle;
}
export interface Tick {
    currentTickNumber: number;
    character: Character;
    constants: GameConstants;
    map: GameMap;
    mapName: string;
    pellets: Array<Vector>;
    score: Map<string, number>;
    teamIds: Array<string>;
    teamZoneGridPerIndex: Array<Array<number>>;
    threats: Array<Threat>;
}
export interface GameMap {
    height: number;
    width: number;
    tiles: Array<Array<number>>;
}
export interface Character {
    alive: boolean;
    id: string;
    position: Vector;
    spawnPoint: Vector;
    direction: Direction | null;
}
export interface AdditionalProperties {
}
export {};
