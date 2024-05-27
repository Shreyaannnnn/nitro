import {ethers, Contract, Provider, JsonRpcSigner} from 'ethers';
import {contracts, abi} from '@/utils/config'

const getAssetAddress = async(cid: string) => {
    try{
        console.log(cid);
        
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner(); 
    const AssetMarketContract = new ethers.Contract(contracts.AssetMarket, abi.AssetMarket, provider);
    const transaction = await AssetMarketContract.getAssetAddress(cid);
    console.log(transaction);
    
    return transaction;
    }
    catch (err){
        console.log(err);
        
    }

}

export default getAssetAddress;