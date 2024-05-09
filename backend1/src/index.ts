import express from 'express';
import { WebSocketServer } from 'ws';
import { GameResult, Ludo } from './Ludo';

const app = express();
// b = Blue, r = Red, g = Green, y = Yellow
const ludo = new Ludo(['b', 'r', 'g', 'y']);

app.get('/', (req, res)=>{
  return res.send("Ludo Game here!");
})

app.post('/post', async(req, res)=>{
  const { dice, move, currState } = req.body;
  if(move <= 0 || move >= 7){
    console.log('Invalid Move');
    return;
  }
  const result:GameResult = ludo.makeMoves(dice, move, currState);
  console.log(result);
  return res.json(result);
});