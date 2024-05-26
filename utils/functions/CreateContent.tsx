import {ethers, Contract, Provider, JsonRpcSigner} from 'ethers';
import {contracts, abi} from '@/utils/config'

const CreateContent = async(name: string, cid:string) =>{
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner(); 
    const AssetMarketContract = new ethers.Contract(contracts.AssetMarket, abi.AssetMarket, signer);
    const transaction = await AssetMarketContract.createcontent(name, cid);
    const receipt = await transaction.wait()
    console.log(transaction);
    console.log(receipt);
    
}


export default CreateContent