
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express'
import expressWs from 'express-ws'
import http from 'http'

let port = 3000;

let app = express();
let server = http.createServer(app).listen(port);    

expressWs(app, server);

app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
    res.status(200).send("Welcome to our app");
});

app.ws('/ws', async function(ws, req) {
    ws.on('message', async function(msg) {

        console.log(msg);

        ws.send(JSON.stringify({
            "append" : true,
            "returnText" : "I am using WebSockets!"
        }));
    });
});