import React, {Component} from 'react';
import _ from 'lodash';

import './Stats.less';

export class Stats extends Component {
	constructor() {
		super();
		
		this.renderCount = (data) => {
			return(
				<div className="Stats-item">
					{'Count: '}<strong>{data.length}</strong>
				</div>
			)
		}
		
		this.renderAverage = (data) => {
			let avg;
			let n = data.length;
			
			if (!n) {
				avg = '-';
			} else {
				let sum = _.reduce(data, (sum, d) => {
					return sum + d.z;
				}, 0);
				avg = Math.round(sum / n * 10) / 10;
			}
			return(
				<div className="Stats-item">
					{'Average size: '}<strong>{avg}</strong>
				</div>
			);
		}
	}
	
	render() {
		let data = this.props.data;
		
		return(
			<div className="Stats">
				{this.renderCount(data)}
				{this.renderAverage(data)}
			</div>
		)
	}
}

export default Stats;