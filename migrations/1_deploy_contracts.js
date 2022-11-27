var NFTCollection = artifacts.require("./NFTCollection.sol");
var NFTCollectionFactory = artifacts.require("./NFTCollectionFactory.sol");


module.exports = function(deployer) {
  deployer.deploy(NFTCollectionFactory);
  // deployer.deploy(NFTCollection,"ipfs://bafybeiecs3qivqpqgdupiwi2zvrqnxfki4xuh3m743edxxlj2p6icuaexm/galaxyGwFtM8/","Ugly Fishes","UGFI","ipfs://bafkreifocdinpnibbztphdu72tsvzvqoz2fsqoku456x3ajeorug3joc4u", 31, 1000000000000000, 5 );
};

