import axios from 'axios'
import getquote from './getQuote';


const PATH_FINDER_API_URL = "https://api-beta.pathfinder.routerprotocol.com/api"


const trialParams = {
    fromTokenAddress: "0x4200000000000000000000000000000000000006",
    toTokenAddress: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
    amount: "1000000000000000",
    fromTokenChainId: 10, 
    toTokenChainId: 42161,   
    partnerId: "0",
  };


  const data = {
    "flowType": "trustless",
    "isTransfer": true,
    "isWrappedToken": false,
    "allowanceTo": "0x8201c02d4ab2214471e8c3ad6475c8b0cd9f2d06",
    "bridgeFee": {
        "amount": "2233390000000",
        "decimals": 18,
        "symbol": "WETH",
        "address": "0x4200000000000000000000000000000000000006"
    },
    "fromTokenAddress": "0x4200000000000000000000000000000000000006",
    "toTokenAddress": "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
    "source": {
        "chainId": "10",
        "chainType": "evm",
        "asset": {
            "decimals": 18,
            "symbol": "WETH",
            "name": "WETH",
            "chainId": "10",
            "address": "0x4200000000000000000000000000000000000006",
            "resourceID": "native-eth",
            "isMintable": false,
            "isWrappedAsset": false
        },
        "stableReserveAsset": {
            "decimals": 18,
            "symbol": "WETH",
            "name": "WETH",
            "chainId": "10",
            "address": "0x4200000000000000000000000000000000000006",
            "resourceID": "native-eth",
            "isMintable": false,
            "isWrappedAsset": false
        },
        "tokenAmount": "1000000000000000",
        "stableReserveAmount": "1000000000000000",
        "path": [],
        "flags": [],
        "priceImpact": "0",
        "tokenPath": "",
        "dataTx": []
    },
    "destination": {
        "chainId": "42161",
        "chainType": "evm",
        "asset": {
            "decimals": 18,
            "symbol": "WETH",
            "name": "WETH",
            "chainId": "42161",
            "address": "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
            "resourceID": "native-eth",
            "isMintable": false,
            "isWrappedAsset": false
        },
        "stableReserveAsset": {
            "decimals": 18,
            "symbol": "WETH",
            "name": "WETH",
            "chainId": "42161",
            "address": "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
            "resourceID": "native-eth",
            "isMintable": false,
            "isWrappedAsset": false
        },
        "tokenAmount": "997766610000000",
        "stableReserveAmount": "997766610000000",
        "path": [],
        "flags": [],
        "priceImpact": "0",
        "tokenPath": "",
        "dataTx": []
    },
    "partnerId": 0,
    "fuelTransfer": null,
    "slippageTolerance": "1",
    "estimatedTime": 40
}

const getTransaction = async ( quoteData:any) => {
	const endpoint = "v2/transaction"
	const txDataUrl = `${PATH_FINDER_API_URL}/${endpoint}`

	console.log(txDataUrl)

	try {
        // const quoteData = await axios.get('https://api-beta.pathfinder.routerprotocol.com/api/v2/quote', { trialParams });
        const quote = await getquote()
        console.log(quote);
        
		const res = await axios.post(txDataUrl, {
			...data,
			// fromTokenAddress: params.fromTokenAddress,
			// toTokenAddress: params.toTokenAddress,
			slippageTolerance: 0.5,
			senderAddress: "0xdFC37f7e7B95F780b13A856530ACed26A2A4B170",
			receiverAddress: "0xBcaEd0913f8C0fC6E4927e93D593504CfF9C1162",
			// widgetId: params.widgetId
		})
		return res.data;
	} catch (e) {
		console.error(`Fetching tx data from pathfinder: ${e}`)
	}    
}


export default getTransaction