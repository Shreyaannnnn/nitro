import {ethers, Contract, Provider, JsonRpcSigner} from 'ethers';
import {contracts, abi} from '@/utils/config'



const ListAsset = async(assetAddress: string, amount: number, price: number) => {
    try{
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner(); 
    const AssetMarketContract = new ethers.Contract(contracts.AssetMarket, abi.AssetMarket, signer);
    // const priceInWei = ethers.parseEther(price.toString());
    // const amountInWei = ethers.parseEther(amount.toString());
    const transaction = await AssetMarketContract.addassettolist(assetAddress,amount,price);
    console.log(transaction);
    return transaction;
    }
    catch (err){
        console.log(err);
    }
}

export default ListAsset;