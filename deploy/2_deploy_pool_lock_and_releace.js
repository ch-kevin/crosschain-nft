const { ethers } = require("hardhat");

/* deploy/2_deploy_pool_lock_and_releace */
module.exports = async ({getNamedAccounts,deployments}) =>{
    const {firstAccounts}  = await getNamedAccounts();
    const {deploy,log} = deployments;

    log("nftPoolLockAndRelease deploying...");

    const ccipSimulatorDeployment = await deployments.get("CCIPLocalSimulator");

    const ccipSimulator = await ethers.getContractAt("CCIPLocalSimulator",ccipSimulatorDeployment.address);

    const ccipCinfig = await ccipSimulator.configuration();

    /*
    returns (
        uint64 chainSelector_,
        IRouterClient sourceRouter_,
        IRouterClient destinationRouter_,
        WETH9 wrappedNative_,
        LinkToken linkToken_,
        BurnMintERC677Helper ccipBnM_,
        BurnMintERC677Helper ccipLnM_
    )
    */

    const sourceChinaRouter = ccipCinfig.sourceRouter_;
    const linkTokenAddr = ccipCinfig.linkToken_;

    const nftDeployment = await deployments.get("KevinToken");
    const nftAddr = nftDeployment.address;
    
    // address _router, address _link, address nftAddr
    await deploy("NFTPoolLockAndRelease", {
        contract: "NFTPoolLockAndRelease",
        from: firstAccounts,
        log: true,
        args: [sourceChinaRouter,linkTokenAddr,nftAddr]
    });

    log("nftPoolLockAndRelease contarct deployed successfully");
}

module.exports.tags = ['sourcechain','all','plar'];


/*
    returns (
        uint64 chainSelector_,
        IRouterClient sourceRouter_,
        IRouterClient destinationRouter_,
        WETH9 wrappedNative_,
        LinkToken linkToken_,
        BurnMintERC677Helper ccipBnM_,
        BurnMintERC677Helper ccipLnM_
    )
*/

/***
 * 
 *  const {firstAccounts}  = await getNamedAccounts();
    const {deploy,log} = deployments;

    log("nftPoolLockAndRelease deploying...");

    const ccipSimulatorDeployment = await deployments.get("CCIPLocalSimulator");

    const ccipSimulator = await ethers.getContractAt("CCIPLocalSimulator",ccipSimulatorDeployment.address);


    
    const ccipCinfig = await ccipSimulator.configuration();
    const sourceChinaRouter = ccipCinfig.sourceRouter_;
    const linkTokenAddr = ccipCinfig.linkToken_;

    const nftDeployment = await deployments.get("KevinToken");
    const nftAddr = nftDeployment.address;
    
    // address _router, address _link, address nftAddr
    await deploy("NFTPoolLockAndRelease", {
        contract: "NFTPoolLockAndRelease",
        from: firstAccounts,
        log: true,
        args: [sourceChinaRouter,linkTokenAddr,nftAddr]
    });

    log("nftPoolLockAndRelease contarct deployed successfully");
 * 
 * **/