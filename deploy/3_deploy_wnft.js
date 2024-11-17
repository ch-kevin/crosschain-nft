module.exports = async ({getNamedAccounts,deployments}) =>{
    const {firstAccounts}  = await getNamedAccounts();
    const {deploy,log} = deployments;

    log("deploying wnft contarct");

    await deploy("WarppedKevinToken", {
        contract: "WarppedKevinToken",
        from: firstAccounts,
        log: true,
        args: ["WarppedKevinToken","WKTK"]
    });

    log("wnft contarct deployed successfully");
}

module.exports.tags = ['destchain','all','wnft'];