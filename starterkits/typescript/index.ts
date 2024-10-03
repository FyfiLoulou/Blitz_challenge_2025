// You shouldn't have to modify this code since it only contains the communication between the server and your bot.
// Your code logic should be in ./Bot.ts.
import WebSocket from 'ws';
import { Bot } from './Bot';
import { Action, TeamGameState } from './GameInterface';

const webSocket = new WebSocket('ws://0.0.0.0:8765');
let bot: Bot;

webSocket.onopen = (event: WebSocket.OpenEvent) => {
    bot = new Bot();
    if (process.env.TOKEN) {
        webSocket.send(JSON.stringify({ type: 'REGISTER', token: process.env.TOKEN }));
    } else {
        webSocket.send(JSON.stringify({ type: 'REGISTER', teamName: 'MyBot TypeScript' }));
    }
};

webSocket.onmessage = (message: WebSocket.MessageEvent) => {
    const gameMessage: TeamGameState = JSON.parse(message.data.toString());

    console.log(`Playing tick ${gameMessage.currentTickNumber}`);

    let actions: Action[] = [];

    // Just so your bot doesn't completely crash. ;)
    try {
        actions = bot.getNextMoves(gameMessage);
    } catch (exception) {
        console.log(`Exception while getting next moves: ${exception.stack}`);
    }

    webSocket.send(
        JSON.stringify({
            type: 'COMMAND',
            tick: gameMessage.currentTickNumber,
            actions: actions,
        }),
    );
};
