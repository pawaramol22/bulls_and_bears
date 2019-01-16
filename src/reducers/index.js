import { combineReducers } from 'redux';


const stockReducer = (stocks=[], action) => {
	switch (action.type) {
		case 'FETCH_STOCKS':
			return action.payload;
		default:
			return stocks;
	}
};

const stockStatsReducer = (stats=[], action) => {
	switch (action.type) {
		case 'FETCH_STOCK':
			return action.payload;
		default:
			return stats;
	}
};

const selectedStockReducer = (selectedStock=null, action) => {
	if ('SELECT_STOCK' === action.type) {
		return action.payload;
	}
	return selectedStock;
};

export default combineReducers({
	stocks: stockReducer,
	selectedStock: selectedStockReducer,
	stats: stockStatsReducer
});
