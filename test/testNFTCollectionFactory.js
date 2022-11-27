const NFTCollectionFactory = artifacts.require("NFTCollectionFactory");
const NFTCollection = artifacts.require("NFTCollection");
const { faker } = require('@faker-js/faker')
const { expect } = require('chai');
const { ethers } = require('ethers');
const truffleAssert = require('truffle-assertions');
// Import utilities from Test Helpers
const {
  BN,           // Big Number support
  constants,    // Common constants, like the zero address and largest integers
  expectEvent,  // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');
const { exitCode } = require('process');
const { assert } = require('console');



/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("NFTCollectionFactory", function ([factoryOwner, collectionDeployer, minter]) {
  // const value = new BN('42')
  const baseURI = faker.internet.url();
  const tokenName = faker.random.words();
  const tokenSymbol = faker.random.alphaNumeric(7);
  const contractURI = faker.internet.url();
  const tokenMaxSupply = faker.random.numeric(3);
  const price=ethers.utils.parseUnits(String(faker.finance.amount(5, 10, 4)), 'ether');
  const maxPerMint = faker.random.numeric();

  beforeEach(async function () {
    // Deploy a new Counter contract for each test
    // this.collection = await NFTCollectionFactory.new(baseURI, tokenName, tokenSymbol, contractURI, 10, ethers.utils.parseUnits("0.02", 'ether'), 5); // 1000000000000000
    this.collectionFactory = await NFTCollectionFactory.new({from: factoryOwner}); // 1000000000000000
  });

  it("is deployed", async function () {
    await NFTCollectionFactory.deployed();
    return expect(true);
  });

  it("can deploy an NFTCollection for a sender", async function () {
    reciept = await this.collectionFactory.createInstance(
      baseURI,
       tokenName, 
       tokenSymbol, 
       contractURI, 
       tokenMaxSupply, 
       price, 
       maxPerMint,
        { from: collectionDeployer });
    return this.collectionFactory.deployedContracts(0)
      .then((address) => {
        return NFTCollection.at(address).then((newContract) => {
          return newContract.owner().then((newOwner) => {
            return expect(newOwner).to.be.equal(collectionDeployer)
          })
        });
      });
  });

  it("counts deployed contracts", async function () {
    first = await this.collectionFactory.createInstance(
      baseURI,
       tokenName, 
       tokenSymbol, 
       contractURI, 
       tokenMaxSupply, 
       price, 
       maxPerMint,
        { from: collectionDeployer });
    firstCount = await this.collectionFactory.deployedCounter()

    expect( Number(firstCount)).to.be.equal(1)

    second = await this.collectionFactory.createInstance(
      baseURI + "2",
       tokenName + "2", 
       tokenSymbol + "2", 
       contractURI + "2", 
       tokenMaxSupply + 2, 
       price , 
       maxPerMint + 2,
        { from: collectionDeployer });
    secondCount = await this.collectionFactory.deployedCounter()
    
    expect(Number(secondCount)).to.be.equal(2)
  });

  it.skip("can mint an NFT", async function () {
    const initBalance = await this.collection.balanceOf(collectionDeployer);

    receipt = await this.collection.mintNFTs(1, { from: collectionDeployer, value: ethers.utils.parseUnits("2", 'ether') });

    const finalBalance = await this.collection.balanceOf(collectionDeployer);
    expect(finalBalance).to.be.bignumber.equal((initBalance + 1));
    expectEvent(receipt, 'Transfer', {
      from: constants.ZERO_ADDRESS,
      to: collectionDeployer,
    });
  })



  // it("allows only owner to increase counter", async function () {
  //   const initial = await this.counter.retrieve();
  //   await expectRevert(
  //     this.counter.increase({ from: other }),
  //     'Ownable: caller is not the owner',
  //   );
  //   const increased = await this.counter.retrieve();

  //   expect(parseInt(increased)).to.equal(parseInt(initial));
  // })

});