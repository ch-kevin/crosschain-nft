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

module.exports.tags = ['sourcechain','all','destchain'];