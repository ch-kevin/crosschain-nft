# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```


npm install --save-dev "@nomicfoundation/hardhat-chai-matchers@^2.0.0" "@nomicfoundation/hardhat-ignition-ethers@^0.15.0" "@nomicfoundation/hardhat-network-helpers@^1.0.0" "@typechain/ethers-v6@^0.5.0" "@typechain/hardhat@^9.0.0" "@types/chai@^4.2.0" "@types/mocha@>=9.1.0" "hardhat-gas-reporter@^1.0.8" "solidity-coverage@^0.8.1" "ts-node@>=8.0.0" "typechain@^8.3.0" "typescript@>=4.5.0"




/**  deploy/0_deploy_ccip_simulator.js **/
module.exports = async ({getNamedAccounts,deployments}) =>{
    
    const firstAccounts = (await getNamedAccounts()).firstAccounts
    const {deploy,log} = deployments;

    log("deploying CCIP Simulator contarct");
    log("firstAccounts=>",firstAccounts);

    await deploy("CCIPLocalSimulator", {
        contract: "CCIPLocalSimulator",
        from: firstAccounts,
        log: true
    });

    log("CCIP Simulator contarct deployed successfully");
}

module.exports.tags = ['test','all','ccip'];
/** npx hardhat deploy --tags ccip "这个能部署成功!" **/

/**deploy/1_deploy_nft.js**/
module.exports = async ({getNamedAccounts,deployments}) =>{
    const {firstAccounts}  = await getNamedAccounts();
    const {deploy,log} = deployments;

    log("deploying nft contarct");

    await deploy("KevinToken", {
        contract: "KevinToken",
        from: firstAccounts,
        log: true,
        args: ["KevinToken","KTK"]
    });

    log("nft contarct deployed successfully");
}

module.exports.tags = ['sourcechain','all','nft'];
/**npx hardhat deploy --tags nft "这个也可以"**/

/**
deploy/2_deploy_pool_lock_and_releace.js
**/
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
/** npx hardhat deploy --tags plar **/
/**
mac@macdeMacBook-Pro-2  ~/web3/crosschain-nft  npx hardhat deploy --tags plar
Nothing to compile
nftPoolLockAndRelease deploying...
An unexpected error occurred:

Error: ERROR processing /Users/mac/web3/crosschain-nft/deploy/2_deploy_pool_lock_and_releace.js:
Error: No deployment found for: CCIPLocalSimulator
    at Object.get (/Users/mac/web3/crosschain-nft/node_modules/hardhat-deploy/src/DeploymentsManager.ts:163:17)
    at Object.module.exports [as func] (/Users/mac/web3/crosschain-nft/deploy/2_deploy_pool_lock_and_releace.js:10:37)
    at DeploymentsManager.executeDeployScripts (/Users/mac/web3/crosschain-nft/node_modules/hardhat-deploy/src/DeploymentsManager.ts:1212:22)
    at DeploymentsManager.runDeploy (/Users/mac/web3/crosschain-nft/node_modules/hardhat-deploy/src/DeploymentsManager.ts:1061:5)
    at SimpleTaskDefinition.action (/Users/mac/web3/crosschain-nft/node_modules/hardhat-deploy/src/index.ts:450:5)
    at Environment._runTaskDefinition (/Users/mac/web3/crosschain-nft/node_modules/hardhat/src/internal/core/runtime-environment.ts:351:14)
    at Environment.run (/Users/mac/web3/crosschain-nft/node_modules/hardhat/src/internal/core/runtime-environment.ts:184:14)
    at SimpleTaskDefinition.action (/Users/mac/web3/crosschain-nft/node_modules/hardhat-deploy/src/index.ts:601:32)
    at Environment._runTaskDefinition (/Users/mac/web3/crosschain-nft/node_modules/hardhat/src/internal/core/runtime-environment.ts:351:14)
    at Environment.run (/Users/mac/web3/crosschain-nft/node_modules/hardhat/src/internal/core/runtime-environment.ts:184:14)
    at DeploymentsManager.executeDeployScripts (/Users/mac/web3/crosschain-nft/node_modules/hardhat-deploy/src/DeploymentsManager.ts:1215:19)
    at DeploymentsManager.runDeploy (/Users/mac/web3/crosschain-nft/node_modules/hardhat-deploy/src/DeploymentsManager.ts:1061:5)
    at SimpleTaskDefinition.action (/Users/mac/web3/crosschain-nft/node_modules/hardhat-deploy/src/index.ts:450:5)
    at Environment._runTaskDefinition (/Users/mac/web3/crosschain-nft/node_modules/hardhat/src/internal/core/runtime-environment.ts:351:14)
    at Environment.run (/Users/mac/web3/crosschain-nft/node_modules/hardhat/src/internal/core/runtime-environment.ts:184:14)
    at SimpleTaskDefinition.action (/Users/mac/web3/crosschain-nft/node_modules/hardhat-deploy/src/index.ts:601:32)
    at Environment._runTaskDefinition (/Users/mac/web3/crosschain-nft/node_modules/hardhat/src/internal/core/runtime-environment.ts:351:14)
    at Environment.run (/Users/mac/web3/crosschain-nft/node_modules/hardhat/src/internal/core/runtime-environment.ts:184:14)
    at SimpleTaskDefinition.action (/Users/mac/web3/crosschain-nft/node_modules/hardhat-deploy/src/index.ts:690:5)
    at Environment._runTaskDefinition (/Users/mac/web3/crosschain-nft/node_modules/hardhat/src/internal/core/runtime-environment.ts:351:14)
**/


await deployments.get("CCIPLocalSimulator"); 在第四课也没有成功，我把代码复制下来运行也是同样的错误



