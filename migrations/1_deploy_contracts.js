var NFTCollection = artifacts.require("./NFTCollection.sol");


module.exports = function(deployer) {
  deployer.deploy(NFTCollection,"ipfs://bafybeiecs3qivqpqgdupiwi2zvrqnxfki4xuh3m743edxxlj2p6icuaexm/galaxyGwFtM8/","Ugly Fishes","UGFI","ipfs://bafkreifocdinpnibbztphdu72tsvzvqoz2fsqoku456x3ajeorug3joc4u");
};