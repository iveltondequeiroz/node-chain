const Wallet = require('../wallet');
const Transaction = require('../wallet/transaction');



class Miner {
	constructor(blockchain, transactionPool, wallet, p2pServer){
		this.blockchain = blockchain;
		this.transactionPool = transactionPool;
		this.wallet = wallet;
		this.p2pServer = p2pServer;
	}

	mine(){
		const validTransactions = this.transactionPool.validTransactions();
		validTransactions.push(
			Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet())
		);
		const block = this.blockchain.addBlock(validTransactions);
		this.p2pServer.syncChains();
		this.transactionPool.clear();
		// broadcast to every miner to clear their transaction pool
	}
}

module.exports = Miner;