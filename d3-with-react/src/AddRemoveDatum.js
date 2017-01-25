import React, {Component} from 'react';

export class AddRemoveDatum extends Component {
	constructor() {
		super();
		
		this.handleAdd = (ev) => {
			ev.preventDefault();
			let domain = this.props.appState.domain.x;
			this.props.setAppState({
				data: this.props.addDatum(domain),
				prevDomain: null
			})
		}
		
		this.handleRemove = (ev) => {
			ev.preventDefault();
			let domain = this.props.appState.domain.x;
			this.props.setAppState({
				data: this.props.removeDatum(domain),
				prevDomain: null
			})
		}
	}
	
	render() {
		return(
			<p>
				{'Data points: '}
				<a href="#" onClick={this.handleAdd}>Add</a>
				<span> - </span>
				<a href="#" onClick={this.handleRemove}>Remove</a>
			</p>
		)
	}
}

export default AddRemoveDatum;