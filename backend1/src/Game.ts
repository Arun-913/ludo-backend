import { randomUUID } from 'crypto';
import { Ludo, GameResult } from './Ludo';
import { GAME_OVER } from './message';

export class Game{
    public gameId: string;
    public diceColor: string[] = [];
    public playerId: string[] = [];
    public board;
    public wonCount:number = 0;
 
    constructor(diceColor:string[], playerId:string[], gameId?: string){
        this.diceColor = diceColor;
        this.playerId = playerId;
        this.gameId = gameId ?? randomUUID();
        this.board = new Ludo(diceColor);
    }

    makeMove(dice:string, move:number, currState:string){
        const result:GameResult = this.board.makeMoves(dice, move, currState);
        console.log(result);
    }
};
