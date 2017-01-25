import cuid from 'cuid';

let X_MIN = 1,
	X_MAX = 100,
	Y_MIN = 10,
	Y_MAX = 90,
	Z_MIN = 1,
	Z_MAX = 10;

let ns = {};

ns.generate = (n) => {
	let res = [];
	for (var i = 0; i < n; i++) {
		res.push(ns.generateDatum([X_MIN, X_MAX]));
	}
	return res;
}

ns.generateDatum = (domain) => {
	return {
		id: ns._uid(),
		x: ns._randomIntBetween(domain[0], domain[1]),
		y: ns._randomIntBetween(Y_MIN, Y_MAX),
		z: ns._randomIntBetween(Z_MIN, Z_MAX)
	};
};

ns._randomIntBetween = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
};

ns._uid = () => cuid();

export default ns;