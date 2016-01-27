function Bullet(level, pos, w, h, sprite, team) {
	this.team = team || 1;
	
	Entity.call(this, level, pos, w, h, sprite);
	
	this._speed = 600;
	
	var step = this._level._g.step;
	if(this.team == 1) {
		this._velocity.x = this._speed * step;
		this._velocity.y = mathRandom(-30, 30) * step;
	} else {
		this._velocity.x = -this._speed / 4 * step;
		this._velocity.y = 0;
	}
}

Bullet.prototype = Object.create(Entity.prototype);

Bullet.prototype.update = function() {
	Entity.prototype.update.call(this);
	
	this._pos.x += this._velocity.x;
	this._pos.y += this._velocity.y;
	
	if(this._pos.x - this._w / 2 > this._level.getSize().w || this._pos.x + this._w / 2 < 0) {
		this.alive = false;
	}
}

Bullet.prototype.render = function() {
	Entity.prototype.render.call(this);
	
	if(this._level._g.debug) {
		var ctx = this._level._g.getCanvas().getContext('2d');
		ctx.fillStyle = 'white';
		ctx.font = '10px Arial';
		ctx.fillText(Math.round(this._pos.x, 2) + ',' + Math.round(this._pos.y, 2), this._pos.x - this._w / 2, this._pos.y - this._h / 2);
		
		ctx.strokeStyle = 'yellow';
		ctx.rect(this._pos.x - this._w / 2, this._pos._y - this._h / 2, this._w, this._h);
		ctx.stroke();
	}
}

Bullet.prototype.collidesWith = function(entity) {
	return this._pos.x + this._w / 2 > entity._pos.x - entity._w / 2 &&
		this._pos.x - this._w / 2 < entity._pos.x + entity._w / 2 &&
		this._pos.y + this._h / 2 > entity._pos.y - entity._h / 2 &&
		this._pos.y - this._h / 2 < entity._pos.y + entity._h / 2;
}