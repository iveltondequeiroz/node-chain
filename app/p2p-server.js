const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT ||5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];
// $ HTTP_PORT=3002 P2P_PORT=5003 peers=ws://localhost:5001,ws://localhost:5002 npm run dev 

class P2PServer {
	constructor(blockchain){
		this.blockchain = blockchain;
		this.sockets = [];
	}

	listen(){
		const server = new Websocket.Server({port: P2P_PORT});
		server.on('connection', socket => this.connectSocket(socket));
		this.connectToPeers();
		console.log(`istening for p2p connections on: ${P2P_PORT}`); 
	}

	connectToPeers(){
		peers.forEach( peer => {
			// ws://localhost:5001
			const socket = new Websocket(peer);
			socket.on('open', () => this.connectSocket(socket));
		});
	}

	connectSocket(socket){
		this.sockets.push(socket);
		console.log('socket connect');

		this.messageHandler(socket);

		socket.send(JSON.stringify(this.blockchain.chain));
	}

	messageHandler(socket){
		socket.on('message', message => {
			const data = JSON.parse(message);
			console.log('data', data);
		})
	}
}

module.exports = P2PServer;
