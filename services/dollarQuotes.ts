//show dollar to brl coin quote
let baseUrl = 'https://economia.awesomeapi.com.br/json';

export const getDollarQuotes = async () => {
  let url = baseUrl + '/last/USD-BRL';
  try{
    const response = await fetch(url);
    const data = await response.json();
    if(data.USDBRL) {
      return parseFloat(data.USDBRL.ask);
    }
    return 0;
  } catch (error) {
    return 0;
  }
}