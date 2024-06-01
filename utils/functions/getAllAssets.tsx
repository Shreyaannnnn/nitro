import {ethers, Contract, Provider, JsonRpcSigner} from 'ethers';
import {contracts, abi} from '@/utils/config'
import { CID } from 'multiformats/cid';

const getAllAssets = async() =>{
    const data =[]
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner(); 
    const AssetMarketContract = new ethers.Contract(contracts.AssetMarket, abi.AssetMarket, signer);
    const transaction = await AssetMarketContract.getListedAssets();

    for (let index = 0; index < transaction.length; index++) {
        const AssetContract = new ethers.Contract(transaction[0], abi.Asset, signer);
        const cid = await AssetContract.getCid()
        const tokenDetails = await AssetMarketContract.getTokenDetails(cid);
        const details = { ...tokenDetails, cid: cid }; 
        data.push(details)
        // data.push({cid:cid})
        
    }
    console.log(data);
    return data;
    
}


export default getAllAssets