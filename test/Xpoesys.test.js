const { assert } = require("chai");

const Xpoesy = artifacts.require("Xpoesys");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Xpoesy", async (accounts) => {
  let xpoesy, xpCount, result;

  before(async () => {
    xpoesy = await Xpoesy.deployed();
  });

  describe("Deployment", async () => {
    
    it("contract has an address", async () => {
      const address = await xpoesy.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await xpoesy.collectionName();
      assert.equal(name, "Xpoesy");
    });

    it("has a symbol", async () => {
      const symbol = await xpoesy.collectionNameSymbol();
      assert.equal(symbol, "XP");
    });

  });

  describe("application features", async () => {
    
    it("allows users to mint ERC721 token", async () => {
      xpCount = await xpoesy.xpCounter();
      assert.equal(xpCount.toNumber(), 0);
    });

  });
});