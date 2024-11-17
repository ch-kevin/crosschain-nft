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