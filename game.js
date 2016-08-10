var SCREEN_CENTER = 0x908409;

var TextField;

var pl;

function onStart() {
	TextField = new InputField("red", 250, 30, SCREEN_CENTER, 265, 0, "transparent", "#00FF00", true, 1);
	TextField.hover.setColors({ text: 'white', body: 'green', outline: 'white' });
	
	new Physics.Box(300, 150, SCREEN_CENTER, 300, 0, "transparent", "red", true, 2);
	new Physics.Box(300, 150, 370, 280, 0, "transparent", "#00FF00", true, 2);
	new Physics.Box(30, 30, 300, 430, 0, "transparent", "#0000FF", true, 2);
	
	pl = new Physics.Player();
	pl.Spawn(1000, 600);
}

function onUpdate() {
	clearScreen("black");
	WorldObjects.forEach(function(object, index, array) {
		object.draw();
	});
	pl.draw();
	requestAnimationFrame(onUpdate);
}

var Physics = {
	Box: function(width, height, posX, posY, rot, foreColor, strokeColor, stroke, lineWidth) {
		var Color = { 
			body: foreColor ? foreColor : "white",
			outline: strokeColor ? strokeColor : "white",
		};
		var Size = { x: width ? width : 10, y: height ? height : 10 };
		var Position = { x: posX ? posX : 0, y: posY ? posY : 0 };
		var Rotation = rot ? rot : 0;
		var BorderWidth = lineWidth ? lineWidth : 3;
		var BorderState = stroke;
		
		this.Edge = [
			[ posX - (0.5 * width), posY - (0.5 * height) ],
			[ posX - (0.5 * width), posY + (0.5 * height) ],
			[ posX + (0.5 * width), posY + (0.5 * height) ],
			[ posX + (0.5 * width), posY - (0.5 * height) ]
		];
		
		var oID = GiveID();
		this.oID = oID;
		var oType = "Box";
		this.oType = oType;
		
		WorldObjects.push(this);
		
		this.draw = function() {
			//DetectCollision();
			if(posX == SCREEN_CENTER) posX = (canvas.width / 2);
			if(posY == SCREEN_CENTER) posY = (canvas.height / 2);
			this.Edge = [
				[ posX - (0.5 * width), posY + (0.5 * height) ],
				[ posX + (0.5 * width), posY + (0.5 * height) ],
				[ posX + (0.5 * width), posY - (0.5 * height) ],
				[ posX - (0.5 * width), posY - (0.5 * height) ]
			];
			ctx.save();
			ctx.translate(posX, convertY(posY));
			ctx.rotate(rot*Math.PI/180);
			ctx.beginPath();
			ctx.moveTo(0 - (width / 2), 0 + (height / 2));
			ctx.lineTo(0 + (width / 2), 0 + (height / 2));
			ctx.lineTo(0 + (width / 2), 0 - (height / 2));
			ctx.lineTo(0 - (width / 2), 0 - (height / 2));
			ctx.closePath();
			ctx.lineWidth = lineWidth ? lineWidth : 2;
			ctx.strokeStyle = strokeColor ? strokeColor : "white";
			ctx.fillStyle = foreColor ? foreColor : "white";
			if(stroke) ctx.stroke();
			ctx.fill();
			ctx.restore();
		}
		
		this.getPosition = function() {
			return Position;
		}
		this.setPosition = function(p) {
			Position = p;
		}
		
		/*function DetectCollision() {
			WorldObjects.forEach(function(object, index, array) {
				if(object.ID != ID) {
					console.log(object);
				}
			});
		}*/
	},
	Player: function() {
		var Position = { x: 0, y: 0 };
		var Offset = {
			Bottom: [ [ -0.5, 2 ], [ 0.5, 2 ] ],
			BulletSpawn: [ [ 2.8, 0.95 ] ]
		}
		var Force = { x: 0, y: 0 };
		var Size = 10;
		
		this.Spawn = function(x, y) {
			Position = { x: x, y: y };
		}
		var Direction = 1;
		var FireRate = 0.1;
		var FireRaitCount = 0.1;
		this.draw = function() {
			FireRaitCount += dt;
			Move();
			
			ctx.save();
			ctx.translate(Position.x, convertY(Position.y));
			
			// head
			ctx.beginPath();
			ctx.moveTo((-1 * Size) * Direction, (-4 * Size));
			ctx.lineTo((1 * Size) * Direction, (-4 * Size));
			ctx.lineTo((1 * Size) * Direction, (-2 * Size));
			ctx.lineTo((-1 * Size) * Direction, (-2 * Size));
			ctx.closePath();
			ctx.fillStyle = "#FF8888";
			ctx.fill();
			
			// eye
			ctx.beginPath();
			ctx.moveTo((0 * Size) * Direction, (-3.5 * Size));
			ctx.lineTo((0.5 * Size) * Direction, (-3.5 * Size));
			ctx.lineTo((0.5 * Size) * Direction, (-3 * Size));
			ctx.lineTo((0 * Size) * Direction, (-3 * Size));
			ctx.closePath();
			ctx.fillStyle = "black";
			ctx.fill();
			
			// top body
			ctx.beginPath();
			ctx.moveTo((-0.5 * Size) * Direction, (-2 * Size));
			ctx.lineTo((0.5 * Size) * Direction, (-2 * Size));
			ctx.lineTo((0.5 * Size) * Direction, (0 * Size));
			ctx.lineTo((-0.5 * Size) * Direction, (0 * Size));
			ctx.closePath();
			ctx.fillStyle = "#007700";
			ctx.fill();
			
			// bottom body
			ctx.beginPath();
			ctx.moveTo((-0.5 * Size) * Direction, (0 * Size));
			ctx.lineTo((0.5 * Size) * Direction, (0 * Size));
			ctx.lineTo((0.5 * Size) * Direction, (2 * Size));
			ctx.lineTo((-0.5 * Size) * Direction, (2 * Size));
			ctx.closePath();
			ctx.fillStyle = "#0022FF";
			ctx.fill();
			
			ctx.restore();
			
			ctx.save();
			ctx.translate(Position.x + ((0.5 * Size) * Direction), convertY(Position.y + (0.8 * Size)));
			
			// weapon stock
			ctx.beginPath();
			ctx.moveTo((-1.5 * Size) * Direction, (-0.5 * Size));
			ctx.lineTo((-0.5 * Size) * Direction, (-0.5 * Size));
			ctx.lineTo((-0.5 * Size) * Direction, (0 * Size));
			ctx.lineTo((-1.5 * Size) * Direction, (0.25 * Size));
			ctx.closePath();
			ctx.fillStyle = "brown";
			ctx.fill();
			
			// weapon body
			ctx.beginPath();
			ctx.moveTo((-0.5 * Size) * Direction, (-0.5 * Size));
			ctx.lineTo((-0.3 * Size) * Direction, (-0.6 * Size));
			ctx.lineTo((0.5 * Size) * Direction, (-0.6 * Size));
			ctx.lineTo((0.5 * Size) * Direction, (0 * Size));
			ctx.lineTo((-0.5 * Size) * Direction, (0 * Size));
			ctx.closePath();
			ctx.fillStyle = "gray";
			ctx.fill();
			
			// weapon trigger
			ctx.beginPath();
			ctx.moveTo((-0.45 * Size) * Direction, (0 * Size));
			ctx.lineTo((-0.2 * Size) * Direction, (0 * Size));
			ctx.lineTo((-0.4 * Size) * Direction, (0.5 * Size));
			ctx.lineTo((-0.65 * Size) * Direction, (0.5 * Size));
			ctx.closePath();
			ctx.fillStyle = "gray";
			ctx.fill();
			
			// weapon magazine
			ctx.beginPath();
			ctx.moveTo((0.15 * Size) * Direction, (0 * Size));
			ctx.lineTo((0.45 * Size) * Direction, (0 * Size));
			ctx.lineTo((0.65 * Size) * Direction, (0.75 * Size));
			ctx.lineTo((0.35 * Size) * Direction, (0.75 * Size));
			ctx.closePath();
			ctx.fillStyle = "gray";
			ctx.fill();
			
			// weapon grip
			ctx.beginPath();
			ctx.moveTo((0.5 * Size) * Direction, (-0.6 * Size));
			ctx.lineTo((1.5 * Size) * Direction, (-0.6 * Size));
			ctx.lineTo((1.5 * Size) * Direction, (0 * Size));
			ctx.lineTo((0.5 * Size) * Direction, (0 * Size));
			ctx.closePath();
			ctx.fillStyle = "brown";
			ctx.fill();
			
			// weapon top barrel
			ctx.beginPath();
			ctx.moveTo((1.5 * Size) * Direction, (-0.55 * Size));
			ctx.lineTo((2 * Size) * Direction, (-0.55 * Size));
			ctx.lineTo((2 * Size) * Direction, (-0.35 * Size));
			ctx.lineTo((1.5 * Size) * Direction, (-0.35 * Size));
			ctx.closePath();
			ctx.fillStyle = "gray";
			ctx.fill();
			
			// weapon bottom barrel
			ctx.beginPath();
			ctx.moveTo((1.5 * Size) * Direction, (-0.25 * Size));
			ctx.lineTo((2.3 * Size) * Direction, (-0.25 * Size));
			ctx.lineTo((2.3 * Size) * Direction, (-0.05 * Size));
			ctx.lineTo((1.5 * Size) * Direction, (-0.05 * Size));
			ctx.closePath();
			ctx.fillStyle = "gray";
			ctx.fill();                
			
			ctx.restore();
		}
		var OnGround = false;
		
		var Move = function() {
			// Detect collision (ground check)
			if(DetectCollision() == false) {
				OnGround = false;
			}
			
			// Move left/right
			if(Key.Right.pressed) {
				if(Direction != 1) Direction = 1;
				Force.x += convertSpeed(10);
			} else if(Key.Left.pressed) {
				if(Direction != -1) Direction = -1;
				Force.x += convertSpeed(-10);
			} else {
				if(OnGround) {
					if(Force.x > 0) {
						if(Force.x - convertSpeed(25) < 0) {
							Force.x = 0;
						} else Force.x -= convertSpeed(25)
					}
					if(Force.x < 0) {
						if(Force.x + convertSpeed(25) > 0) {
							Force.x = 0;
						} else Force.x += convertSpeed(25)
					}
				}
			}
			
			// Jump
			if(Key.Jump.pressed && OnGround) {
				Force.y = 5;
				OnGround = false;
			}
			
			// Shoot
			if(Key.Shoot.pressed) {
				Shoot();
			}
			
			// Fall
			if(!OnGround) {
				Force.y -= convertSpeed(9.80665);
			}
			
			if(Force.x >= 4) {
				Force.x = 4;
			}
			if(Force.x <= -4) {
				Force.x = -4;
			}
							
			Position.x += Force.x;
			Position.y += Force.y;
		}
		
		function DetectCollision() {
			var result = false;
			WorldObjects.forEach(function(object, index, array) {
				if(object.oType == "Box") {
					var BottomOffset = [ [ Offset.Bottom[0][0] * Size, Offset.Bottom[0][1] * Size ], [ Offset.Bottom[1][0] * Size, Offset.Bottom[1][1] * Size ] ];
					if(Position.x + (Offset.Bottom[1][0] * Size) > object.Edge[0][0] && Position.x + (Offset.Bottom[0][0] * Size) < object.Edge[1][0]) {
						if(Position.y - BottomOffset[0][1] <= object.Edge[0][1] && Position.y - BottomOffset[0][1] >= object.Edge[0][1]-20) {
							if(!OnGround && Force.y < 0) {
								Force.y = 0;
								OnGround = true;
								Position.y = object.Edge[0][1] + BottomOffset[0][1];
								result = true;   
							}
						}
					}
				}
			});
			return result;
		}
		
		function Shoot() {
			if(FireRaitCount > FireRate) {
				var p_x = Position.x + ((Offset.BulletSpawn[0][0] * Size) * Direction);
				var p_y = Position.y + (Offset.BulletSpawn[0][1] * Size);
				var sprayDiff = 1;
				var maxSpeed = 20;
				var speedY = (Math.random() * (sprayDiff * 2)) - sprayDiff;
				var speedX = (maxSpeed - (speedY > 0 ? speedY : (-speedY))) * Direction;
				
				new Physics.Bullet(5, 5, p_x, p_y, 45, speedX, speedY);
				FireRaitCount = 0;
				
				Force.x += (0.3 * Direction) * -1;
			}
		}
	},
	Bullet: function(sx, sy, px, py, rot, fx, fy, dir) {
		var Position = { x: px, y: py };
		var Force = { x: fx, y: fy };
		var Size = { x: sx, y: sy };
		var Direction = dir;
		var Rotation = rot;
		console.log(Position);
		
		var oID = GiveID();
		this.oID = oID;
		var oType = "Bullet";
		this.oType = oType;
		
		WorldObjects.push(this);
		
		var AliveTime = 0;
		var Alive = true;
		
		this.draw = function() {
			if(Alive) {
				Move();
				ctx.save();
				ctx.translate(Position.x, convertY(Position.y));
				ctx.rotate(Rotation*Math.PI/180);
				ctx.beginPath();
				ctx.moveTo(0 - (Size.x / 2), 0 + (Size.y / 2));
				ctx.lineTo(0 + (Size.x / 2), 0 + (Size.y / 2));
				ctx.lineTo(0 + (Size.x / 2), 0 - (Size.y / 2));
				ctx.lineTo(0 - (Size.x / 2), 0 - (Size.y / 2));
				ctx.closePath();
				ctx.lineWidth = 1;
				ctx.strokeStyle = "#00FFFF";
				ctx.stroke();
				ctx.restore();
				
				AliveTime += dt;
				if(AliveTime > 1) {
					Alive = false;
				}
			}
		}
		
		function Move() {
			Position.x += Force.x;
			Position.y += Force.y;
		}
	}
};

