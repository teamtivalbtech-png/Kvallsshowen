export interface Player{id:string;name:string;avatar:string;photo?:string;color:string;team:number;connected:boolean;seen:number;bot?:boolean}
export type PV=any;
export interface Api{
  code():string;
  players():Player[]; online():Player[]; /** Spelledarens id */ host():string|undefined; refresh():void; award(pid:string,pts:number):void; raw(pid:string):number;
  after(ms:number,fn:()=>void):void; every(ms:number,fn:()=>void):void; clearTimers():void;
  countdown(ms:number,fn:()=>void):void; deadline():number; stopCountdown():void;
  now():number; stat(p:string,k:string,n:number):void; keep(src:string,cap:string):void; custom():any[]; mission(p:string):string|undefined; say(t:string,s?:string):void; quip(ok:boolean):void; sfx(n:string):void; music(n:string|null):void; end():void;
  mode():'solo'|'team'; teams():{id:number;name:string;color:string;members:Player[]}[]; 
  used(key:string,n:number,pool:number,only?:(i:number)=>boolean):number[]; isFinal():boolean; total(pid:string):number;
}
export interface Inst{start():void;onInput?(pid:string,d:any):void;onStream?(pid:string,d:any):void;tick?(dt:number):void;phone(pid:string):PV;onLeave?(pid:string):void}
export interface GameDef{id:string;title:string;tag:string;how:string;cat:string;icon:string;min?:number;max?:number;humans?:number;mins:number;long?:boolean;needs?:string;make:(a:Api)=>Inst;Tv:any;finalOnly?:boolean;direct?:boolean}
