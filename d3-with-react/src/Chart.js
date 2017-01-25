import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import d3Chart from './d3Chart';

import './Chart.less';

export class Chart extends Component {
	constructor() {
		super();
		
		this.state = {
			dispatcher: null,
			width: '100%',
			height: '300px'
		}
		
		this.getChartState = () => {
			let appState = this.props.appState;
			
			let tooltips = [];
			if (appState.showingAllTooltips) {
				tooltips = appState.data;
			} else if (appState.tooltip) {
				tooltips = [appState.tooltip];
			}
			
			return _.assign({}, appState, {tooltips: tooltips});
		}
		
		this.showTooltip = (d) => {
			if (this.props.appState.showingAllTooltips) {
				return;
			}
			
			this.props.setAppState({
				tooltip: d,
				prevDomain: null
			});
		}
		
		this.hideTooltip = () => {
			if (this.props.appState.showingAllTooltips) {
				return;
			}
			
			this.props.setAppState({
				tooltip: null,
				prevDomain: null
			});
		}
	}
	
	componentDidMount() {
		let el = ReactDOM.findDOMNode(this);
		let dispatcher = d3Chart.create(el, {
			width: this.state.width,
			height: this.state.height
		}, this.getChartState());
		dispatcher.on('point:mouseover', this.showTooltip);
		dispatcher.on('point:mouseout', this.hideTooltip);
		this.setState({dispatcher: dispatcher});
	}
	
	componentDidUpdate(prevProps, prevState) {
		let el = ReactDOM.findDOMNode(this);
		d3Chart.update(el, this.getChartState, this.state.dispatcher);
	}
	
	render() {
		return(
			<div className="Chart"></div>
		)
	}
}

export default Chart;