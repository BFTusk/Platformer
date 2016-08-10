var _Keys = [ "Left", "Right", "Jump", "Shoot" ];
var Key = {
	Left: { keys: [ 65, 37 ], pressed: false },
	Right: { keys: [ 68, 39 ], pressed: false },
	Jump: { keys: [ 32, 87, 38 ], pressed: false },
	Shoot: { keys: [ 17 ], pressed: false }
};

function registerKeys() {
	document.onkeydown = function(event) {
		_Keys.forEach(function(e) {
			Key[e].keys.forEach(function(keyc) {
				if(event.keyCode == keyc) {
					if(!Key[e].pressed) {
						Key[e].pressed = !Key[e].pressed;
					}
				}
			});
		});
	};
	document.onkeyup = function(event) {
		_Keys.forEach(function(e) {
			Key[e].keys.forEach(function(keyc) {
				if(event.keyCode == keyc) {
					if(Key[e].pressed) {
						Key[e].pressed = !Key[e].pressed;
					}
				}
			});
		});
	};
}