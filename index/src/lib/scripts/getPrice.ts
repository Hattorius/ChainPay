const getPrice = async (token: string): Promise<number | undefined> => {
	const response = await fetch(
		`https://api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?contract_addresses=${token}&vs_currencies=usd`
	);
	const data: any = await response.json();

	return data[token].usd;
};

export default getPrice;
