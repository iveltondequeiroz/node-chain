const Block = require('./block');

class Blockchain{
	constructor(){
		this.chain = [Block.genesis()];
	}

	addBlock(data){
		const lastBlock = this.chain[this.chain.length-1];
		const block = Block.mineBlock(lastBlock, data);
		this.chain.push(block);

		return block;
	}

	isValidChain(chain){
		// verify genesis block
		if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
			return false;
		}
		// verify if chain is corrupted 
		for(let i=1; i<chain.length; i++){
			const block = chain[i];
			const lastBlock = chain[i-1];

			if(block.lastHash !== lastBlock.hash || 
				block.hash !== Block.blockHash(block)) {
				return false;
			}
		}
		return true;
	}

	replaceChain(newChain){
		// verify the longer chain
		if(newChain.length<=this.chain.length) {
			console.log('received chain is no longer than current chain');
			return;
		}	else if(!this.isValidChain(newChain)){
			console.log('received chain is invalid');
			return;
		}
		console.log('replacing blockchain with the new chain');
		this.chain = newChain;
	}	
}



module.exports = Blockchain;