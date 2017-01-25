import React, {Component} from 'react';
import _ from 'lodash';

export class Pagination extends Component {
	constructor() {
		super();
		
		this.state = {
			data: '',
			domain: '',
			tooltips: '',
			prevDomain: ''
		}
		
		this.handlePrevious = (ev) => {
			ev.preventDefault();
			this.shiftData(-20);
		}
		
		this.handleNext = (ev) => {
			ev.preventDefault();
			this.shiftData(+20);
		}
		
		this.shiftData = (step) => {
			let currentDomain = this.props.appState.domain.x;
			let newDomain = _.map(currentDomain, (x) => x + step);
			this.setState({
				data: this.props.getData(newDomain),
				domain: _.assign({}, this.props.domain, {x: newDomain}),
				tooltips: [],
				prevDomain: this.props.domain
			})
		}
	}
	
	render() {
		return(
			<p>
				{'Pages: '}
				<a href="#" onClick={this.handlePrevious}>Previous</a>
				<span> - </span>
				<a href="#" onClick={this.handleNext}>Next</a>
			</p>
		);
	}
}

export default Pagination;