function drawPath(posX, posY, nodes, fill, stroke, strokeWidth) {
	ctx.save();
	ctx.translate(posX, posY);
	ctx.beginPath();
	nodes.forEach(function(pos, index, array) {
		if(index == 0) {
			ctx.moveTo(pos[0], pos[1]);
		} else {
			ctx.lineTo(pos[0], pos[1]);
		}
	});
	ctx.fillStyle = fill ? fill : "black";
	ctx.strokeStyle = stroke ? stroke : "black";
	ctx.lineWidth = strokeWidth ? strokeWidth : 3;
	if(fill) ctx.fill();
	if(stroke) ctx.stroke();
	ctx.closePath();
	ctx.restore();
}

function drawBox(width, height, posX, posY, rot, foreColor, strokeColor, stroke, lineWidth) {
	if(posX == SCREEN_CENTER) posX = (canvas.width / 2);
	if(posY == SCREEN_CENTER) posY = (canvas.height / 2);
	ctx.save();
	ctx.translate(posX, posY);
	ctx.rotate(rot*Math.PI/180);
	ctx.beginPath();
	ctx.moveTo(0 - (width / 2), 0 - (height / 2));
	ctx.lineTo(0 - (width / 2), 0 + (height / 2));
	ctx.lineTo(0 + (width / 2), 0 + (height / 2));
	ctx.lineTo(0 + (width / 2), 0 - (height / 2));
	ctx.closePath();
	ctx.lineWidth = lineWidth ? lineWidth : 2;
	ctx.strokeStyle = strokeColor ? strokeColor : "white";
	ctx.fillStyle = foreColor ? foreColor : "white";
	if(stroke) ctx.stroke();
	ctx.fill();
	ctx.restore();
}

