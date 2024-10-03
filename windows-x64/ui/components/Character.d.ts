import { FC } from 'react';
import type { Character, Threat } from '../types';
import { Constants } from './PlayZone';
interface CharacterSpriteProps {
    character: Character;
    constants: Constants;
    isThreat?: boolean;
    threatType?: Threat;
}
export declare const CharacterSprite: FC<CharacterSpriteProps>;
export {};
