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
import ApproveTokens from '@/utils/functions/ApproveTokens';
import {contracts} from '@/utils/config'
import ListAsset from '@/utils/functions/ListAsset';



interface PublishProps {
  cid: string,
  assetAddress: string
}

function StudioPage(props: PublishProps) {
  const {cid, assetAddress} = props;

  const [amount, setAmount] = useState<number>(0)
  const [price, setPrice] = useState<number>(0)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
  
    // const parsedNumber = parseInt(amount, 10); 
  
    if (!isNaN(amount) || !isNaN(price)) {
      await publish(); // Wait for the mint operation to complete
    } else {
      console.error("Invalid input: Please enter a number.");
    }
  };


  const publish = async() => {
    // console.log(amount, price);
    
    const result = await ApproveTokens(assetAddress, amount)
    const approve = await result;
    ListAsset(assetAddress, amount, price)
  }

    
  return (
      <Tabs defaultValue="setprice" className=" w-[300px] md:w-[400px] lg:w-[400px]  rounded-xl mx-auto">
      <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger  className=' text-white text-lg bg-[#33C1EE]' value="setprice">Set Price</TabsTrigger>
        <TabsTrigger className=' text-white text-lg bg-[#33C1EE] ' value="publish">Publish</TabsTrigger>
      </TabsList>
      <TabsContent value="publish">
        <Card className='border-none' >
          <CardHeader>
            <CardTitle className='text-white text-2xl text-center font-bold' >PUBLISH</CardTitle>
            <CardDescription className='text-white text-lg font-semibold text-center' >
              Publish your content to marketPlace
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-white  text-center ">
           <h2 className='text-lg font-semibold' >List your content tokens on marketplace</h2>
           <p className='font-semibold' >Want to earn from your content ? Create exclusive, limited editing tokens tied to your work . Sell a 
            portion on a marketplace, letting your fans become co-owners and setting the price per token to unlock their
            investment potential!
           </p>
          </CardContent>

        </Card>
      </TabsContent>
      <TabsContent value="setprice">
        <Card className='border-none' >
          {/* <CardHeader>
            <CardTitle className='text-white text-2xl font-bold text-center' >Price</CardTitle>
            <CardDescription className='text-lg text-white text-center font-semibold' >
                Set the price for your work!
            </CardDescription>
          </CardHeader> */}

          <form onSubmit={handleSubmit}>
          <CardContent className="space-y-2">
            <div className="space-y-1 text-white">
              <Label htmlFor="current" className='text-lg font-semibold'>Number of Tokens to publish</Label>
              <Input id="current" type="number" onChange={(e) => setAmount(parseInt(e.target.value, 10) || 0)} />
            </div>
            
          </CardContent>


          <CardContent className="space-y-2">
            <div className="space-y-1 text-white">
              <Label htmlFor="current" className='text-lg font-semibold'>Price</Label>
              <Input id="current" type="number" onChange={(e) => setPrice(parseFloat(e.target.value))}/>
            </div>
            
          </CardContent>



          <CardFooter className='mx-auto' >
            <Button type='submit' className='text-white hover:scale-110 transition-all border  border-cyan-100 bg-[#33C1EE]' >Publish to marketplace</Button>
          </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default StudioPage