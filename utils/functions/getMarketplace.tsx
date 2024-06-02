// import {ethers, Contract, Provider, JsonRpcSigner} from 'ethers';
// import {contracts, abi} from '@/utils/config'

// const getMarketplace = async() =>{
//     const provider = new ethers.BrowserProvider((window as any).ethereum);
//     const signer = await provider.getSigner(); 
//     const AssetMarketContract = new ethers.Contract(contracts.AssetMarket, abi.AssetMarket, signer);
//     const transaction = await AssetMarketContract.getListedAssets();
//     // const receipt = await transaction;
//     // console.log(transaction);
//     // console.log(receipt);
//     return transaction;
    
// }


// export default getMarketplace;