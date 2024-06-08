import {ethers, Contract, Provider, JsonRpcSigner} from 'ethers';
import {contracts, abi} from '@/utils/config'



const BuyAssetTokens = async(cid: any, amount: number, price:any) => {
    try{
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner(); 
    const AssetMarketContract = new ethers.Contract(contracts.AssetMarket, abi.AssetMarket, signer);
    // const priceInWei = ethers.parseEther(price.toString());
    // const amountInWei = ethers.parseEther(amount.toString());
    const assetAddress = AssetMarketContract.getAssetAddress(cid);
    const transaction = await AssetMarketContract.buyasset(assetAddress,amount, {value:amount*price});
    console.log(transaction);
    return transaction;
    }
    catch (err){
        console.log(err);

        return(err)
    }
}

export default BuyAssetTokens;