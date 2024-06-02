import {ethers, Contract, Provider, JsonRpcSigner, assertArgumentCount} from 'ethers';
import {contracts, abi} from '@/utils/config'

// const ApproveTokens = async(contractAddress: string, amount: number) => {
//     const provider = new ethers.BrowserProvider((window as any).ethereum);
//     const signer = await provider.getSigner(); 

//     const AssetContract = new ethers.Contract(contractAddress, abi.Asset, signer);
//     console.log(AssetContract);
//     const amountInWei = ethers.parseEther(amount.toString());
    
//     const transaction = await AssetContract.approve(contracts.AssetMarket, amountInWei);
//     return transaction;
// }


const ApproveTokens = async (contractAddress: string, amount: number) => {
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const signer = await provider.getSigner();
  const assetContract = new ethers.Contract(contractAddress, abi.Asset, signer);

  // const amountInWei = ethers.parseEther(amount.toString());
  const tx = await assetContract.approve(contracts.AssetMarket, amount);

  const receipt = await tx.wait(); // Wait for transaction confirmation
  const block = await provider.getBlock(receipt.blockNumber);
  const rawTx = await provider.send('eth_getTransactionByHash', [tx.hash]); // Get raw transaction

  return receipt; 
};

export default ApproveTokens;