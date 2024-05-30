import {ethers, Contract, Provider, JsonRpcSigner} from 'ethers';
import {contracts, abi} from '@/utils/config'

const ApproveTokens = async(contractAddress: string, amount: number) => {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner(); 
    // const signerAddress = await signer.getAddress();
    // console.log(contractAddress,signerAddress,amount);
    
    const AssetContract = new ethers.Contract(contractAddress, abi.Asset, signer);
    console.log(AssetContract);
    
    const transaction = await AssetContract.approve(contracts.AssetMarket, amount);
    return transaction;
}

export default ApproveTokens;