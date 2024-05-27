import {ethers, Contract, Provider, JsonRpcSigner} from 'ethers';
import {contracts, abi} from '@/utils/config'

const getTotalSupply = async(contractAddress: string) => {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner(); 
    const signerAddress = await signer.getAddress();
    const AssetContract = new ethers.Contract(contractAddress, abi.Asset, signer);
    const transaction = await AssetContract.totalSupply();
    console.log(transaction);
    
    return transaction;

}

export default getTotalSupply;