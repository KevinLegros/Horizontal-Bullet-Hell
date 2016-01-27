;var Game = function() {
	var me = this;
	
	me.last = getTimeMillis();
	me.step = 1/60.0;
	me.dt = 0;
	me.elapsed = 0.0;
	me.gameTime = 0.0;
	me.totalElapsed = 0.0;
	me.frames = 0;
	me.ticks = 0;
	me.avgFps = 0;
	me.avgTicks = 0;
	
	me.cnv = document.getElementById('canvas');
	me.ctx = canvas.getContext('2d');
	
	me._size = {'w': me.cnv.width, 'h': me.cnv.height};
	
	me.isPaused = false;
	me.debug = false;
	
	me.menu;
	me.level;
	me.input;
	
	me.states = {
		MAIN_MENU: 0,
		PLAYING: 1
	}
	me.currentState = me.states.MAIN_MENU;
	
	me.init = function() {
		me.input = new Input(me);
		
		me.menu = new MainMenu(me);
		
		me.loop();
	}
	
	me.loop = function() {
		var now = getTimeMillis();
		me.dt = me.dt + Math.min(1, (now - me.last) / 1000);
		
		while(me.dt > me.step) {
			me.dt = me.dt - me.step;
			me.elapsed += me.step;
			me.totalElapsed += me.step;
			me.ticks++;
			me.update();
		}
		
		me.render();
				
		if(me.elapsed >= 1) {
			me.avgFps = me.frames;
			me.avgTicks = me.ticks;
			me.frames = 0;
			me.ticks = 0;
			me.elapsed = 0;
		}
		
				
		me.last = now;
		
		requestAnimationFrame(me.loop);
	}
	
	me.handleInput = function() {
		if(me.currentState == me.states.PLAYING) {
			if(me.input.isKeyPressed(me.input.keys.ESCAPE)) {
				me.isPaused = !me.isPaused;
			}
		}
		
		if(me.input.isKeyPressed(me.input.keys.C)) {
			me.debug = !me.debug;
		}
	}
	
	me.update = function() {
		me.handleInput();
		
		if(!me.isPaused) {
			if(me.currentState == me.states.MAIN_MENU) {
				me.menu.update();
			} else if(me.currentState == me.states.PLAYING) {
				me.level.update();
			}
			me.gameTime += me.step;
		}
		me.input.update();
	}
	
	me.render = function() {
		me.ctx.fillStyle = 'black';
		/*me.ctx.save();
		me.ctx.setTransform(1, 0, 0, 1, 0, 0);*/
		me.ctx.clearRect(0, 0, me._size.w, me._size.h);
		//me.ctx.restore();
		me.ctx.fillRect(0, 0, me._size.w, me._size.h);
		
		if(me.currentState == me.states.MAIN_MENU) {
			me.menu.render();
		} else if(me.currentState == me.states.PLAYING) {
			me.level.render();
		}
		
		if(me.debug) {
			me.showDebug();
		}
		
		me.frames++;
	}
	
	me.drawDebug = function(text, x, y) {
		me.ctx.fillStyle = 'white';
		me.ctx.font = '10px Arial';
		me.ctx.fillText(text, x, y);
	}
	
	me.showDebug = function() {
		var i = 0;
		me.drawDebug('FPS: ' + me.avgFps, 10, ++i * 10);
		me.drawDebug('Ticks: ' + me.avgTicks, 10, ++i * 10);
		me.drawDebug('Time elapsed: ' + Math.floor(me.totalElapsed, 0) + 's', 10, ++i * 10);
		me.drawDebug('Game time: ' + Math.floor(me.gameTime, 0) + 's', 10, ++i * 10);
		if(me.currentState == me.states.PLAYING) {
			me.drawDebug('Level time: ' + Math.floor(me.level._levelTime / 60, 0) + 's', 10, ++i * 10);
			me.drawDebug('Entities: ' + me.level.entities.length, 10, ++i * 10);
			me.drawDebug('Bullets: ' + me.level.bullets.length, 10, ++i * 10);
			me.drawDebug('Player Health: ' + me.level.player.life, 10, ++i * 10);
		}
				
		if(me.isPaused) {
			me.drawDebug('PAUSED', 10, ++i * 10);
		}
	}
	
	me.getCanvas = function() {
		return me.cnv;
	}
	
	me.getSize = function() {
		return me._size;
	}
	
	me.setState = function(state) {
		if(state == me.states.PLAYING) {
			me.level = new Level(me, me._size);
			me.level.init();
			me.currentState = state;
		}
	}
}