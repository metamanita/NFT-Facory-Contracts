var NFTCollection = artifacts.require("./NFTCollection.sol");

const contractURI = {
  "name": "Fishes",
  "description": "Fishes are adorable ugly aquatic beings primarily for demonstrating what can be done using the OpenSea platform. Adopt one today to try out all the OpenSea buying, selling, and bidding feature set.",
  "image": "ipfs://bafybeibiltyh5ocmgcnjwe27ohjghrpd2evpkjiz24xbq7vij74imznvwy/images/31.gif",
  "external_link": "",
  "seller_fee_basis_points": 100,
  "fee_recipient": "0xA0535a75df35A6DD73F0edbECF2517e0Aee61Ad3" 
}
module.exports = function(deployer) {
  deployer.deploy(NFTCollection,"ipfs://bafybeiecs3qivqpqgdupiwi2zvrqnxfki4xuh3m743edxxlj2p6icuaexm/galaxyGwFtM8/","Ugly Fishes","UGFI",contractURI);
};