var InputField = function(textColor, width, height, posX, posY, rot, foreColor, strokeColor, stroke, lineWidth) {
	var Color = { 
		text: textColor ? textColor : "black",
		body: foreColor ? foreColor : "white",
		outline: strokeColor ? strokeColor : "white",
		hover: {
			text: textColor ? textColor : "black",
			body: foreColor ? foreColor : "white",
			outline: strokeColor ? strokeColor : "white"
		}
	};
	var Size = { x: width ? width : 200, y: height ? height : 30 };
	var Position = { x: posX ? posX : 0, y: posY ? posY : 0 };
	var Rotation = rot ? rot : 0;
	var BorderWidth = lineWidth ? lineWidth : 3;
	var BorderState = stroke;
	
	this.draw = function() {
		if(Position.x == SCREEN_CENTER) Position.x = (canvas.width / 2);
		if(Position.y == SCREEN_CENTER) Position.y = (canvas.height / 2);
		ctx.save();
		ctx.translate(Position.x, Position.y);
		ctx.rotate(Rotation * Math.PI / 180);
		ctx.beginPath();
		ctx.moveTo(0 - (Size.x / 2), 0 - (Size.y / 2));
		ctx.lineTo(0 - (Size.x / 2), 0 + (Size.y / 2));
		ctx.lineTo(0 + (Size.x / 2), 0 + (Size.y / 2));
		ctx.lineTo(0 + (Size.x / 2), 0 - (Size.y / 2));
		ctx.closePath();
		ctx.lineWidth = BorderWidth;
		ctx.strokeStyle = Color.outline;
		ctx.fillStyle = Color.body;
		if(BorderState) ctx.stroke();
		ctx.fill();
		ctx.restore();
	}
	
	this.hover = {
		setTextColor: function(color) {
			Color.hover.text = color;
		},
		setBodyColor: function(color) {
			Color.hover.body = color;
		},
		setOutlineColor: function(color) {
			Color.hover.outline = color;
		},
		setColors: function(array) {
			Color.hover.text = array['text'] ? array['text'] : Color.hover.text;
			Color.hover.body = array['body'] ? array['body'] : Color.hover.body;
			Color.hover.outline = array['outline'] ? array['outline'] : Color.hover.outline;
		}
	}
}