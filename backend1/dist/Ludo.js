"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ludo = void 0;
const message_1 = require("./message");
class Ludo {
    constructor(diceColor) {
        this.nonStoppage = new Map();
        this.stoppage = new Set(['b14', 'b32', 'r14', 'r32', 'g14', 'g32', 'y14', 'y32']);
        this.diceHaltMap = new Map();
        this.gridNumber = ['11', '12', '13', '15', '16', '21', '22', '23', '24', '25', '26', '31', '33', '34', '35', '36'];
        this.diceInitialPosition = [];
        this.wonPlayer = [0, 0, 0, 0];
        this.colorToIndexMap = new Map([['b', 1], ['r', 2], ['g', 3], ['y', 4]]);
        for (const color of diceColor) {
            this.wonPlayer[this.colorToIndexMap.get(color)] = 4;
            for (let i = 0; i < 4; i++) {
                this.diceInitialPosition.push(color + i.toString());
            }
        }
        for (const color of ['b', 'r', 'g', 'y']) {
            for (const num of this.gridNumber) {
                this.nonStoppage.set(color + num, [false, '']);
            }
        }
    }
    isStop(stop) {
        return this.stoppage.has(stop);
    }
    nextMove(color, move, currState) {
        let num1 = parseInt(currState.substring(1), 10);
        let num2 = parseInt(currState.substring(2), 10);
        if (num1 === 0 && move === 6) {
            return message_1.OPENED;
        }
        else if (num1 === 0 && move !== 6) {
            return message_1.NOT_OPENED;
        }
        if (currState[1] === '1') {
            if (num1 + move <= 16) {
                return currState[0] + (num1 + move).toString();
            }
            else if (currState[0] === color) {
                // console.log(currState[0], '2' + ((num2 + move) % 6).toString());
                return currState[0] + '2' + ((num2 + move) % 6).toString();
            }
            else if ((num2 + move) % 6 === 1) {
                return currState[0] + '21';
            }
            else {
                // console.log(currState[0] + '3' + (((num2 + move) % 6) + 1));
                return currState[0] + '3' + (((num2 + move) % 6) - 1).toString();
            }
        }
        else if (currState[1] === '2') {
            if (currState[0] === color) {
                if (num1 + move <= 26) {
                    return currState[0] + (num1 + move).toString();
                }
                else if (num1 + move === 27) {
                    return 'won';
                }
                return currState;
            }
            return currState[0] + ((3 * 10) + move).toString();
        }
        else {
            if ((num1 + move) <= 36) {
                return currState[0] + (num1 + move).toString();
            }
            else if (currState[0] === 'b') {
                return 'r1' + ((num2 + move) % 6).toString();
            }
            else if (currState[0] === 'r') {
                return 'g1' + ((num2 + move) % 6).toString();
            }
            else if (currState[0] === 'g') {
                return 'y1' + ((num2 + move) % 6).toString();
            }
            return 'b1' + ((num2 + move) % 6).toString();
        }
    }
    makeMoves(dice, move, currState) {
        var _a, _b;
        const next = this.nextMove(dice[0], move, currState);
        // check whether the player dice opened or not
        if (next === message_1.OPENED) {
            this.diceInitialPosition = this.diceInitialPosition.filter(d => d != dice);
            return {
                nextMove: dice[0] + '32',
                playerWon: false,
                diceWon: false,
                killOther: [false, ''],
                rollDiceAgain: true,
            };
        }
        else if (next === message_1.NOT_OPENED) {
            return {
                nextMove: '',
                playerWon: false,
                diceWon: false,
                killOther: [false, ''],
                rollDiceAgain: false,
            };
        }
        // remove the dice from the stoppage map
        if (this.isStop(currState)) {
            let temp = (_a = this.diceHaltMap.get(next)) !== null && _a !== void 0 ? _a : [];
            temp = temp.filter(d => d != dice);
            this.diceHaltMap.set(next, temp);
        }
        // remove the dice from the previous place
        this.nonStoppage.set(currState, [false, '']);
        // check whether the player won or not
        if (next === 'won') {
            const index = this.colorToIndexMap.get(dice[0]);
            this.wonPlayer[index]--;
            if (this.wonPlayer[index] == 0) {
                return {
                    nextMove: '',
                    playerWon: true,
                    diceWon: true,
                    killOther: [false, ''],
                    rollDiceAgain: true,
                };
            }
            return {
                nextMove: '',
                playerWon: true,
                diceWon: true,
                killOther: [false, ''],
                rollDiceAgain: true
            };
        }
        // add the dice to stoppage Map
        if (this.isStop(next)) {
            const temp = (_b = this.diceHaltMap.get(next)) !== null && _b !== void 0 ? _b : [];
            temp.push(dice);
            this.diceHaltMap.set(next, temp);
        }
        else {
            const temp = this.nonStoppage.get(next);
            // remove or place the dice to home or origin place and add the new dice
            if (temp && temp[0] === true) {
                const killDiced = temp[1];
                this.diceInitialPosition.push(temp[1]);
                temp[1] = dice;
                this.nonStoppage.set(next, temp);
                return {
                    nextMove: next,
                    playerWon: false,
                    diceWon: false,
                    killOther: [true, killDiced],
                    rollDiceAgain: true,
                };
            }
            // else add the new dice
            else {
                this.nonStoppage.set(next, [true, dice]);
            }
        }
        return {
            nextMove: next,
            playerWon: false,
            diceWon: false,
            killOther: [false, ''],
            rollDiceAgain: move === 6 ? true : false,
        };
    }
}
exports.Ludo = Ludo;
