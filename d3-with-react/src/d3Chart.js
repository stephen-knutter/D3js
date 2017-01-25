import {EventEmitter} from 'events';
import * as d3 from 'd3';

import './d3Chart.less';

let ANIMATION_DURATION = 400;
let TOOLTIP_WIDTH = 30;
let TOOLTIP_HEIGHT = 30;

let ns = {};

ns.create = (el, props, state) => {
	let svg = d3.select(el).append('svg')
		.attr('class', 'd3')
		.attr('width', props.width)
		.attr('height', props.height);
	svg.append('g').attr('class', 'd3-points');
	svg.append('g').attr('class', 'd3-tooltips');
	
	let dispatcher = new EventEmitter();
	ns.update(el, state, dispatcher);
	
	return dispatcher;
};

ns.update = (el, state, dispatcher) => {
	let scales = ns._scales(el, state.domain);
	let prevScales = ns._scales(el, state.prevDomain);
	ns._drawPoints(el, scales, state.data, prevScales, dispatcher);
	ns._drawTooltips(el, scales, state.tooltips, prevScales);
};

ns._scales = (el, domain) => {
	if (!domain) {
		return null;
	}
	
	let width = el.offsetWidth;
	let height = el.offsetHeight;
	
	let x = d3.scaleLinear()
		.range([0, width])
		.domain(domain.x);
	
	let y = d3.scaleLinear()
		.range([height, 0])
		.domain(domain.y)
	
	let z = d3.scaleLinear()
		.range([5, 20])
		.domain([1, 10]);
	
	return {x: x, y: y, z: z};
};

ns._drawPoints = (el, scales, data, prevScales, dispatcher) => {
	let g = d3.select(el).selectAll('.d3-points');
	
	let point = g.selectAll('.d3-point').data(data, d => d.id);
			
	point.enter().append('circle')
		.attr('class', 'd3-point')
		.attr('cx', (d) => {
			if (prevScales) {
				return prevScales.x(d.x);
			}
			return scales.x(d.x);
		})
		.transition()
			.duration(ANIMATION_DURATION)
			.attr('cx', (d) => scales.x(d.x));
	
	point.attr('cy', (d) => scales.y(d.y))
		.attr('r', (d) => scales.z(d.z))
		.on('mouseover', (d) => {
			dispatcher.emit('point:mouseover', d);
		})
		.on('mouseout', (d) => {
			dispatcher.emit('point:mouseout', d);
		})
		.transition()
			.duration(ANIMATION_DURATION)
			.attr('cx', (d) => scales.x(d.x));
	
	if (prevScales) {
		point.exit()
			.transition()
				.duration(ANIMATION_DURATION)
				.attr('cx', (d) => scales.x(d.x))
				.remove();
	} else {
		point.exit().remove();
	}
};

ns._drawTooltips = (el, scales, tooltips, prevScales) => {
	let g = d3.select(el).selectAll('.d3-tooltips');
	
	let tooltipRect = g.selectAll('.d3-tooltips')
		.data(tooltips, (d) => d.id)
	
	tooltipRect.enter().append('rect')
		.attr('class', 'd3-tooltip-rect')
		.attr('width', TOOLTIP_WIDTH)
		.attr('height', TOOLTIP_HEIGHT)
		.attr('x', (d) => {
			if (prevScales) {
				return prevScales.x(d.x) - TOOLTIP_WIDTH / 2;
			}
		})
		.transition()
			.duration(ANIMATION_DURATION)
			.attr('x', (d) => scales.x(d.x) - TOOLTIP_WIDTH / 2);
	
	tooltipRect.attr('y', (d) => scales.y(d.y) - scales.z(d.z) / 2 - TOOLTIP_HEIGHT)
		.transition()
			.duration(ANIMATION_DURATION)
			.attr('x', (d) => scales.x(d.x) - TOOLTIP_WIDTH / 2)
	
	if (prevScales) {
		tooltipRect.exit()
			.transition()
				.duration(ANIMATION_DURATION)
				.attr('x', (d) => scales.x(d.x) - TOOLTIP_WIDTH / 2)
				.remove();
	} else {
		tooltipRect.exit().remove();
	}
	
	let tooltipText = g.selectAll('.d3-tooltip-text')
		.data(tooltips, (d) => d.id);
	
	tooltipText.enter().append('text')
		.attr('class', 'd3-tooltip-rect')
		.attr('dy', '0.35em')
		.attr('text-anchor', 'middle')
		.text((d) => d.z)
		.attr('x', (d) => {
			if (prevScales) {
				return prevScales.x(d.x);
			}
			return scales.x(d.x);
		})
		.transition()
			.duration(ANIMATION_DURATION)
			.attr('x', (d) => scales.x(d.x));
	
	tooltipText.attr('y', (d) => scales.y(d.y) - scales.z(d.z) / 2 - TOOLTIP_HEIGHT / 2)
		.transition()
			.duration(ANIMATION_DURATION)
			.attr('x', (d) => scales.x(d.x));
	
	if (prevScales) {
		tooltipText.exit()
			.transition()
				.duration(ANIMATION_DURATION)
				.attr('x', (d) => scales.x(d.x))
				.remove();
	} else {
		tooltipText.exit().remove();
	}
}

ns.destroy = (el) => {
}

export default ns;































