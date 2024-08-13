import axios from 'axios';
const PATH_FINDER_API_URL = "https://api-beta.pathfinder.routerprotocol.com/api"
import {ethers, Contract, Provider, JsonRpcSigner} from 'ethers';
import {contracts, abi} from '@/utils/config';


const checkAndSetAllowance = async (tokenAddress: any, approvalAddress: any, amount: any) => {
    // Transactions with the native token don't need approval
    // Using the provided token address and the ERC20 ABI, we create an instance of the ERC20 contract.
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner(); 
    const erc20 = new ethers.Contract(tokenAddress, abi.erc20, signer);
    const ownerAddress = await signer.getAddress();
    console.log(`ERC20 Contract: ${erc20}`);
    console.log(`Owner Address: ${ownerAddress}`);
    console.log(`Approval Address: ${approvalAddress}`);
    console.log(`Token Address: ${tokenAddress}`);
    
    if (!ethers.isAddress(approvalAddress)) {
        console.log('Invalid approval address');
        throw new Error('Invalid approval address');
    }

    if (!ethers.isAddress(ownerAddress)) {
        throw new Error('Invalid owner address');
    }

    try {
        console.log(ownerAddress,approvalAddress);
        
        const allowance = await erc20.allowance(ownerAddress, approvalAddress);
        console.log(`Allowance: ${allowance.toString()}`);
        
        if (allowance.lt(amount)) {
            const approveTx = await erc20.approve(approvalAddress, amount);
            try {
                await approveTx.wait();
                console.log(`Transaction mined successfully: ${approveTx.hash}`);
            } catch (error) {
                console.log(`Transaction failed with error: ${error}`);
            }
        } else {
            console.log("Enough allowance");
            alert("Enough allowance");
        }
    } catch (error) {
        console.log(`Error checking allowance: ${error}`);
    }
};


export default checkAndSetAllowance;