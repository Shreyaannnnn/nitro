"use client"
import React, {useState, FormEvent} from 'react'
import 'slick-carousel/slick/slick.css';
import "@/app/globals.css";
import 'slick-carousel/slick/slick-theme.css';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import CreateContent from '@/utils/functions/CreateContent';
import mintTokens from '@/utils/functions/mintTokens';


interface props{
    cid: any,
    assetAddress: string,
}
function Mint({cid, assetAddress}:props) {
    const [amount, setAmount] = useState<number>(0)


    const mint = async() =>{
        mintTokens(assetAddress, amount)
      }

      const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission
      
        // const parsedNumber = parseInt(amount, 10); 
      
        if (!isNaN(amount)) {
          await mint(); // Wait for the mint operation to complete
        } else {
          console.error("Invalid input: Please enter a number.");
        }
      };
      
    
  return (
    <div className='justify-center'>
        <form onSubmit={handleSubmit} className='flex flex-col w-[50vw]'>
        <input
  placeholder="Total Token Supply"
  className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition w-[20vw]"
  type="number"
  value={amount}
  onChange={(e) => setAmount(parseInt(e.target.value, 10) || 0)}
  required
/>
<button type='submit' className="cursor-pointer font-semibold overflow-hidden relative z-100 border border-green-500 group px-8 py-2 w-[20vw] pt-5">
  <span className="relative z-10 text-green-500 group-hover:text-white text-xl duration-500">Mint Tokens</span>
  <span className="absolute w-full h-full bg-green-500 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
  <span className="absolute w-full h-full bg-green-500 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
</button>
</form>
    </div>
    
  )
}

export default Mint;