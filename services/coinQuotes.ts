// import { CoinQuotes } from "../types/coinQuotes";
//show every coin quotes
let baseUrl = 'https://economia.awesomeapi.com.br/json/;'

export const getQuotes = async () => {
  let url = baseUrl + 'all';
  try{
    const response = await fetch(url);
    const data = await response.json();
    if(data) {
      return data;
    }
    return [];
  } catch (error) {
    return false;
  }
}