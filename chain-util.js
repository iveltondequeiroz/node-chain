const EC = require('elliptic').ec;
const ec = new EC('sep256k1');

class ChainUtil {
	static genKeyPair(){
		return ec.genKeyPair();
	}
}

module.exports = ChainUtil;
