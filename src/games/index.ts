import {QUIZG} from './quiz';import {MEDIAG} from './media';import {SOCIALG} from './social';import {ACTIONG} from './action';import {MINDG} from './mind';import {GameDef} from '../types';
export const GAMES:GameDef[]=[...ACTIONG,...QUIZG,...MEDIAG,...SOCIALG,...MINDG] as any;
export const byId=(id:string)=>GAMES.find(g=>g.id===id)!;
