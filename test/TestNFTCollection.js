const NFTCollection = artifacts.require("NFTCollection");
const { expect } = require('chai');
// Import utilities from Test Helpers
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');


/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("NFTCollection", function ([owner, other]) {
  // const value = new BN('42')
  const baseURI = "ipfs://baseURI";
  const tokenName = "TokenName";
  const tokenSymbol = "TokenSymbol";
  const contractURI = "ipfs://contractURI"

  beforeEach(async function () {
    // Deploy a new Counter contract for each test
    this.collection = await NFTCollection.new( baseURI, tokenName, tokenSymbol, contractURI );
  });

  it("is deployed", async function () {
    await NFTCollection.deployed();
    return assert.isTrue(true);
  });

  it("has owner", async function () {
    const _owner = await this.collection.owner.call({ from: other });
    expect(_owner).to.equal(owner);
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