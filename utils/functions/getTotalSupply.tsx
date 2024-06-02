import {ethers, Contract, Provider, JsonRpcSigner} from 'ethers';
import {contracts, abi} from '@/utils/config'

const getTotalSupply = async (contractAddress: string) => {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const assetContract = new ethers.Contract(contractAddress, abi.Asset, signer);

    const supplyInWei = await assetContract.totalSupply();
    // const supplyInEther = ethers.formatEther(supplyInWei);
    
    console.log(supplyInWei);
    return supplyInWei;
};

export default getTotalSupply;