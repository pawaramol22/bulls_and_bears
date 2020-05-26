import rapidApi from '../apis/rapid';


export const selectStock = (stock) => {
	return {
    	type: "SELECT_STOCK",
    	payload: stock
  	};
}

export const fetchStocks = () => async (dispatch, getState) => {
	const response = await rapidApi.get('market/get-summary?region=US&lang=en');
	dispatch({ type: "FETCH_STOCKS", payload: response.data.marketSummaryResponse.result });
};

export const fetchStock = () => async (dispatch, getState) => {
	if(getState().selectedStock){
		const response = await rapidApi.get(`stock/v2/get-summary?region=US&symbol=${getState().selectedStock.symbol}`);
		dispatch({ type: "FETCH_STOCK", payload: response.data });
	} else {
		dispatch({ type: "FETCH_STOCK", payload: getState().stats });
	}
};