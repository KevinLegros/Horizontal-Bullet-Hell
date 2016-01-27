var level1 = {
	enemies: {
		1: [
			{
				sprite: 'res/entities/enemy.png',
				position: {
					x: 300,
					y: 250
				},
				width: 20,
				height: 20,
				pattern: {
					type: 'fixed'
					/*type: 'waypoint',
					speed: 200,
					positions: [
						{'x': 400, 'y': 200},
						{'x': 500, 'y': 100}
					]*/
				}
			}
		],
		3: [
			{
				sprite: 'res/entities/enemy.png',
				position: {
					x: 500,
					y: 100
				},
				width: 20,
				height: 20,
				pattern: {
					type: 'fixed'
					/*type: 'loop',
					speed: 100,
					positions: [
						{'x': 500, 'y': 200},
						{'x': 500, 'y': 100}
					]*/
				}
			},
			{
				sprite: 'res/entities/enemy.png',
				position: {
					x: 500,
					y: 400
				},
				width: 20,
				height: 20,
				pattern: {
					type: 'fixed'
					/*type: 'loop',
					speed: 100,
					positions: [
						{'x': 500, 'y': 300},
						{'x': 500, 'y': 400}
					]*/
				}
			}
		],
		5: [
			{
				sprite: 'res/entities/enemy.png',
				position: {
					x: 500,
					y: 250
				},
				width: 20,
				height: 20,
				pattern: {
					type: 'circle',
					angle: 0,
					orientation: 1,
					speed: 3,
					radius: 100
				}
			}
		]
	}
};