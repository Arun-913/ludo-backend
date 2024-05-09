import { Game } from "./Game";
import express from 'express';
const app = express()

app.use(express.json());

const game = new Game(['b', 'g'], ['1', '2'], '123');

app.get('/', (req, res)=>{
    res.send('Hello world');
});

app.post('/make-move', async(req, res)=>{
    const { dice, move, currState } = req.body;
    game.makeMove(dice, move, currState);
    return res.send({msg: "succerss"});
});

app.listen(8000, () => console.log('sever started at port 8000'));