(function() {
	window.performance = window.performance || {};
	performance.now = (function() {
		return performance.now			||
		       performance.mozNow		||
			   performance.msNow		||
			   performance.oNow			||
			   performance.webkitNow	||
			   function() { return new Date().getTime(); };
	})();

	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
			|| window[vendors[x] + 'CancelRequestAnimationFrame'];
	}
	
	if(!window.requestAnimationFrame) {
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, (1000/60.0) - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		}
	}
	
	if(!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		}
	}
}());


function getTimeMillis() { return window.performance && window.performance.now ? window.performance.now() : new Date().getTime(); }
function mathLimit(x, min, max)			{ return Math.max(min, Math.min(max, x));	}
function mathBetween(n, min, max)		{ return ((n >= min) && (n <= max));		}
function mathAccelerate(v, accel, dt)	{ return v + (accel * dt);					}
function mathLerp(n, dn, dt)			{ return n + (dn * dt);						}
function mathRandom(min, max)			{ return Math.random() * (max - min) + min;	}
function mathRandomInt(min, max)		{ return Math.floor(Math.random() * (max - min + 1)) + min;	}

function brighten(hex, percent) {
	var a = Math.round(255 * percent / 100),
		r = a + parseInt(hex.substr(1, 2), 16),
		g = a + parseInt(hex.substr(3, 2), 16),
		b = a + parseInt(hex.substr(5, 2), 16);
		
	r = r<255?(r<1?0:r):255;
	g = g<255?(g<1?0:g):255;
	b = b<255?(b<1?0:b):255;
	
	return '#' + (0x1000000 + (r * 0x10000) + (g * (0x100) + b)).toString(16).slice(1);
}

function darken(hex, percent) {
	return brighten(hex, -percent);
}

function overlaps(box1, box2) {
	return !((box1.right  < box2.left)   ||
			 (box1.left   > box2.right)  ||
			 (box1.top    > box2.bottom) ||
			 (box1.bottom < box2.top));
}

function lineIntercepts(x1, y1, x2, y2, x3, y3, x4, y4, d) {
	var denom = ((y4-y3) * (x2-x1)) - ((x4-x3) * (y2-y1));
	if(denom != 0) {
		var ua = (((x4-x3) * (y1-y3)) - ((y4-y3) * (x1-x3))) / denom;
		if((ua >= 0) && (ua <= 1)) {
			var ub = (((x2-x1) * (y1-y3)) - ((y2-y1) * (x1-x3))) / denom;
			if((ub >= 0) && (ub <= 1)) {
				var x = x1 + (ua * (x2-x1));
				var y = y1 + (ua * (y2-y1));
				return {x: x, y: y, d: d};
			}
		}
	}
	return null;
}

function distance(x1, y1, x2, y2) {
	return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}