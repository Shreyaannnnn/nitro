import {ethers, Contract, Provider, JsonRpcSigner} from 'ethers';
import {contracts, abi} from '@/utils/config'
import { CID } from 'multiformats/cid';
import lighthouse from '@lighthouse-web3/sdk'

const getAllAssets = async() =>{
    const data =[]
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner(); 
    const AssetMarketContract = new ethers.Contract(contracts.AssetMarket, abi.AssetMarket, provider);
    const transaction = await AssetMarketContract.getListedAssets();
    console.log(transaction);
    

    for (let index = 0; index < transaction.length; index++) {
        const AssetContract = new ethers.Contract(transaction[index], abi.Asset, signer);
        const cid = await AssetContract.getCid()
        const fileInfo = await lighthouse.getFileInfo(cid)
        const thumbnailCID = fileInfo.data.fileName.substring(fileInfo.data.fileName.lastIndexOf(' ') + 1)
        
        const tokenDetails = await AssetMarketContract.getTokenDetails(cid);
        const result = {...tokenDetails}
        result[1] = result[1].toString();
        const listing = await AssetMarketContract.getListing(transaction[index])


        const details = { ...result, cid: cid, thumbnail: thumbnailCID, videoCid: cid, amount:listing[2].toString() }; 
        data.push(details)
        // data.push({cid:cid})
        
    }
    console.log(data);
    return data;
    
}


export default getAllAssets