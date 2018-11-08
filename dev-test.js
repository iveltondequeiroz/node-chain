const Block = require('./block')
//const block = new Block();

const block = new Block('foo', 'bar', 'zoo', 'foodata');
console.log(block.toString())

console.log(Block.genesis().toString())

console.log("test")
