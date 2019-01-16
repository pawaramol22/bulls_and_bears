import iextrading from '../apis/iextrading';


export const selectStock = (stock) => {
	return {
    	type: "SELECT_STOCK",
    	payload: stock
  	};
}

export const fetchStocks = () => async (dispatch, getState) => {
	const response = await iextrading.get('/stock/market/list/infocus')
	dispatch({ type: "FETCH_STOCKS", payload: response.data });
};

export const fetchStock = () => async (dispatch, getState) => {
	if(getState().selectedStock){
		const response = await iextrading.get('/stock/' + getState().selectedStock.symbol + '/stats')
		dispatch({ type: "FETCH_STOCK", payload: response.data });
	} else {
		dispatch({ type: "FETCH_STOCK", payload: getState().stats });
	}
};