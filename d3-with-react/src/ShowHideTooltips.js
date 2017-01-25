import React, {Component} from 'react';

export class ShowHideTooltips extends Component {
	constructor() {
		super();
		
		this.handleShow = (ev) => {
			ev.preventDefault();
			this.props.setAppState({
				showingAllTooltips: true,
				prevDomain: null
			})
		}
		
		this.handleHide = (ev) => {
			ev.preventDefault();
			this.props.setAppState({
				showingAllTooltips: false,
				prevDomain: null
			})
		}
	}
	
	render() {
		return(
			<p>
				{'Tooltips: '}
				<a href="#" onClick={this.handleShow}>Show all</a>
				<span> - </span>
				<a href="#" onClick={this.handleHide}>Hide all</a>
			</p>
		)
	}
}

export default ShowHideTooltips;