"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const crypto_1 = require("crypto");
const Ludo_1 = require("./Ludo");
class Game {
    constructor(diceColor, playerId, gameId) {
        this.diceColor = [];
        this.playerId = [];
        this.wonCount = 0;
        this.diceColor = diceColor;
        this.playerId = playerId;
        this.gameId = gameId !== null && gameId !== void 0 ? gameId : (0, crypto_1.randomUUID)();
        this.board = new Ludo_1.Ludo(diceColor);
    }
    makeMove(dice, move, currState) {
        const result = this.board.makeMoves(dice, move, currState);
        // if(result.playerWon){
        //     console.log(dice[0] + ' player won');
        //     this.wonCount++;
        //     if(this.wonCount === this.playerId.length - 1){
        //         // return GAME_OVER;
        //         console.log(GAME_OVER);
        //     }
        // }
        console.log(result);
    }
}
exports.Game = Game;
;
