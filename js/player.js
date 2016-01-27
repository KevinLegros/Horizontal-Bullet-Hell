function Player(level, pos, w, h, sprite) {
	var me = this;
	
	me.team = 1;
	
	Entity.call(me, level, pos, w, h, sprite);
	
	me._speed = me._normalSpeed;
	
	me._fireDelay = 60 / 6;
	me._fireTime = 0;
	
	me.life = 100;
}

Player.prototype = Object.create(Entity.prototype);

Player.prototype.update = function() {
	var me = this;
	Entity.prototype.update.call(me);
	
	var input = me._level._g.input;
	me._velocity.x = 0;
	me._velocity.y = 0;
	
	var step = me._level._g.step;
	
	if(input.isKeyDown(input.keys.LEFT)) {
		me._velocity.x = -me._speed * step;
	} else if(input.isKeyDown(input.keys.RIGHT)) {
		me._velocity.x = me._speed * step;
	}
	
	if(input.isKeyDown(input.keys.UP)) {
		me._velocity.y = -me._speed * step;
	} else if(input.isKeyDown(input.keys.DOWN)) {
		me._velocity.y = me._speed * step;
	}
	
	if(input.isKeyDown(input.keys.SPACE)) {
		if(me._fireTime == 0) {
			me._fireTime = me._fireDelay;
		}
	}
	
	me._pos.x += me._velocity.x;
	me._pos.y += me._velocity.y;
	
	Entity.prototype.constrain.call(me);
	
	if(me._fireTime == me._fireDelay) {
		me._level.addBullet(me, 'res/entities/bullet_player.png');
	}
	if(me._fireTime > 0) {
		me._fireTime--;
	}
	
	me._speed = me._normalSpeed;
}

Player.prototype.render = function() {
	Entity.prototype.render.call(this);
}

Player.prototype.hit = function() {
	this.life -= 10;
}