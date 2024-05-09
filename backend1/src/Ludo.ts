import { NOT_OPENED, OPENED, WON } from "./message";

export type GameResult = {
    nextMove: string,
    playerWon: boolean,
    diceWon: boolean,
    killOther: [boolean, string],
    rollDiceAgain: boolean
};

export class Ludo{
    private nonStoppage = new Map<string, [boolean, string]>();
    private stoppage = new Set<string>(['b14', 'b32', 'r14', 'r32', 'g14', 'g32', 'y14', 'y32']);
    private diceHaltMap = new Map<string, string[]>();
    private gridNumber: string[] = ['11', '12', '13', '15', '16', '21', '22', '23', '24', '25', '26', '31', '33', '34', '35', '36']
    private diceInitialPosition:string[] = [];
    private wonPlayer: number[] = [0, 0, 0, 0];
    private colorToIndexMap = new Map<string, number>([['b', 1], ['r', 2], ['g', 3], ['y', 4]]);

    constructor(diceColor:string[]){
        for(const color of diceColor){
            this.wonPlayer[this.colorToIndexMap.get(color) as number] =  4; 
            for(let i=0; i<4; i++){
                this.diceInitialPosition.push(color + i.toString());
            }
        }

        for(const color of ['b', 'r', 'g', 'y']){
            for(const num of this.gridNumber){
                this.nonStoppage.set(color + num, [false, '']);
            }
        }
    }

    private isStop(stop:string):boolean{
        return this.stoppage.has(stop);
    }

    private nextMove(color:string, move:number, currState:string): string{
        let num1: number = parseInt(currState.substring(1), 10);
        let num2: number = parseInt(currState.substring(2), 10);

        if(num1 === 0 && move === 6){
            return OPENED;
        }
        else if(num1 === 0 && move !== 6){
            return NOT_OPENED;
        }

        if(currState[1] === '1'){
            if(num1 + move <= 16){
                return currState[0] + (num1 + move).toString();
            }
            else if(currState[0] === color){
                // console.log(currState[0], '2' + ((num2 + move) % 6).toString());
                return currState[0] + '2' + ((num2 + move) % 6).toString();
            }
            else if((num2 + move) % 6 === 1){
                return currState[0] + '21';
            }
            else{
                // console.log(currState[0] + '3' + (((num2 + move) % 6) + 1));
                return currState[0] + '3' + (((num2 + move) % 6) - 1).toString();
            }
        }
        else if(currState[1] === '2'){
            if(currState[0] === color){
                if(num1 + move <= 26){
                    return currState[0] + (num1 + move).toString();
                }
                else if(num1 + move === 27){
                    return WON;
                }
                return currState;
            }
            return currState[0] + ((3*10)+move).toString();
        }
        else{
            if((num1 + move) <= 36){
                return currState[0] + (num1 + move).toString();
            }
            else if(currState[0] === 'b'){
                return 'r1' + ((num2 + move) % 6).toString();
            }
            else if(currState[0] === 'r'){
                return 'g1' + ((num2 + move) % 6).toString();
            }
            else if(currState[0] === 'g'){
                return 'y1' + ((num2 + move) % 6).toString();
            }
            return 'b1' + ((num2 + move) % 6).toString();
        }
    }

    makeMoves(dice:string, move:number, currState:string): GameResult{
        const next:string = this.nextMove(dice[0], move, currState);
        // check whether the player dice opened or not
        if(next === OPENED){
            this.diceInitialPosition = this.diceInitialPosition.filter(d => d != dice);
            return {
                nextMove: dice[0] + '32',
                playerWon: false,
                diceWon: false,
                killOther: [false, ''],
                rollDiceAgain: true,
            }
        }
        else if(next === NOT_OPENED){
            return {
                nextMove: '',
                playerWon: false,
                diceWon: false,
                killOther: [false, ''],
                rollDiceAgain: false,
            }
        }

        // remove the dice from the stoppage map
        if(this.isStop(currState)){
            let temp:string[] = this.diceHaltMap.get(next) ?? [];
            temp = temp.filter(d => d != dice);
            this.diceHaltMap.set(next, temp);
        }

        // remove the dice from the previous place
        this.nonStoppage.set(currState, [false, '']);

        // check whether the player won or not
        if(next === WON){
            const index = this.colorToIndexMap.get(dice[0]) as number;
            this.wonPlayer[index]--;
            if(this.wonPlayer[index] == 0){
                return {
                    nextMove: '',
                    playerWon: true,
                    diceWon: true,
                    killOther: [false, ''],
                    rollDiceAgain: true,
                }
            }
            return {
                nextMove: '',
                playerWon: true,
                diceWon: true,
                killOther: [false, ''],
                rollDiceAgain: true
            }
        }

        // add the dice to stoppage Map
        if(this.isStop(next)){
            const temp:string[] = this.diceHaltMap.get(next) ?? [];
            temp.push(dice);
            this.diceHaltMap.set(next, temp);
        }
        else{
            const temp = this.nonStoppage.get(next);
            // remove or place the dice to home or origin place and add the new dice
            if(temp && temp[0] === true){
                const killDiced: string = temp[1];
                this.diceInitialPosition.push(temp[1]);
                temp[1] = dice;
                this.nonStoppage.set(next, temp);
                return {
                    nextMove: next,
                    playerWon: false,
                    diceWon: false,
                    killOther: [true, killDiced],
                    rollDiceAgain: true,
                }
            }
            // else add the new dice
            else{
                this.nonStoppage.set(next, [true, dice]);
            }
        }

        return {
            nextMove: next,
            playerWon: false,
            diceWon: false,
            killOther: [false, ''],
            rollDiceAgain: move === 6 ? true : false,
        }
    }
}