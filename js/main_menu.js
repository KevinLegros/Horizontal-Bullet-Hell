var MainMenu = function(g) {
	var me = this;
	
	Menu.call(me, g);
	
	me.buttons = [
		'Play',
		'Some stuff',
		'Some other stuff'
	];
	
	me._movingStars = new Image();
	me._movingStars.src = 'res/bg/movingstars.png';
	me._movingStarsOffset = 0;
}

MainMenu.prototype = Object.create(Menu.prototype);

MainMenu.prototype.update = function() {
	var me = this;
	Menu.prototype.update.call(me);
	
	if(me._g.input.isKeyPressed(me._g.input.keys.ENTER)) {
		if(me.buttonIndex == 0) {
			me._g.setState(me._g.states.PLAYING);
		}
	}
	
	me._movingStarsOffset -= 4;
	if(me._movingStarsOffset < -2000) {
		me._movingStarsOffset = 0;
	}
}

MainMenu.prototype.render = function() {
	var me = this;
	var canvas = me._g.getCanvas();
	var ctx = canvas.getContext('2d');
	
	var size = me._g.getSize();
	
	ctx.fillRect(0, 0, size.w, size.h);
	ctx.drawImage(this._movingStars, me._movingStarsOffset, 0);
	
	Menu.prototype.render.call(me);
}