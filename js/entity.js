function Entity(level, pos, w, h, sprite) {
	var me = this;

	me._level = level || null;
	me._pos = pos || {'x': 0, 'y': 0};
	me._velocity = {'x': 0, 'y': 0};
	me._w = w;
	me._h = h;
	me._sprite = sprite;
	me._speed = 0;
	me._normalSpeed = 200;
	me._slowSpeed = 50;
	
	me.alive = true;
	
	if(me._sprite != '') {
		me._spriteImg = new Image();
		me._spriteImg.src = me._sprite;
	}
}

Entity.prototype.update = function() {

}

Entity.prototype.render = function() {
	var me = this;
	var ctx = me._level._g.getCanvas().getContext('2d');
	
	if(me._spriteImg) {
		ctx.drawImage(me._spriteImg, me._pos.x - me._w / 2, me._pos.y - me._h / 2);
	} else {
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#003300';
		ctx.fillStyle = 'green';
		ctx.beginPath();
		ctx.arc(me._pos.x, me._pos.y, me._w / 2, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
	}
	
}

Entity.prototype.constrain = function() {
	var me = this;

	if(me._pos.x < 0) {
		me._pos.x = 0;
	}
	if(me._pos.y < 0) {
		me._pos.y = 0;
	}
	if(me._pos.x + me._w > me._level.getSize().w) {
		me._pos.x = me._level.getSize().w - me._w;
	}
	if(me._pos.y + me._h > me._level.getSize().h) {
		me._pos.y = me._level.getSize().h - me._h;
	}
}