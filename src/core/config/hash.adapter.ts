import { SIX } from '../constants'
import * as nanoid from 'nanoid';

export const basicHash = {

    generateHash: (): string => {
        return nanoid.nanoid(SIX);
    }
}