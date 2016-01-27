var Menu = function(g) {
	var me = this;
	
	me._g = g;
	me.buttonIndex = 0;
	
	me.buttons = [];
}

Menu.prototype.update = function() {
	var me = this;
	
	var input = me._g.input;
	
	if(input.isKeyPressed(input.keys.DOWN)) {
		me.buttonIndex++;
		if(me.buttonIndex >= me.buttons.length) {
			me.buttonIndex = 0;
		}
	} else if(input.isKeyPressed(input.keys.UP)) {
		me.buttonIndex--;
		if(me.buttonIndex < 0) {
			me.buttonIndex = me.buttons.length - 1;
		}
	}
}

Menu.prototype.render = function() {
	var me = this;
	
	var ctx = me._g.getCanvas().getContext('2d');
	ctx.font = '20px Arial';
	
	var size = me._g.getSize();
	
	for(var i = 0; i < me.buttons.length; i++) {
		ctx.fillStyle = 'white';
		if(me.buttonIndex == i) {
			ctx.fillStyle = 'green';
		}
		ctx.fillText(me.buttons[i], size.w / 2 - ctx.measureText(me.buttons[i]).width / 2, size.h / 2 - me.buttons.length * 30 / 2 + i * 30);
	}
}