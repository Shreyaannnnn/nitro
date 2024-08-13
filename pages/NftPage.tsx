"use client"
import Image from 'next/image'
import React, { useState, useEffect, FormEvent } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import video from '@/public/images/videoUp.png';
import Home1 from '@/public/images/home1.png'
import subscription from '@/public/images/subscriptions.png'
import analytics from '@/public/images/chart.png'
import logo from '@/public/images/logo.png'
import "@/app/globals.css";
import downloads from '@/public/images/downloads.png'
import Sidemenu from '@/components/main/Sidemenu'
import Nav from '@/components/main/Nav'
import video2 from '@/public/images/videos2.png'
import { ArrowRightLeft , ArrowUpDown } from 'lucide-react';
import CryptoDropdown from '../components/ui/dropdown';
import { ethers } from "ethers";
import axios from 'axios'

// import thumbnail from '@/public/images/thumbnail.png'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import 'slick-carousel/slick/slick-theme.css';
import HomeIcon from '@/public/images/Home.png';
import ArrowRightIcon from '@/public/images/Arrow - Right.png';
import coin from '@/public/images/coin.png'
import ellipse from '@/public/images/EllipseHome.png'
import { Menu, MenuIcon, Video } from 'lucide-react'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';


import { Button } from '../components/ui/button';
import getAssetAddress from '@/utils/functions/getAddress';
import getListing from '@/utils/functions/getListing';
import buy from '@/utils/functions/buy';
import getquote from '@/utils/functions/getQuote';
import checkAndSetAllowance from '@/utils/functions/allow';
import getTransaction from '@/utils/functions/getTransacton';
function NftPage() {
    const searchParams = useSearchParams();
    const price: any = searchParams?.get('price');
    const thumbnail = searchParams?.get('thumbnail');
    const vid = searchParams?.get('video');
    const amount = searchParams?.get('amount')
    const [count, setCount] = useState(0);
    const [availableTokens, setAvailableTokens] = useState(0);
    const [quote, setQuote] = useState<any>('') 
    const [step1, setStep1] = useState("");
    const [step2, setStep2] = useState("");
    const [step3, setStep3] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [quoteData, setQuoteData] = useState(null)
    const [swapAmount, setSwapAmount] = useState(0);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    setCount(count - 1);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    // <Link href={`/PublishToMarketplace?video=${encodeURIComponent(JSON.stringify(video))}&cid=${video.cid}`} key={index} ></Link>
    const buyy = await buy(searchParams?.get('video'), count, price)
    const result = await buyy;
    console.log(result);
  }

//   const buy = async ()



