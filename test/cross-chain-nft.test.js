const { expect } = require("chai");
const { getNamedAccounts, deployments, ethers } = require("hardhat")


let firstAccounts;
let ccipSimulator;
let nft;
let nftPoolLockAndReleace;
let wnft;
let nftPoolBurnAndMint;

before(async function() {

    // contract, account
    firstAccounts =(await getNamedAccounts()).firstAccounts;
    await deployments.fixture(['all']);

    ccipSimulator = await ethers.getContract("CCIPLocalSimulator",firstAccounts);

    nft = await ethers.getContract("KevinToken",firstAccounts);
    nftPoolLockAndReleace = await ethers.getContract("NFTPoolLockAndRelease",firstAccounts);

    wnft = await ethers.getContract("WarppedKevinToken",firstAccounts);
    nftPoolBurnAndMint = await ethers.getContract("NFTPoolBrunAndMint",firstAccounts);
    
})


//  sourc chain -> dest chain;
// test if the nft can be minted successfully
describe("source chain => dest chain test", async function(){
    it("test if the nft can be minted successfully",async function (params) {
        await nft.safeMint(firstAccounts);
        const owner = await nft.ownerOf(0);
        expect(owner).to.equal(firstAccounts);
    });
        
})

describe("test if the nft can be locked and transferred to destchain",async function(){
    
        
})

describe("test if the nft can be burned and transferred back to sourcechain",async function(){
        
})




//  dest chain -> sourc chain;

describe("test if user can  burn the wnft and send ccip message on dest chain",async function(){
        
})

describe("test if user have the nft unlocked on source chain",async function(){
        
})


