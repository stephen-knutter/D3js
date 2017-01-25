import React, {Component} from 'react';
import _ from 'lodash';

import dataGenerator from './dataGenerator';
import Pagination from './Pagination';
import Chart from './Chart';
import Stats from './Stats';
import ShowHideTooltips from './ShowHideTooltips';
import AddRemoveDatum from './AddRemoveDatum';

import './App.less';

export class App extends Component {
	constructor() {
		super();
		
		this._allData = dataGenerator.generate(50);
		
		this.addDatum = (domain) => {
			this._allData.push(dataGenerator.generateDatum(domain));
			return this.getData(domain);
		}
		
		this.removeDatum = (domain) => {
			let match = _.find(this._allData, this.isInDomain.bind(null, domain));
			if (match) {
				this._allData = _.reject(this._allData, {id: match.id});
			}
			return this.getData(domain);
		}
		
		this.isInDomain = (domain, d) => {
			return d.x >= domain[0] && d.x <= domain[1];
		}
		
		this.setAppState = (partialState, callback) => {
			return this.setState(partialState, callback);
		}
		
		this._getData = (domain) => {
			return _.filter(this._allData, this.isInDomain.bind(null, domain));
		}
		
		this.state = {
			data: this._getData([0, 30]),
			domain: {x: [0, 30], y: [0, 100]},
			tooltip: null,
			prevDomain: null,
			showingAllTooltips: false
		}
	}
	
	render() {
		return(
			<div className="App">
				<Pagination 
					appState={this.state}
					setAppState={this.setAppState}
					getData={this.getData} />
				<Chart
					appState={this.state}
					setAppState={this.setAppState} />
				<Stats data={this.state.data} />
				<ShowHideTooltips
					appState={this.state}
					setAppState={this.setAppState} />
				<AddRemoveDatum
					appState={this.state}
					setAppState={this.setAppState}
					addDatum={this.addDatum}
					removeDatum={this.removeDatum} />
			</div>
		)
	}
}

export default App;