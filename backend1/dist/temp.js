"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("./Game");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const game = new Game_1.Game(['b', 'g'], ['1', '2'], '123');
app.get('/', (req, res) => {
    res.send('Hello world');
});
app.post('/post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dice, move, currState } = req.body;
    game.makeMove(dice, move, currState);
    return res.send({ msg: "succerss" });
}));
app.listen(8000, () => console.log('sever started at port 8000'));
