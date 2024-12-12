//show dollar to brl coin quote
let baseUrl = 'https://economia.awesomeapi.com.br/json/;'

export const getEURQuotes = async () => {
  let url = baseUrl + 'last/EUR-BRL';
  try{
    const response = await fetch(url);
    const data = await response.json();
    if(data.EURBRL) {
      return parseFloat(data.EURBRL.ask);
    }
    return [];
  } catch (error) {
    return 0;
  }
}