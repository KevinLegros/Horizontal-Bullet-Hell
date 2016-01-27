function Level(g, size) {
	var me = this;
	
	me._g = g;
	me._size = size;
	
	me.entities = [];
	me.bullets = [];
	
	me._levelTime = 0;
	
	me.player;
}

Level.prototype.init = function() {
	var me = this;
	
	me.player = new Player(me, {'x': 50, 'y': 250}, 20, 8, 'res/entities/player.png');
	
	
	me._movingStars = new Image();
	me._movingStars.src = 'res/bg/movingstars.png';
	me._movingStarsOffset = 0;
}

Level.prototype.update = function() {
	var me = this;
	
	// Enemies
	if(typeof level1.enemies[me._levelTime / 60] != 'undefined') {
		var enemies = level1.enemies[me._levelTime / 60];
		for(var i = 0; i < enemies.length; i++) {
			me.entities.push(new Enemy(me, enemies[i].position, enemies[i].width, enemies[i].height, enemies[i].sprite, enemies[i].pattern));
		}
	}
		
	if(me._g.input.isKeyDown(me._g.input.keys.SHIFT)) {
		me.player._speed = me.player._slowSpeed;
	}
	me.player.update();
	
	var nextBullets = [];
	for(var i = 0; i < me.bullets.length; i++) {
		me.bullets[i].update();
		
		if(me.bullets[i].team == 1) {
			for(var j = 0; j < me.entities.length; j++) {
				if(!me.entities[j].alive) {
					continue;
				}
				if(me.bullets[i].collidesWith(me.entities[j])) {
					me.bullets[i].alive = false;
					me.entities[j].alive = false;
				}
			}
		} else {
			if(me.bullets[i].collidesWith(me.player)) {
				me.bullets[i].alive = false;
				me.player.hit();
			}
		}
		
		if(me.bullets[i].alive) {
			nextBullets.push(me.bullets[i]);
		}
	}
	me.bullets = nextBullets;
	
	var nextEntities = [];
	for(var i = 0; i < me.entities.length; i++) {
		if(me.entities[i].alive) {
			me.entities[i].update();
		}
		if(me.entities[i].alive) {
			nextEntities.push(me.entities[i]);
		}
	}
	me.entities = nextEntities;
	
	me._movingStarsOffset -= 4;
	if(me._movingStarsOffset < -2000) {
		me._movingStarsOffset = 0;
	}
	
	me._levelTime++;
}

Level.prototype.render = function() {
	var me = this;
	
	var canvas = me._g.getCanvas();
	var ctx = canvas.getContext('2d');
	
	ctx.fillRect(0, 0, me._size.w, me._size.h);
	ctx.drawImage(this._movingStars, me._movingStarsOffset, 0);
		
	for(var i = 0; i < me.bullets.length; i++) {
		me.bullets[i].render();
	}
	for(var i = 0; i < me.entities.length; i++) {
		me.entities[i].render();
	}
	
	me.player.render();
}

Level.prototype.addBullet = function(sender, sprite) {
	var me = this;
	
	me.bullets.push(new Bullet(me, {'x': sender._pos.x, 'y': sender._pos.y}, 16, 16, sprite, sender.team));
}

	
Level.prototype.getSize = function() {
	var me = this;
	
	return me._size;
}