function Enemy(level, pos, w, h, sprite, pattern) {
	this.team = 2;
	
	Entity.call(this, level, pos, w, h, sprite);
	
	this._pattern = pattern || {};
	
	this._initialPos = {'x': pos.x, 'y': pos.y};
	
	this._speed = this._normalSpeed;
	
	this._fireDelay = 60 / 2;
	this._fireTime = 0;
	
	this.loopIndex = 0;
	if(pattern.type == 'waypoint' || pattern.type == 'loop') {
		this._speed = pattern.speed;
		this.nextPos = pattern.positions[0];
		this.hMove = this._pos.x > this.nextPos.x ? -1 : (this._pos.x < this.nextPos.x ? 1 : 0);
		this.vMove = this._pos.y > this.nextPos.y ? -1 : (this._pos.y < this.nextPos.y ? 1 : 0);
	} else if(this._pattern.type == 'circle') {
		this.center = {'x': this._pos.x, 'y': this._pos.y};
		this.angle = pattern.angle;
		this.orientation = pattern.orientation;
		this.radius = pattern.radius;
		this._speed = pattern.speed;
	}
}

Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.update = function() {
	// Movement
	if(this._pattern.type == 'waypoint' || this._pattern.type == 'loop') {
		this.moveOrLoop();
	} else if(this._pattern.type == 'circle') {
		this.moveCircle();
	}
	
	
	
	if(this._fireTime == 0) {
		this._fireTime = this._fireDelay;
	}
	
	if(this._fireTime == this._fireDelay) {
		this._level.addBullet(this, 'res/entities/bullet_enemy.png');
	}
	if(this._fireTime > 0) {
		this._fireTime--;
	}
}

Enemy.prototype.render = function() {
	Entity.prototype.render.call(this);
		
	if(this._level._g.debug) {
		var ctx = this._level._g.getCanvas().getContext('2d');
		ctx.fillStyle = 'white';
		ctx.font = '10px Arial';
		ctx.fillText(Math.round(this._pos.x, 2) + ',' + Math.round(this._pos.y, 2), this._pos.x - this._w / 2, this._pos.y + this._h * 2);
		
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'pink';
		ctx.beginPath();
		ctx.rect(this._pos.x - this._w / 2, this._pos.y - this._h / 2, this._w, this._h);
		ctx.stroke();
		ctx.strokeStyle = 'white';
		
		if(this._pattern.type == 'waypoint') {
			ctx.lineWidth = 1;
			ctx.strokeStyle = 'white';
			ctx.beginPath();
			ctx.moveTo(this._initialPos.x, this._initialPos.y);
			for(var i = 0; i < this._pattern.positions.length; i++) {
				ctx.lineTo(this._pattern.positions[i].x, this._pattern.positions[i].y);
			}
			ctx.stroke();
		}
	}
}

Enemy.prototype.moveOrLoop = function() {
	if(((this.hMove < 0 && this._pos.x < this.nextPos.x) || (this.hMove > 0 && this._pos.x > this.nextPos.y) || (this.hMove == 0 && this._pos.x == this.nextPos.x)) && 
		((this.vMove < 0 && this._pos.y < this.nextPos.y) || (this.vMove > 0 && this._pos.y > this.nextPos.y) || (this.vMove == 0 && this._pos.y == this.nextPos.y))) {
		this.loopIndex++;
		if(this.loopIndex >= this._pattern.positions.length) {
			if(this._pattern.type == 'loop') {
				this.loopIndex = 0;
			} else {
				this.loopIndex = this._pattern.positions.length;
				return;
			}
		}
		this._pos.x = this.nextPos.x;
		this._pos.y = this.nextPos.y;
		this.nextPos = this._pattern.positions[this.loopIndex];
		this.hMove = this._pos.x > this.nextPos.x ? -1 : (this._pos.x < this.nextPos.x ? 1 : 0);
		this.vMove = this._pos.y > this.nextPos.y ? -1 : (this._pos.y < this.nextPos.y ? 1 : 0);
	} else {
		var step = this._level._g.step;
		
		// Normalize
		var direction = {'x': this.nextPos.x - this._pos.x, 'y': this.nextPos.y - this._pos.y};
		var normalized = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
		
		this._pos.x += normalized.x * this._speed * step;
		this._pos.y += normalized.y * this._speed * step;
		
		/*if(this.hMove < 0) {
			// Move left
			this._velocity.x = -this._speed * step;
		} else if(this.hMove > 0) {
			this._velocity.x = this._speed * step;
		}
		
		if(this.vMove < 0) {
			this._velocity.y = -this._speed * step;
		} else if(this.vMove > 0) {
			this._velocity.y = this._speed * step;
		}*/
		
		
		
		
		/*if(this._pos.x > this.nextPos.x) {
			// Entity is left to next pos, go right
			this._velocity.x = -this._speed * step
		} else if(this._pos.x < this.nextPos.x) {
			// Entity is right to next pos, go left
			this._velocity.x = this._speed * step;
		}
		
		if(this._pos.y > this.nextPos.y) {
			// Entity is below next pos, go up
			this._velocity.y = -this._speed * step;
		} else if(this._pos.y < this.nextPos.y) {
			// Entity is above next pos, go down
			this._velocity.y = this._speed * step;
		}*/
		
		this._pos.x += this._velocity.x;
		this._pos.y += this._velocity.y;
		
		if((this.hMove < 0 && this._pos.x <= this.nextPos.x) || (this.hMove > 0 && this._pos.x >= this.nextPos.x)) {
			this._pos.x = this.nextPos.x;
			this.hMove = 0;
		}
		
		if((this.vMove < 0 && this._pos.y <= this.nextPos.y) || (this.vMove > 0 && this._pos.y >= this.nextPos.y)) {
			this._pos.y = this.nextPos.y;
			this.vMove = 0;
		}
	}
}

Enemy.prototype.moveCircle = function() {
	var rad = this.angle * (Math.PI / 180);
	this._pos.x = this.center.x + this.radius * Math.cos(rad);
	this._pos.y = this.center.y + this.radius * Math.sin(rad);
	
	this.angle += this._speed * this.orientation;
}
