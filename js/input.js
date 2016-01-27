function Input(g) {
	var me = this;
	
		me._g = g || null,
		me._keyboardState = {},
		me._pressed = {};
		
		me.keys = {
			ENTER:	13,
			SHIFT:	16,
			CTRL:	17,
			ALT:	18,
			ESCAPE:	27,
			SPACE:	32,
			LEFT:	37,
			UP:		38,
			RIGHT:	39,
			DOWN:	40,
			
			C:		67
		};
		
	me._g.cnv.addEventListener('keydown', function() { me.handleKeyDown(event); }, false);
	me._g.cnv.addEventListener('keyup', function() { me.handleKeyUp(event); }, false);
	
	me.handleKeyDown = function(evt) {
		if(me._keyboardState[evt.keyCode]) {
			return;
		}
		me._pressed[evt.keyCode] = true;
		me._keyboardState[evt.keyCode] = true;
	}
	
	me.handleKeyUp = function(evt) {
		me._keyboardState[evt.keyCode] = false;
	}
	
	me.isKeyDown = function(keyCode) {
		return me._keyboardState[keyCode];
	}
	
	me.isKeyPressed = function(keyCode) {
		var ret = me._pressed[keyCode];
		me._pressed[keyCode]= false;
		return ret;
	}
	
	me.update = function() {
		me_pressed = {};
	}
}