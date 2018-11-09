const { INITIAL_BALANCE } = require('../config');	

class Wallet{
	constructor(){
		this.balance = INITIAL_BALANCE;
		this.keyPair = null;
		this.publicKey = null;
	}

	toString(){
		return `Wallet -
				public key 	: ${this.publicKey.toString()}
				balance 		: #{this.balance}`
	}
}

module.exports = Wallet;