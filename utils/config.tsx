import contractABI from '@/public/abi/createNft.json';
import marketContractABI from '@/public/abi/assetMarket.json';
import AssetABI from '@/public/abi/Asset.json'
// import { ethers } from 'ethers';

export const contracts = {
    makeNFT: '0x23Ef0e4f4031c2d0DeeB4C1f7b8fe097a8276342',
    AssetMarket: '0xd86E615190bE769ee53C7Eca8D4968720DeA69EE'
}

export const abi = {
    makeNFT: contractABI,
    AssetMarket: marketContractABI,
    Asset: AssetABI
}
