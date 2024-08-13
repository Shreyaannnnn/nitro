import { ethers, Contract } from 'ethers';
import { abi } from '@/utils/config';

interface CheckAndSetAllowanceParams {
  tokenAddress: string;
  approvalAddress: string;
  amount: ethers.BigNumberish; // Assuming amount is a BigNumber, update if different
}

const checkAndSetAllowance = async ({
  tokenAddress,
  approvalAddress,
  amount,
}: CheckAndSetAllowanceParams): Promise<void> => {
  try {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    
    // Ensure that tokenAddress is being passed as a string
    const erc20 = new ethers.Contract(tokenAddress, abi.erc20, signer);

    const ownerAddress = await signer.getAddress();

    // Get the allowance
    const allowance = await erc20.allowance(ownerAddress, approvalAddress);
    console.log(`Allowance is: ${allowance.toString()}`);

    // Check if allowance is less than required amount
    if (allowance.lt(amount)) {
      console.log("Allowance is insufficient, requesting approval...");

      // Request approval
      const approveTx = await erc20.approve(approvalAddress, amount);
      console.log(`Approval transaction sent: ${approveTx.hash}`);

      try {
        // Wait for the transaction to be mined
        await approveTx.wait();
        console.log(`Transaction mined successfully: ${approveTx.hash}`);
      } catch (error) {
        console.error(`Transaction failed with error: ${error}`);
      }
    } else {
      console.log("Enough allowance is already set.");
      alert("Enough allowance is already set.");
    }
  } catch (error) {
    console.error("Error checking or setting allowance:", error);
  }
};

export default checkAndSetAllowance;
