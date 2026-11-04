import {QUIZG} from './quiz';import {MEDIAG} from './media';import {SOCIALG} from './social';import {ACTIONG} from './action';import {MINDG} from './mind';import {EXTRAG} from './extras';import {GameDef} from '../types';
export const GAMES:GameDef[]=[...ACTIONG,...QUIZG,...MEDIAG,...SOCIALG,...MINDG,...EXTRAG] as any;
export const byId=(id:string)=>GAMES.find(g=>g.id===id)!;