const execute = async () => {
    setStep1("");
    setStep2("");
    setStep3("");
    {
      const params = {
        fromTokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        toTokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        amount: swapAmount,
        fromTokenChainId: 137, //800
        toTokenChainId: 42161, // avax
        partnerId: "0",
        // 'widgetId': 0, // get your unique wdiget id by contacting us on Telegram
      };

      const quoteData = await getQuote(params);
      setQuoteData(quoteData);
      setStep1("✅");
      // alert(quoteData.allowanceTo);
      console.log("response");
      console.log(quoteData);
      if ((window as any).ethereum) {
        console.log("detected");
        // console.log(selectedToken);
        // console.log(selectedToken1);
        

        try {
          const accounts = await (window as any).ethereum.request({
            method: "eth_requestAccounts",
          });

          console.log(accounts[0]);
          console.log(quoteData);
          
          console.log("response");
          const txResponse = await getTransaction(
              {
                  fromTokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
                  toTokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
                  fromTokenChainId: 137,
                  toTokenChainId: 42161, // Fuji
                  
                  widgetId: 0, // get your unique wdiget id by contacting us on Telegram
                },
            // {
            //     fromTokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
            //     toTokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
            //     fromTokenChainId: 137,
            //     toTokenChainId: 42161, // Fuji
                
            //     widgetId: 0, // get your unique wdiget id by contacting us on Telegram
            //   },
                quoteData
            ); // params have been defined in step 1 and quoteData has also been fetched in step 1
            console.log("response");
            setStep2("✅");
            console.log(quoteData);
            console.log(txResponse);
            const provider = new ethers.BrowserProvider((window as any).ethereum);
            const signer = await provider.getSigner();
          // sending the transaction using the data given by the pathfinder
          const tx = await signer.sendTransaction(txResponse.txn);
          try {
            await tx.wait();
            console.log(`Transaction mined successfully: ${tx.hash}`);
            alert(`Transaction mined successfully: ${tx.hash}`);
            setStep3("✅");
          } catch (error) {
            console.log(`Transaction failed with error: ${error}`);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const PATH_FINDER_API_URL =
    "https://api-beta.pathfinder.routerprotocol.com/api";
  // Makes an HTTP GET Request to the Nitro Pathfinder API
  // quote data, which typically includes details about the token transfer,
  // such as source and destination chains, token amount, fees, and other relevant information.
  const getQuote = async (params: any) => {
    const endpoint = "v2/quote";
    const quoteUrl = `${PATH_FINDER_API_URL}/${endpoint}`;

    console.log(quoteUrl);

    try {
      const res = await axios.get(quoteUrl, { params });
      return res.data;
    } catch (e) {
      console.error(`Fetching quote data from pathfinder: ${e}`);
    }
  };
  // This function is responsible for actually executing the transaction. It takes in the following parameters
  const getTransaction = async (params: any, quoteData: any) => {
    const endpoint = "v2/transaction";
    const txDataUrl = `${PATH_FINDER_API_URL}/${endpoint}`;

    console.log(txDataUrl);
    const provider = new ethers.BrowserProvider((window as any).ethereum)
    const signer = await provider.getSigner();
    const add = await signer.getAddress();
    console.log(add);
    

    try {
      const res = await axios.post(txDataUrl, {
        ...quoteData,
        // fromTokenAddress: params.fromTokenAddress,
        // toTokenAddress: params.toTokenAddress,
        slippageTolerance: 0.5,
        senderAddress: add,
        receiverAddress: add,
        // widgetId: params.widgetId
      });
      return res.data;
    } catch (e) {
      console.error(`Fetching tx data from pathfinder: ${e}`);
    }
  };




    
  return (
    <div className='bg-[#0D0D0E]  ' style={{
        backgroundImage: `url(${ellipse.src})`,
        width: '100%',
        // height: '100%',
        backgroundSize: "cover",
        // backgroundRepeat: 'no-repeat',
      }} >
        
        <Nav />
            <div className='flex justify-between mt-[2vw]'>
            

            {/* <Sidemenu /> */}
                <div className='w-[95%] mx-[2vw] md:w-4/5 md:mx-auto space-y-[1vw]'>

                    
                    <div className='w-4/5 mx-auto my-[3vw]' >
                
                <div className='w-full md:flex items-center pb-[40vw] md:pb-0 ' >
                   
                        <div className=' mx-[2vw] md:mx-0 w-full md:w-[50%] h-[70vw] md:h-[25vw]  p-[3vw] md:p-[1vw] lg:w-1/2 border border-cyan-400 rounded-[0.5vw] bg-gradient-to-tr from-[#0f0f0f78] to-[#33c2ee91]' >
                            <img  className='w-full  rounded-[0.5vw] h-full ' src={`https://gateway.lighthouse.storage/ipfs/${thumbnail}`} alt=''/>
                        </div>
                   
                    <div className='  md:w-1/2 mx-[2vw] space-y-[1vw] ' >
                        <p className='text-white text-[5vw] md:text-[2vw] font-semibold ' >Basic how to get into web3 Ecosystem</p>
                        {/* <p className='text-white text-[4vw] md:text-[1vw] font-semibold' >Description</p>
                        <p className='text-[#D4D4D4] text-[3vw] md:text-[1vw]' >Chris Fisher, also known as the Blind Woodturner, learned his craft by listening to hundreds of hours of YouTube videos and experimenting in his workshop. Now he’s a YouTube creator himself, sells his products worldwide, and does demonstrations all around the country. Now he’s a YouTube creator himself, sells his products worldwide, and does demonstrations all around the country.</p> */}
                    
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className='flex items-center space-x-[0.5vw]' >
                                <p className='text-white text-[4vw] md:text-[1.4vw]' >Price : </p>
                                <p className=' text-[6vw] md:text-[1.5vw] font-semibold bg-gradient-to-r inline-block text-transparent bg-clip-text from-[#33C1EE] via-[#8DDCF5]  to-[#FFFFFF] ' >{price} {" "} wei</p>
                            </div>
                            <div className='flex items-center space-x-[0.5vw]' >
                                <p className='text-white text-[4vw] md:text-[1.4vw]' >Total Available Tokens : </p>
                                <p className=' text-[6vw] md:text-[1.5vw] font-semibold bg-gradient-to-r inline-block text-transparent bg-clip-text from-[#33C1EE] via-[#8DDCF5]  to-[#FFFFFF] ' >{amount}</p>
                            </div>
                            
                            <div className="  md:flex items-center mt-[2vw] md:mt-0 space-x-[1vw] ">
                            <div className='flex items-center' >
                            <button
                            type='button'
                                className="bg-[#33C1EE]  text-white font-bold py-[1vw] px-[3vw] md:py-[0.5vw] md:px-[1vw] rounded-[1vw] md:rounded-[0.2vw] focus:outline-none"
                                onClick={decreaseCount}
                            >
                                -
                            </button>
                            <div className=" text-[5vw] md:text-[1vw] text-white font-semibold py-[0.5vw] px-[1vw]">{count}</div>
                                <button
                                type='button'
                                className="bg-[#33C1EE]  text-white font-bold py-[1vw] px-[3vw] md:py-[0.5vw] md:px-[1vw] rounded-[1vw] md:rounded-[0.2vw] focus:outline-none"
                                onClick={increaseCount}
                            >
                                +
                            </button>
                            </div>

                            <div className='mt-[4vw] md:mt-0' >
                                <Button type='submit' className='text-black bg-[#33C1EE] w-full  hover:bg-[#33C1EE] rounded-[1vw] md:rounded-[0.2vw] md:h-[4.5vw] lg:h-[3vw] px-[1.5vw] text-[2.8vw] md:text-[1vw] font-bold' >Buy {count} token(s)</Button>
                            </div>



                            </div>
                        </div>
                        </form>

                            {/* <div className='mt-[4vw] md:mt-0' >
                                <Button onClick={buy} type='submit' className='text-black bg-[#33C1EE] w-full  hover:bg-[#33C1EE] rounded-[1vw] md:rounded-[0.2vw] md:h-[4.5vw] lg:h-[3vw] px-[1.5vw] text-[2.8vw] md:text-[1vw] font-bold' >Buy {count} token(s) with OP</Button>
                            </div> */}
                    </div>
                </div>
                
            </div>
                </div>
            </div>

            <div className='w-4/5  ' >
                <p  className='text-center text-[2vw] text-white pb-[1vw] font-semibold ' >Swap</p>
                <div className=' ' >
                    <div className='flex justify-center h-[30vw] items-center' >
                        <div className='bg-[#33C1EE] rounded-[0.5vw] w-[30%] mr-[-1vw] h-full flex items-center justify-center  ' >
                            <div className='space-y-[3vw]  text-center' >
                                <p className='text-white text-[1vw] font-semibold ' >You pay</p>
                                <p className='text-white font-semibold text-[4vw] ' >{count*price}</p>
                                {/* <input
                                    type="text"
                                    placeholder="Enter amount"
                                    className="w-full outline-slate-300 p-3 rounded bg-[#63639f4d] text-white placeholder:text-gray-300"
                                    onChange={(e) => {
                                        setSwapAmount( Math.pow(10, 18) * e.target.value);
                                    }}
                                /> */}


                                <input
                                type="text"
                                placeholder="Enter amount"
                                className="w-full outline-slate-300 p-3 rounded bg-[#63639f4d] text-white placeholder:text-gray-300"
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value); // Convert the input value to a number
                                    if (!isNaN(value)) {
                                    setSwapAmount(Math.pow(10, 18) * value); // Perform the arithmetic operation
                                    } else {
                                    setSwapAmount(0); // Handle invalid input
                                    }
                                }}
                                />


                                {/* <CryptoDropdown/> */}
                                MATIC
                            </div> 
                        </div>
                        <div className='p-[1vw] border-[0.2vw] rounded-[0.5vw] bg-black z-10 ' ><ArrowRightLeft className='bg-black text-white  ' /></div>
                        <div className='bg-[#33C1EE] ml-[-1vw] rounded-[0.5vw] w-[30%] h-full flex items-center justify-center  ' >
                            <div className='text-center space-y-[3vw]' >
                                <p className='text-white text-[1vw] font-semibold ' >You recieve</p>
                                {/* <p className='text-white font-semibold text-[4vw] ' >{count*price}</p> */}
                                <div className='text-white' >
                                    Arb ETH
                                    {/* <CryptoDropdown  /> */}
                                </div>
                            </div> 
                            
                        </div>
                        </div>
                        <div className='flex justify-center my-[2vw] space-between' >
                            <Button onClick={execute} className='text-white text-[1vw]  rounded-[0.5vw]  bg-[#005C7985] w-[63%] mx-auto m-4' >Get Quote</Button>
                            {/* <Button onClick={allowance} className='text-white text-[1vw]  rounded-[0.5vw]  bg-[#005C7985] w-[63%] mx-auto m-4' >Set Allowance</Button>
                            <Button onClick={tx} className='text-white text-[1vw]  rounded-[0.5vw]  bg-[#005C7985] w-[63%] mx-auto m-4' >Execute</Button> */}
                        </div>
                  
                </div>    
               
                    
                
            </div>
            {/* <Link href='/VideoPlayerPage'>
           <h1 className='text-white text-[2vw] text-center'> Go To Video</h1>
           </Link> */}
    </div>
  )
}

export default NftPage





