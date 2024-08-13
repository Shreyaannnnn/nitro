import axios from 'axios';
const PATH_FINDER_API_URL = "https://api-beta.pathfinder.routerprotocol.com/api"


async function getQuote(params: any) {
    const endpoint = "v2/quote";
    const quoteUrl = `${PATH_FINDER_API_URL}/${endpoint}`;
    console.log(quoteUrl);
    
  
    try {
      const res = await axios.get(quoteUrl, { params });
      console.log(res);
      return res;
    } catch (e) {
      console.error(`Fetching quote data from pathfinder: ${e}`);
      return null;
    }
  }

const getquote = async() => {
    try{

const trialParams = {
    fromTokenAddress: "0x4200000000000000000000000000000000000006",
    toTokenAddress: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
    amount: "1000000000000000",
    fromTokenChainId: 10, 
    toTokenChainId: 42161,   
    partnerId: "0",
  };


// const trialParams = {
//   fromTokenAddress: "0x0000000000000000000000000000000000001010",
//   toTokenAddress: "0x4200000000000000000000000000000000000006",
//   amount: "1000000000000000",
//   fromTokenChainId: 137, 
//   toTokenChainId: 10,   
//   partnerId: "0",
// };



getQuote(trialParams)

        
    }
    catch (err){
        console.log(err);

        return(err)
    }

}

export default getquote;




//   BuyAssetTokens();


