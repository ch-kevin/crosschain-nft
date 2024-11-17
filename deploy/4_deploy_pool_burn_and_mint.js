const { ethers } = require("hardhat");

module.exports = async ({getNamedAccounts,deployments}) =>{
    const {firstAccounts}  = await getNamedAccounts();
    const {deploy,log} = deployments;

    log("NFTPoolBurnAndMint deploying...");

    const ccipSimulatorDeployment = await deployments.get("CCIPLocalSimulator");
    const ccipSimulator = await ethers.getContractAt("CCIPLocalSimulator",ccipSimulatorDeployment);
    
    const ccipCinfig = await ccipSimulator.configuration();

    const destChinaRouter = ccipCinfig.destinationRouter_;
    const linkTokenAddr = ccipCinfig.linkToken_;

    const wnftDeployment = await deployments.get("WarppedKevinToken");
    const wnftAddr = wnftDeployment.address;

    /*
    returns (
            uint64 chainSelector_,
            IRouterClient sourceRouter_,
            IRouterClient destinationRouter_,
            WETH9 wrappedNative_,
            LinkToken linkToken_,
            BurnMintERC677Helper ccipBnM_,
            BurnMintERC677Helper ccipLnM_
    )*/

    // address _router, address _link, address wnftAddr
    await deploy("NFTPoolBrunAndMint", {
        contract: "NFTPoolBrunAndMint",
        from: firstAccounts,
        log: true,
        args: [destChinaRouter,linkTokenAddr,wnftAddr]
    });

    log("NFTPoolBurnAndMint contarct deployed successfully");
}

module.exports.tags = ['destchain','all','pbam'];