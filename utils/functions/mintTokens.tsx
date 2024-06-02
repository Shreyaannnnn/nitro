import {ethers, Contract, Provider, JsonRpcSigner} from 'ethers';
import {contracts, abi} from '@/utils/config'


// const mintTokens = async(contractAddress: string, amount: number) => {
//     const provider = new ethers.BrowserProvider((window as any).ethereum);
//     const signer = await provider.getSigner(); 
//     const signerAddress = await signer.getAddress();
//     console.log(contractAddress,signerAddress,amount);
    
//     const AssetContract = new ethers.Contract(contractAddress, abi.Asset, signer);
//     // const amountInEth = convertWeiToTokens(amount)
//     // console.log(amountInEth);
    
//     const transaction = await AssetContract.mint(signerAddress,amount);
//     console.log(transaction);
// }



async function mintTokens(contractAddress: string, amount: number) {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();

    const assetContract = new ethers.Contract(contractAddress, abi.Asset, signer);

    // const amountInWei = ethers.parseEther(amountInEther.toString());
    // console.log("Amount in Wei:", amountInWei);

    const transaction = await assetContract.mint(signerAddress, amount);
    console.log(transaction);
}


export default mintTokens;