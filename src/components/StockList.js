import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { selectStock, fetchStocks } from '../actions'


class StockList extends React.Component {

	componentDidMount() {
		this.props.fetchStocks();
	}

	componentDidUpdate() {
		// When page loads first time, show first stock in list on dashboard
		if (!this.props.selectedStock && this.props.stocks) {
			this.props.selectStock(this.props.stocks[0]);
		}
	}

	renderStockList = () => {
		if (!this.props.stocks){
			return <span className="item" >Loading...</span>;
		}

		return _.map(this.props.stocks, stock => {
			const classes = this.props.selectedStock && stock.symbol === this.props.selectedStock.symbol ? 'item active' : 'item';
			const labelClasses = stock.regularMarketChangePercent.raw < 0 ? 'ui horizontal label red' : 'ui horizontal label green';
			return (
				<div key={ stock.symbol } className={classes} onClick={ () => this.props.selectStock(stock) }>
					<h4>{ stock.symbol }</h4> 
					${ stock.regularMarketPrice.fmt } <span className={labelClasses}>{ stock.regularMarketChangePercent.fmt }</span>
				</div>
			);
		});
	}

	render() {

		return(
		  	<div className="four wide column">
			    <div className="ui vertical menu right">
				    <div className="item">
				    	<div className="ui input"><input type="text" placeholder="Search..."></input></div>
				  	</div>
				  	<div className="item">
				  		<div className="menu">
				  			{ this.renderStockList() }
						</div>
				  	</div>
			  	</div>
		  	</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		stocks: state.stocks,
		selectedStock: state.selectedStock
	};
}

export default connect(mapStateToProps, { selectStock, fetchStocks })(StockList);