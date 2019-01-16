import React from 'react';
import { connect } from 'react-redux';

import {fetchStock} from '../actions';


class Dashboard extends React.Component {

	marketCap(labelValue) {
	    // Nine Zeroes for Billions
	    return Math.abs(Number(labelValue)) >= 1.0e+9
	    ? Math.abs(Number(labelValue)) / 1.0e+9 + "B"
	    // Six Zeroes for Millions 
	    : Math.abs(Number(labelValue)) >= 1.0e+6
	    ? Math.abs(Number(labelValue)) / 1.0e+6 + "M"
	    // Three Zeroes for Thousands
	    : Math.abs(Number(labelValue)) >= 1.0e+3
	    ? Math.abs(Number(labelValue)) / 1.0e+3 + "K"
	    : Math.abs(Number(labelValue));
	}

	componentDidUpdate(prevProps){
		const prevSymbol = prevProps.stock ? prevProps.stock.symbol : '';
		const thisSymbol = this.props.stock ? this.props.stock.symbol : '';
		if(prevSymbol !== thisSymbol){
			this.props.fetchStock();
		}
	}

	render() {

		const { stock, stocks, stats } = this.props;
		if(!stock) {
			return (<div className="twelve wide stretched column">Select a stock</div>);
		}

		const labelClasses = stock.change < 0 ? 'ui horizontal label red' : 'ui horizontal label green';
		const ahLabelClasses = stock.extendedChange < 0 ? 'ui horizontal label red' : 'ui horizontal label green';
		return(
			<div className="twelve wide stretched column">
				<div className="ui">
		    		<h2>{ stock.symbol}</h2> 
		    		<div>{ stock.companyName }</div>
		    		<div>
		    			<strong>${ stock.delayedPrice }</strong> <span className={labelClasses}>{ stock.change }</span> | AH: ${ stock.extendedPrice } <span className={ahLabelClasses}>{ stock.extendedChange }</span>
		    		</div>
				</div>
				<div className="ui">
					Market cap: {this.marketCap(stats.marketcap)} <br/>
					52 Week High: <span className="ui horizontal label green">{stats.week52high}</span> <br/>
					52 Week Low: <span className="ui horizontal label red">{stats.week52low}</span> <br/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state.stats);
	return {
		stock: state.selectedStock,
		stocks: state.stocks,
		stats: state.stats
	}
}

export default connect(mapStateToProps, { fetchStock })(Dashboard);
