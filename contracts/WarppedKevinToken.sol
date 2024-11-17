// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;
import {KevinToken} from "./KevinToken.sol";
contract WarppedKevinToken is KevinToken{

    constructor(string memory tokenName, string memory mySymbol) 
    KevinToken(tokenName,mySymbol){}

    function mintTokenWithSpecificTokenId(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
    }

}