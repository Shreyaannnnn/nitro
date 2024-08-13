import checkAndSetAllowance from './checkAllowance';
import getquote from './getQuote'
import {ethers, Contract, Provider, JsonRpcSigner} from 'ethers';
import {contracts, abi} from '@/utils/config'




const buy = async(cid: any, count: any, amount: any) =>{
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner(); 

    const AssetMarketContract = new ethers.Contract(contracts.AssetMarket, abi.AssetMarket, signer);
    // const priceInWei = ethers.parseEther(price.toString());
    // const amountInWei = ethers.parseEther(amount.toString());
    const assetAddress = AssetMarketContract.getAssetAddress(cid);
    
    const res: any = await getquote()
    const result = await res;
    const allowance = await checkAndSetAllowance('0x4200000000000000000000000000000000000006', '0x8201c02d4ab2214471e8c3ad6475c8b0cd9f2d06', 16179839860737)

}

export default buy; 